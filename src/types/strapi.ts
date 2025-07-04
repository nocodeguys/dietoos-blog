// Strapi API Response Types
export interface StrapiMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiApiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: {};
}

export interface StrapiAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Blog Post Types - matching current schema
export interface BlogPostSEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

export interface BlogPostAttributes extends StrapiAttributes {
  title: string;
  description: string;
  content: string | any[]; // Rich text content from Strapi (can be string or structured array)
  slug: string;
  pubDate: string;
  updatedDate?: string;
  heroImage?: {
    data?: {
      id: number;
      attributes: {
        name: string;
        alternativeText?: string;
        caption?: string;
        width: number;
        height: number;
        formats?: any;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl?: string;
        provider: string;
        provider_metadata?: any;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
  heroImageAlt?: string;
  category: string;
  tags?: string[];
  author: string;
  authorImage?: {
    data?: {
      id: number;
      attributes: {
        name: string;
        alternativeText?: string;
        url: string;
        formats?: any;
      };
    };
  };
  featured: boolean;
  draft: boolean;
  seo?: BlogPostSEO;
  readingTime?: number;
  relatedPosts?: string[];
}

export interface BlogPost {
  id: number;
  documentId?: string;
  // Support both flat structure (actual API response) and nested structure (if it changes)
  attributes?: BlogPostAttributes;
  // Flat structure fields
  title?: string;
  description?: string;
  content?: string | any[];
  slug?: string;
  pubDate?: string;
  updatedDate?: string;
  heroImage?: {
    data?: {
      id: number;
      attributes: {
        name: string;
        alternativeText?: string;
        caption?: string;
        width: number;
        height: number;
        formats?: any;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl?: string;
        provider: string;
        provider_metadata?: any;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
  heroImageAlt?: string;
  category?: string;
  tags?: string[];
  author?: string;
  authorImage?: {
    data?: {
      id: number;
      attributes: {
        name: string;
        alternativeText?: string;
        url: string;
        formats?: any;
      };
    };
  };
  featured?: boolean;
  draft?: boolean;
  seo?: BlogPostSEO;
  readingTime?: number;
  relatedPosts?: string[];
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

// Heading structure for table of contents
export interface Heading {
  depth: number;
  text: string;
  slug: string;
}

// Processed Blog Post (converted from Strapi format to match current structure)
export interface ProcessedBlogPost {
  id: number;
  slug: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    updatedDate?: Date;
    heroImage?: string;
    heroImageAlt?: string;
    category: string;
    tags: string[];
    author: string;
    authorImage?: string;
    featured: boolean;
    draft: boolean;
    seo?: BlogPostSEO;
    readingTime?: number;
    relatedPosts?: string[];
  };
  body: string; // Rendered content
  render: () => Promise<{ Content: any; headings: Heading[] }>;
}

// Query parameters for Strapi API
export interface StrapiQueryParams {
  populate?: string | string[] | object;
  filters?: object;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  fields?: string[];
  locale?: string;
  publicationState?: 'live' | 'preview';
}

// Error handling
export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: any;
}

export interface StrapiErrorResponse {
  error: StrapiError;
} 