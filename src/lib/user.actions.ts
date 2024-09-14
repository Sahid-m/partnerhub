"use server";

import { Octokit } from "@octokit/rest";

export async function getGitHubUserInfo(username: string) {
  const octokit = new Octokit({
    request: {
      timeout: 20000,
    },
  });

  try {
    // Fetch user information and repositories concurrently
    const [userResponse, reposResponse] = await Promise.all([
      octokit.users.getByUsername({ username }),
      octokit.repos.listForUser({
        username,
        sort: "updated",
        direction: "desc",
        per_page: 10, // Limit to 10 most recently updated repos
      }),
    ]);

    const user = userResponse.data;
    const repos = reposResponse.data;

    // Fetch languages for all repos concurrently
    const reposWithLanguages = await Promise.all(
      repos.map(async (repo) => {
        const languagesResponse = await octokit.repos.listLanguages({
          owner: username,
          repo: repo.name,
        });

        return {
          name: repo.name,
          description: repo.description || "No description available",
          languages: Object.keys(languagesResponse.data),
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          url: repo.html_url,
        };
      })
    );

    return {
      user: {
        bio: user.bio || "No bio available",
        location: user.location || "Location not specified",
        joinedAt: new Date(user.created_at).toLocaleDateString(),
        profileUrl: user.html_url,
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
      },
      repos: reposWithLanguages,
    };
  } catch (error) {
    console.error("Error fetching GitHub user info:", error);
    throw new Error("Failed to fetch GitHub user information and repositories");
  }
}
