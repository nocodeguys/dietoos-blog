# Strapi CMS Integration Guide

This guide walks you through setting up and using Strapi CMS with your Astro blog project.

## Overview

The Strapi integration replaces the local markdown files with a headless CMS, allowing you to:
- Manage blog content from a user-friendly admin interface
- Support rich text content with markdown
- Maintain SEO optimization and performance
- Keep static site generation with `getStaticPaths`

## Environment Setup

### 1. Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Strapi Configuration
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_here

# For production, update the URL:
# STRAPI_URL=https://your-strapi-instance.com
```

### 2. Strapi Content Type Configuration

In your Strapi admin panel, create a content type called `blog-post` with the following fields:

#### Text Fields
- `title` (Text, required)
- `description` (Text, required)
- `slug` (Text, required, unique)
- `category` (Text, required)
- `author` (Text, required, default: "Your Name")
- `heroImageAlt` (Text, optional)

#### Rich Text Fields
- `content` (Rich Text, required) - Main blog content

#### Date Fields
- `pubDate` (Date, required)
- `updatedDate` (Date, optional)

#### Boolean Fields
- `featured` (Boolean, default: false)
- `draft` (Boolean, default: false)

#### Number Fields
- `readingTime` (Number, optional) - Will be auto-calculated if not provided

#### JSON Fields
- `tags` (JSON, optional) - Array of strings
- `relatedPosts` (JSON, optional) - Array of slug strings
- `seo` (JSON, optional) - SEO metadata object

#### Media Fields
- `heroImage` (Single Media, optional)
- `authorImage` (Single Media, optional)

### 3. Strapi API Token

1. Go to your Strapi admin panel
2. Navigate to Settings > API Tokens
3. Create a new token with:
   - Name: "Astro Blog Token"
   - Token type: "Read-only"
   - Duration: "Unlimited"
4. Copy the token and add it to your `.env` file

## SEO JSON Field Structure

The `seo` field should be a JSON object with the following structure:

```json
{
  "metaTitle": "Optional custom meta title",
  "metaDescription": "Optional custom meta description",
  "ogImage": "Optional custom OG image path",
  "ogType": "article",
  "twitterCard": "summary_large_image"
}
```

## Content Management

### Writing Blog Posts

1. **Content Format**: You can write content in markdown or HTML. The system will automatically detect and process markdown.

2. **Images**: Upload images to Strapi's media library and reference them in your content or use the heroImage field.

3. **Tags**: Add tags as a JSON array: `["nutrition", "health", "wellness"]`

4. **Categories**: Use consistent category names for better organization.

### Markdown Support

The integration supports standard markdown syntax:
- Headers (`# ## ###`)
- Bold (`**text**`) and italic (`*text*`)
- Links (`[text](url)`)
- Lists (`- item` or `1. item`)
- Code blocks (`` `code` `` or ````code````)
- Blockquotes (`> text`)

## Performance Features

### Caching
- API responses are cached for 5 minutes during build time
- Reduces API calls and improves build performance

### Static Generation
- All blog posts are pre-generated at build time
- Maintains excellent SEO and performance
- Uses `getStaticPaths` for dynamic routes

### Image Optimization
- Images are served from Strapi with proper URLs
- Maintains responsive image support
- Preserves alt text and captions

## Development

### Running Locally

1. Start your Strapi instance
2. Ensure your `.env` file is configured
3. Run your Astro project:
   ```bash
   pnpm dev
   ```

### Building for Production

1. Update `STRAPI_URL` in your environment variables to point to your production Strapi instance
2. Build your project:
   ```bash
   pnpm build
   ```

## API Reference

The integration provides several utility functions:

### `strapiClient.getBlogPosts()`
Fetches all published blog posts, sorted by publication date.

### `strapiClient.getBlogPost(slug)`
Fetches a single blog post by slug.

### `strapiClient.getFeaturedBlogPosts(limit)`
Fetches featured blog posts.

### `strapiClient.getCategories()`
Fetches all unique categories.

### `strapiClient.searchPosts(query)`
Searches posts by title, description, content, or tags.

## Migration from Local Content

If you're migrating from local markdown files:

1. Keep your existing content in the `src/content/blog/` directory as backup
2. Import your content into Strapi manually or via API
3. Test the integration thoroughly
4. Remove the old content files once confirmed working

## Troubleshooting

### Common Issues

1. **No posts showing**: Check your Strapi API token and URL
2. **Images not loading**: Ensure image URLs are properly formatted
3. **Build errors**: Verify your content type fields match the expected structure

### Debug Mode

Enable debug logging by adding to your Strapi client:

```javascript
// In src/lib/strapi.ts
console.log('Fetching from:', url.toString());
```

## Best Practices

1. **Content Structure**: Maintain consistent field usage across all posts
2. **SEO**: Always fill in title, description, and meta fields
3. **Images**: Use descriptive alt text and optimize images before uploading
4. **Performance**: Use the featured/draft flags to control which posts are published
5. **Backup**: Regularly backup your Strapi content

## Support

For issues specific to this integration, check:
- Strapi documentation: https://docs.strapi.io/
- Astro documentation: https://docs.astro.build/

The integration maintains compatibility with your existing blog structure while providing the flexibility of a headless CMS. 