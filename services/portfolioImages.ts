import { PortfolioImage } from '@/types/portfolioImages';

export async function getPortfolioImages(): Promise<PortfolioImage[]> {
  // 💡 Updated to match your exact environment variable names
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  const folderId = process.env.PORTFOLIO_IMAGES_FOLDER_ID;

  if (!apiKey || !folderId) {
    console.error('Missing Google Drive environment configurations.');
    return [];
  }

  // 💡 Cleaned up query syntax: changed 'startsWith' to 'contains'
  const driveQuery = `'${folderId}' in parents and mimeType contains 'image/'`;

  // 💡 Safely builds and URL-encodes the entire query parameters block
  const params = new URLSearchParams({
    q: driveQuery,
    fields: 'files(id,name)',
    key: apiKey,
  });

  const url = `https://www.googleapis.com/drive/v3/files?${params.toString()}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 }, // Cache the photo list for 24 hours
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Drive API responded with status: ${res.status} - ${errorText}`,
      );
    }

    const data = await res.json();
    const files = data.files || [];

    return files.map((file: { id: string; name: string }) => ({
      id: file.id,
      name: file.name,
      // 💡 Fixed string template interpolation ($ instead of 0)
      embedUrl: `https://drive.google.com/uc?export=view&id=${file.id}`,
    }));
  } catch (error) {
    console.error('Error fetching images from Google Drive:', error);
    return [];
  }
}
