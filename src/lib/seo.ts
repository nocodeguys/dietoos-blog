/**
 * SEO utilities for blog optimization
 */

export interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Generate optimized meta title with proper length
 */
export function generateMetaTitle(title: string, siteName: string = 'Dietoos Blog'): string {
  const maxLength = 60;
  const fullTitle = `${title} | ${siteName}`;
  
  if (fullTitle.length <= maxLength) {
    return fullTitle;
  }
  
  // If too long, try without site name first
  if (title.length <= maxLength) {
    return title;
  }
  
  // Truncate title if still too long
  return title.substring(0, maxLength - 3) + '...';
}

/**
 * Generate optimized meta description
 */
export function generateMetaDescription(description: string): string {
  const maxLength = 155;
  
  if (description.length <= maxLength) {
    return description;
  }
  
  // Find the last complete sentence within limit
  const truncated = description.substring(0, maxLength);
  const lastSentence = truncated.lastIndexOf('.');
  
  if (lastSentence > maxLength * 0.7) {
    return description.substring(0, lastSentence + 1);
  }
  
  // Fallback to word boundary
  const lastSpace = truncated.lastIndexOf(' ');
  return description.substring(0, lastSpace) + '...';
}

/**
 * Generate keywords from content and tags
 */
export function generateKeywords(tags: string[], category: string, content?: string): string[] {
  const keywords = [category, ...tags];
  
  // Add common health/nutrition keywords if relevant
  const commonHealthKeywords = [
    'nutrition', 'health', 'wellness', 'diet', 'healthy eating',
    'lifestyle', 'fitness', 'wellbeing', 'mindful eating'
  ];
  
  // Add relevant common keywords
  commonHealthKeywords.forEach(keyword => {
    if (content?.toLowerCase().includes(keyword) && !keywords.includes(keyword)) {
      keywords.push(keyword);
    }
  });
  
  return keywords.slice(0, 10); // Limit to 10 keywords
}

/**
 * Generate Open Graph image URL
 */
export function generateOGImageUrl(
  title: string,
  category: string,
  baseUrl: string
): string {
  // In a real implementation, this would generate dynamic OG images
  // For now, return category-specific images or default
  const categoryImages: Record<string, string> = {
    nutrition: '/og-images/nutrition.png',
    wellness: '/og-images/wellness.png',
    'plant-based': '/og-images/plant-based.png',
    mindfulness: '/og-images/mindfulness.png',
  };
  
  return categoryImages[category] || '/og-image.png';
}

/**
 * Create structured data for blog post
 */
export function generateBlogPostStructuredData(data: {
  title: string;
  description: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  url: string;
  imageUrl: string;
  category: string;
  tags: string[];
  readingTime?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.title,
    description: data.description,
    image: data.imageUrl,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dietoos Blog',
      logo: {
        '@type': 'ImageObject',
        url: '/og-image.png'
      }
    },
    datePublished: data.publishedTime,
    dateModified: data.modifiedTime || data.publishedTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url
    },
    about: {
      '@type': 'Thing',
      name: data.category
    },
    keywords: data.tags.join(', '),
    url: data.url,
    ...(data.readingTime && {
      timeRequired: `PT${data.readingTime}M`
    })
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
} 