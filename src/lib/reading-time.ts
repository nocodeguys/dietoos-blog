/**
 * Calculate estimated reading time for blog content
 * Based on average reading speed and content complexity
 */

export interface ReadingTimeResult {
  minutes: number;
  words: number;
  text: string;
}

export function calculateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): ReadingTimeResult {
  // Remove markdown syntax and HTML tags for accurate word count
  const cleanContent = content
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links (keep text)
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/#{1,6}\s/g, '') // Remove heading markers
    .replace(/[*_~`]/g, '') // Remove emphasis markers
    .replace(/\n\s*\n/g, '\n') // Remove extra whitespace
    .trim();

  // Count words (split by whitespace and filter empty strings)
  const words = cleanContent
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  // Calculate reading time
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

  // Generate human-readable text
  const text = minutes === 1 ? '1 min read' : `${minutes} min read`;

  return {
    minutes,
    words,
    text
  };
}

/**
 * Get reading time for different content types
 */
export function getReadingTimeForPost(content: string): ReadingTimeResult {
  // Slightly slower reading speed for technical/health content
  return calculateReadingTime(content, 180);
}

/**
 * Format reading time with additional context
 */
export function formatReadingTime(result: ReadingTimeResult): string {
  if (result.minutes <= 1) {
    return 'Quick read';
  } else if (result.minutes <= 3) {
    return `${result.minutes} min read`;
  } else if (result.minutes <= 10) {
    return `${result.minutes} min read`;
  } else {
    return `${result.minutes} min read • Long form`;
  }
} 