import { ContributionDay, ContributionsResponse } from '@/types/githubContributions';

function getThreeMonthsAgo(): string {
  const date = new Date();
  date.setMonth(date.getMonth() - 3);
  return date.toISOString();
}

export function selectBestWindow(days: ContributionDay[]): {
  days: ContributionDay[];
  months: number;
} {
  const now = new Date();

  const windows = [3, 2, 1].map((months) => {
    const cutoff = new Date();
    cutoff.setMonth(now.getMonth() - months);
    const windowDays = days.filter((d) => new Date(d.date) >= cutoff);
    const activeDays = windowDays.filter((d) => d.contributionCount > 0).length;
    const density = activeDays / windowDays.length;
    return { months, days: windowDays, density };
  });

  // Start from longest, fall back to shorter if too sparse
  const best = windows.find((w) => w.density >= 0.75);

  // Fall back to 1 month if none meet the threshold
  return best ?? { days: windows[2].days, months: 1 };
}

export async function getContributions(): Promise<ContributionDay[]> {
  const token = process.env.GITHUB_TOKEN;
  const githubUsername = process.env.GITHUB_USERNAME;
 
  if (!token) {
    console.error('Missing GITHUB_TOKEN environment variable.');
    return [];
  }
 
  const query = `
    query {
      user(login: "${githubUsername}") {
        contributionsCollection(
          from: "${getThreeMonthsAgo()}",
          to: "${new Date().toISOString()}"
        ) {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
                weekday
              }
            }
          }
        }
      }
    }
  `;
 
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });
 
    if (!res.ok) {
      throw new Error(`GraphQL API request failed: ${res.statusText}`);
    }
 
    const responseData: ContributionsResponse = await res.json();
    const weeks =
      responseData.data?.user?.contributionsCollection?.contributionCalendar
        ?.weeks ?? [];
 
    return weeks.flatMap((week) => week.contributionDays);
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return [];
  }
}