"use server";

import { Octokit } from "@octokit/rest";
import { GitHubData, GitHubRepo, GitHubUser } from "./interfaces";
import clientPromise from "./mongodb";

export async function getGitHubUserInfo(username: string): Promise<GitHubData> {
  const client = await clientPromise;
  const db = client.db("github_data");
  const usersCollection = db.collection<GitHubUser>("users");
  const reposCollection = db.collection<GitHubRepo>("repos");

  // Check if user data exists in the database
  const existingUser = await usersCollection.findOne({ username });

  if (existingUser) {
    console.log("in exist");
    // If user exists, fetch associated repos from the database
    const existingRepos = await reposCollection
      .find({ owner: username })
      .toArray();

    console.log("returning ;  " + existingUser);
    return {
      user: existingUser,
      repos: existingRepos,
    };
  }

  // If user doesn't exist, fetch from GitHub API
  console.log("not exists");
  const octokit = new Octokit({
    request: {
      timeout: 20000,
    },
  });

  try {
    // Fetch user information and all repositories
    const [userResponse, reposResponse] = await Promise.all([
      octokit.users.getByUsername({ username }),
      octokit.paginate(octokit.repos.listForUser, {
        username,
        sort: "updated",
        direction: "desc",
        per_page: 100,
      }),
    ]);

    console.log("response from octo : " + userResponse);
    const user = userResponse.data;

    // Prepare user data
    const userData: GitHubUser = {
      username: user.login,
      bio: user.bio || "No bio available",
      location: user.location || "Location not specified",
      joinedAt: user.created_at,
      profileUrl: user.html_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
    };

    // Insert user data into the database
    await usersCollection.insertOne(userData);

    // Fetch languages for all repos and prepare repo data
    const reposData: GitHubRepo[] = await Promise.all(
      reposResponse.map(async (repo) => {
        const languagesResponse = await octokit.repos.listLanguages({
          owner: username,
          repo: repo.name,
        });

        const repoData: GitHubRepo = {
          owner: username,
          name: repo.name,
          description: repo.description || "No description available",
          languages: Object.keys(languagesResponse.data),
          stars: repo.stargazers_count || 0,
          fork: repo.fork,
          url: repo.html_url,
        };

        // Insert repo data into the database
        await reposCollection.insertOne(repoData);

        return repoData;
      })
    );

    console.log("fetched everything : " + userData);

    return {
      user: userData,
      repos: reposData,
    };
  } catch (error) {
    console.error("Error fetching GitHub user info:", error);
    throw new Error("Failed to fetch GitHub user information and repositories");
  }
}
