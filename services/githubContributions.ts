import { ContributionDay, ContributionsResponse } from '@/types/githubContributions';

function getThreeMonthsAgo(): string {
  const date = new Date();
  date.setMonth(date.getMonth() - 3);
  return date.toISOString();
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