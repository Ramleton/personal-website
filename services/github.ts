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
        }[];
      };
    };
  };
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

    if (!res.ok) {
      throw new Error(`GitHub GraphQL error: ${res.status} ${res.statusText}`);
    }

    const responseData: GraphQLResponse = await res.json();
    const pinnedNodes = responseData.data?.user?.pinnedItems?.nodes || [];

    // Map and transform the complex GraphQL fields back into our clean UI structure
    return pinnedNodes.map((repo) => ({
      title: repo.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      description: repo.description || "No description provided.",
      url: repo.url,
      slug: repo.name,
      stars: repo.stargazerCount,
      // Flatten the deeply nested topic structures into a simple string array
      tags: repo.repositoryTopics.nodes.map((node) => node.topic.name),
    }));
  } catch (error) {
    console.error("Error fetching pinned repositories from GitHub GraphQL:", error);
    return [];
  }
}