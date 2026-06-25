'use server';

import { ContributionDay } from '@/types/githubContributions';
import { fetchGithubContributions } from '@/services/githubContributions';

export async function getContributionsAction(): Promise<ContributionDay[]> {
  try {
    // Call the underlying service logic securely
    return await fetchGithubContributions();
  } catch (error) {
    // Keep server logs detailed, but return a safe fallback to the client
    console.error('Error in getContributionsAction:', error);
    return [];
  }
}