// Simple working Strapi client
const STRAPI_URL = 'https://precious-melody-90ca8b0245.strapiapp.com';
const STRAPI_API_TOKEN = 'ab3f4d78ad57b9b52f406dcbef2f20228b4ff924fd7e2df08c24910acf9a4b7ef4ca2665cddadf3d677137ff0fd16bb0054957d80d00558f898156a099e687ed092e746383d19f9775e8579fd43fb4af54e7ebbe5f829801384b91a39de8773d46ef4076be5c6b8907e26ef0be93af1ed79f2ef10e842a7bc8e56b81f9b3ff6e';

// Types for the actual API response
interface StrapiRichTextBlock {
  type: string;
  children: Array<{ text: string; type: string; bold?: boolean; italic?: boolean; code?: boolean }>;
  level?: number;
  format?: string;
}

interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: { url: string; width: number; height: number; };
    medium?: { url: string; width: number; height: number; };
    small?: { url: string; width: number; height: number; };
    thumbnail?: { url: string; width: number; height: number; };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface RawBlogPost {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  author: string;
  heroImageAlt: string | null;
  content: StrapiRichTextBlock[];
  pubDate: string;
  updatedDate: string | null;
  featured: boolean;
  draft: boolean;
  readingTime: number | null;
  tags: string[] | null;
  relatedPosts: string[] | null;
  seo: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  heroImage: StrapiImage | null;
  authorImage: StrapiImage | null;
}

interface StrapiResponse {
  data: RawBlogPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Convert rich text to HTML
function richTextToHtml(richText: StrapiRichTextBlock[]): string {
  if (!richText || !Array.isArray(richText)) return '';
  
  return richText.map(block => {
    switch (block.type) {
      case 'paragraph':
        const content = block.children.map(child => {
          let text = child.text;
          if (child.bold) text = `<strong>${text}</strong>`;
          if (child.italic) text = `<em>${text}</em>`;
          if (child.code) text = `<code>${text}</code>`;
          return text;
        }).join('');
        return `<p>${content}</p>`;
      
      case 'heading':
        const headingText = block.children.map(child => child.text).join('');
        const level = block.level || 1;
        const slug = generateSlug(headingText);
        return `<h${level} id="${slug}">${headingText}</h${level}>`;
      
      default:
        const defaultText = block.children?.map(child => child.text).join('') || '';
        return `<p>${defaultText}</p>`;
    }
  }).join('\n');
}

// Generate slug from heading text
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Extract headings from rich text for table of contents
function extractHeadings(richText: StrapiRichTextBlock[]): { depth: number; slug: string; text: string }[] {
  if (!richText || !Array.isArray(richText)) return [];
  
  return richText
    .filter(block => block.type === 'heading')
    .map(block => {
      const text = block.children.map(child => child.text).join('');
      const depth = block.level || 1;
      const slug = generateSlug(text);
      
      return {
        depth,
        slug,
        text
      };
    });
}

// Calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Extract image URL from Strapi image object
function getImageUrl(image: StrapiImage | null): string | undefined {
  if (!image) return undefined;
  
  // Prefer medium format for hero images, fallback to original
  if (image.formats?.medium?.url) {
    return image.formats.medium.url;
  }
  
  // Fallback to original image URL
  return image.url;
}

// Transform raw post to processed format
function transformPost(rawPost: RawBlogPost) {
  const htmlContent = richTextToHtml(rawPost.content);
  const headings = extractHeadings(rawPost.content);
  
  return {
    id: rawPost.id,
    slug: rawPost.slug,
    data: {
      title: rawPost.title,
      description: rawPost.description,
      pubDate: new Date(rawPost.pubDate),
      updatedDate: rawPost.updatedDate ? new Date(rawPost.updatedDate) : undefined,
      heroImage: getImageUrl(rawPost.heroImage),
      heroImageAlt: rawPost.heroImageAlt || rawPost.heroImage?.alternativeText || undefined,
      category: rawPost.category,
      tags: rawPost.tags || [],
      author: rawPost.author,
      authorImage: getImageUrl(rawPost.authorImage),
      featured: rawPost.featured,
      draft: rawPost.draft,
      seo: rawPost.seo,
      readingTime: rawPost.readingTime || calculateReadingTime(htmlContent),
      relatedPosts: rawPost.relatedPosts || [],
    },
    body: htmlContent,
    render: async () => ({
      Content: () => htmlContent,
      headings: headings
    })
  };
}

// Simple Strapi client
export const simpleStrapiClient = {
  async getBlogPosts() {
    try {
      const response = await fetch(`${STRAPI_URL}/api/blog-posts?populate=*`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
      });
      
      if (!response.ok) {
        console.error('Strapi API error:', response.status);
        return [];
      }
      
      const data: StrapiResponse = await response.json();
      console.log('✅ Fetched', data.data.length, 'posts from Strapi');
      
      return data.data.map(transformPost);
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  },

  async getBlogPost(slug: string) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/blog-posts?filters[slug][$eq]=${slug}&populate=*`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
      });
      
      if (!response.ok) {
        console.error('Strapi API error:', response.status);
        return null;
      }
      
      const data: StrapiResponse = await response.json();
      
      if (data.data.length === 0) {
        return null;
      }
      
      return transformPost(data.data[0]);
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  },

  async getCategories() {
    try {
      const response = await fetch(`${STRAPI_URL}/api/blog-posts?populate=*`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
      });
      
      if (!response.ok) {
        return [];
      }
      
      const data: StrapiResponse = await response.json();
      const categories = [...new Set(data.data.map(post => post.category))];
      return categories.sort();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }
}; 