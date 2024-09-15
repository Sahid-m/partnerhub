import { GitHubRepo, LanguagePercentage } from "./interfaces";

const languageColors: { [key: string]: string } = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  Go: "bg-cyan-500",
  Rust: "bg-orange-500",
  Java: "bg-red-500",
  Ruby: "bg-red-400",
  C: "bg-gray-500",
  "C++": "bg-blue-700",
  HTML: "bg-blue-900",
  CSS: "bg-blue-600",
  Dockerfile: "bg-blue-300",
  Shell: "bg-gray-700",
  PHP: "bg-purple-500",
  Swift: "bg-orange-400",
  Kotlin: "bg-purple-600",
  Dart: "bg-blue-400",
  Perl: "bg-pink-400",
  Lua: "bg-indigo-400",
  Elixir: "bg-purple-700",
  Haskell: "bg-red-300",
  R: "bg-teal-400",
  Scala: "bg-red-600",
  Solidity: "bg-gray-800",
  YAML: "bg-gray-400",
  JSON: "bg-green-300",
  SQL: "bg-purple-300",
  // Add more languages as needed
  default: "bg-gray-300", // Default color for unknown languages
};

export function calculateLanguageUsage(
  repos: GitHubRepo[]
): LanguagePercentage[] {
  const languageCount: { [key: string]: number } = {};
  let totalLanguages = 0;

  // Filter out repositories that have forks
  const filteredRepos = repos.filter((repo) => repo.fork == false);

  // Count occurrences of each language from filtered repositories
  filteredRepos.forEach((repo) => {
    repo.languages.forEach((language) => {
      if (languageCount[language]) {
        languageCount[language]++;
      } else {
        languageCount[language] = 1;
      }
      totalLanguages++;
    });
  });

  // Calculate percentage and map to colors
  const languages: LanguagePercentage[] = Object.keys(languageCount).map(
    (language) => {
      const percentage = (languageCount[language] / totalLanguages) * 100;
      return {
        name: language,
        percentage: Math.round(percentage * 100) / 100, // Round to two decimals
        color: languageColors[language] || languageColors["default"], // Use default color if not mapped
      };
    }
  );

  return languages;
}
