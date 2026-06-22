import { ResumeData } from "@/types/resume";

export async function getResumeData(): Promise<ResumeData> {
	const googleDocsID = process.env.GOOGLE_DOCS_ID;
	const previewUrl = `https://docs.google.com/document/d/${googleDocsID}/preview`;
	try {
    const res = await fetch(previewUrl, { 
      method: "HEAD",
      next: { revalidate: 86400 } 
    });

    if (!res.ok) throw new Error("Google Doc preview endpoint unreachable");

    return {
      pdfUrl: previewUrl,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    };
  } catch (error) {
    console.error("Error verifying resume endpoint:", error);
    return {
      pdfUrl: previewUrl,
      lastUpdated: "Recently",
    };
  }
}