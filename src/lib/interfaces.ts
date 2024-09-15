export interface GitHubUser {
  username: string;
  bio: string;
  location: string;
  joinedAt: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  owner: string;
  name: string;
  description: string;
  languages: string[];
  stars: number;
  fork: boolean;
  url: string;
}

export interface GitHubData {
  user: GitHubUser;
  repos: GitHubRepo[];
}

export interface LanguagePercentage {
  name: string;
  percentage: number;
  color: string;
}
