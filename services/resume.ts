import { ResumeData } from "@/types/resume";

const FALLBACK_DOCS_ID = '1dXOaaXYvfz_gWoT3jnBmlOX3M5crS7fNaYQXgYBIoZI';

export async function getResumeData(): Promise<ResumeData> {
  // Use the env variable if executing on server, fallback to your ID string if running in browser
  const googleDocsID = process.env.GOOGLE_DOCS_ID || FALLBACK_DOCS_ID;
  const previewUrl = `https://docs.google.com/document/d/${googleDocsID}/preview`;

  // We skip the fetch request entirely. Generating the string instantly resolves without network lag!
  return {
    pdfUrl: previewUrl,
    lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  };
}