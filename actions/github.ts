'use server';

import { FeaturedProject } from '@/types/projects';
import { fetchFeaturedProjects } from '@/services/github';

export async function getFeaturedProjectsAction(): Promise<FeaturedProject[]> {
  try {
    // Safely execute the underlying service logic
    return await fetchFeaturedProjects();
  } catch (error) {
    // If anything fails in the service (network issue, mapping error, etc.), 
    // catch it here and return a safe fallback so the UI doesn't crash.
    console.error('Action Error - Failed to fetch featured projects:', error);
    return []; 
  }
}