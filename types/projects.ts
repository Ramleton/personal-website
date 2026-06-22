export interface FeaturedProject {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  url: string;
  liveUrl: string | null;
  stars: number;
}