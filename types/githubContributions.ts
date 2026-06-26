export interface ContributionDay {
  date: string;
  contributionCount: number;
  weekday: number;
}

export interface ContributionsResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: {
            contributionDays: ContributionDay[];
          }[];
        };
      };
    };
  };
  errors: Error[];
}