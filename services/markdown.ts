import fs from 'fs';
import path from 'path';

export function getAboutContent(): string {
  const filePath = path.join(process.cwd(), 'content', 'about.md');
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('Failed to read about.md context:', error);
    return '';
  }
}
