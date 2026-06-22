export interface GithubResponse {
  data: {
    user: {
      pinnedItems: {
        nodes: {
          name: string;
          description: string | null;
          url: string;
					homepageUrl: string | null;
          stargazerCount: number;
          repositoryTopics: {
            nodes: {
              topic: {
                name: string;
              };
            }[];
          };
          languages: {
            nodes: {
              name: string;
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