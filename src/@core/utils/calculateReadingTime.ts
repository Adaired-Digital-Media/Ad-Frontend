import { ServerRemoveTags } from "./serverRemoveTags";
export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200; // Average reading speed (can be adjusted)
    const parsedContent = ServerRemoveTags(content);
    const wordCount = parsedContent.trim().split(/\s+/).length; // Count the words in the text
    const readingTime = Math.ceil(wordCount / wordsPerMinute); // Round up to nearest minute
    return readingTime;
  }