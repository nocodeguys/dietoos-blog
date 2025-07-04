import type { Heading } from '@/types/strapi';

// Simple markdown parser for Strapi content
// You can enhance this with a more sophisticated parser like marked or markdown-it

/**
 * Parse basic markdown syntax to HTML
 * This is a simple implementation for common markdown features
 */
export function parseMarkdown(markdown: string): string {
  if (!markdown) return '';

  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Lists
  html = html.replace(/^\* (.*$)/gm, '<li>$1</li>');
  html = html.replace(/^- (.*$)/gm, '<li>$1</li>');
  html = html.replace(/^\+ (.*$)/gm, '<li>$1</li>');

  // Wrap consecutive list items in ul tags
  html = html.replace(/(<li>.*<\/li>(?:\n<li>.*<\/li>)*)/g, '<ul>$1</ul>');

  // Numbered lists
  html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>(?:\n<li>.*<\/li>)*)/g, (match) => {
    // Only wrap in ol if it's not already wrapped in ul
    if (!match.includes('<ul>')) {
      return `<ol>${match}</ol>`;
    }
    return match;
  });

  // Blockquotes
  html = html.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');

  // Line breaks
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br>');

  // Wrap in paragraphs
  html = '<p>' + html + '</p>';

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(<h[1-6]>.*?<\/h[1-6]>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ul>.*?<\/ul>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ol>.*?<\/ol>)<\/p>/g, '$1');
  html = html.replace(/<p>(<blockquote>.*?<\/blockquote>)<\/p>/g, '$1');
  html = html.replace(/<p>(<pre>.*?<\/pre>)<\/p>/g, '$1');

  return html;
}

/**
 * Extract headings from markdown content for table of contents
 */
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const depth = match[1].length;
      const text = match[2].trim();
      const slug = slugify(text);
      headings.push({ depth, text, slug });
    }
  }

  return headings;
}

/**
 * Create a URL-friendly slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Strip HTML tags from content for reading time calculation
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Calculate reading time from content
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
  const text = stripHtml(content);
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Truncate text to a specific length with ellipsis
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

/**
 * Check if content is markdown or HTML
 */
export function isMarkdown(content: string): boolean {
  // Simple heuristic: if it contains common markdown patterns, assume it's markdown
  const markdownPatterns = [
    /^#{1,6}\s+/m,  // Headers
    /\*\*.*?\*\*/,  // Bold
    /\*.*?\*/,      // Italic
    /\[.*?\]\(.*?\)/, // Links
    /^[-*+]\s+/m,   // Lists
    /^>\s+/m,       // Blockquotes
    /```[\s\S]*?```/ // Code blocks
  ];

  return markdownPatterns.some(pattern => pattern.test(content));
}

/**
 * Process content based on its type (markdown or HTML)
 */
export function processContent(content: string): string {
  if (isMarkdown(content)) {
    return parseMarkdown(content);
  }
  return content; // Already HTML
} 