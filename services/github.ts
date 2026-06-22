import { FeaturedProject } from "@/types/projects";

interface GraphQLResponse {
  data: {
    user: {
      pinnedItems: {
        nodes: {
          name: string;
          description: string | null;
          url: string;
          stargazerCount: number;
          repositoryTopics: {
            nodes: {
              topic: {
                name: string;
              };
            }[];
          };
					readme: {
						text: string;
					} | null;
        }[];
      };
    };
  };
}

// Utility helper to clean up raw Markdown text if we need to fall back to the README
function extractDescriptionFromReadme(readmeText: string): string {
  if (!readmeText) return "No description provided.";

  // Split text by lines, remove empty lines, and filter out Markdown headers (starting with #)
  const cleanParagraphs = readmeText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#") && !line.startsWith("!["));

  if (cleanParagraphs.length === 0) return "No description provided.";

  // Grab the very first real paragraph block
  let firstParagraph = cleanParagraphs[0];

  // Strip common markdown elements like links [text](url), bolding **, and italics *
  firstParagraph = firstParagraph
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Cleans up links
    .replace(/\*\*([^*]+)\*\*/g, "$1")         // Cleans up bold text
    .replace(/\*([^*]+)\*/g, "$1");            // Cleans up italics

  // Truncate cleanly at a reasonable character length for your portfolio cards
  const maxLength = 160;
  if (firstParagraph.length > maxLength) {
    return firstParagraph.substring(0, maxLength).trim() + "...";
  }

  return firstParagraph;
}

export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
  const token = process.env.GITHUB_TOKEN;
	const githubUsername = process.env.GITHUB_USERNAME;

  if (!token) {
    console.error("Missing GITHUB_TOKEN environment variable.");
    return [];
  }

	const query = `
    query {
      user(login: "${githubUsername}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              repositoryTopics(first: 10) {
                nodes {
                  topic {
                    name
                  }
                }
              }
              # 💡 ADD THIS RIGHT HERE TO ACQUIRE THE BLOB DATA
              readme: object(expression: "HEAD:README.md") {
                ... on Blob {
                  text
                }
              }
            }
          }
        }
      }
    }
  `;

	try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) throw new Error(`GraphQL API request failed: ${res.statusText}`);

    const responseData: GraphQLResponse = await res.json();
    const pinnedNodes = responseData.data?.user?.pinnedItems?.nodes || [];

    return pinnedNodes.map((repo) => {
      // Prioritize the explicit repo description. If null, invoke the README extraction algorithm.
      const localizedDescription =
        repo.description || 
        (repo.readme ? extractDescriptionFromReadme(repo.readme.text) : "No description provided.");

      return {
        title: repo.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        description: localizedDescription,
        url: repo.url,
        slug: repo.name,
        stars: repo.stargazerCount,
        tags: repo.repositoryTopics?.nodes?.map((node) => node.topic.name) || [],
      };
    });
  } catch (error) {
    console.error("Error mapping GitHub data pipelines:", error);
    return [];
  }
}