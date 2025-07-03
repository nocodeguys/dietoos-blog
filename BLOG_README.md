# Dietoos Blog - High-Performance Astro 5 Blog

A high-performance, SEO-optimized blog built with Astro 5, featuring evidence-based content management, advanced SEO capabilities, and lightning-fast loading times.

## 🚀 Features

### Performance & SEO
- **Astro 5** with static site generation for optimal performance
- **Advanced SEO** with structured data, Open Graph, and Twitter Cards
- **RSS feed** for content syndication
- **Sitemap** generation for search engines
- **Reading time calculation** for better user experience
- **Lazy loading** images with proper dimensions
- **Prefetch hints** for critical resources

### Content Management
- **Content Collections** with TypeScript schema validation
- **Markdown/MDX** support with syntax highlighting
- **Frontmatter validation** ensures consistent metadata
- **Draft support** for unpublished content
- **Featured posts** system for content curation
- **Category and tag** organization

### User Experience
- **Responsive design** with mobile-first approach
- **Dark/light mode** support
- **Accessibility** compliant with WCAG guidelines
- **Fast navigation** with optimized routing
- **Social sharing** buttons
- **Newsletter signup** integration ready

## 📁 Project Structure

```
src/
├── components/
│   ├── BlogSEO.astro          # Advanced SEO component for blog posts
│   ├── Header.astro            # Navigation with blog links
│   └── ui/                     # Shadcn UI components
├── content/
│   ├── config.ts              # Content collection schema
│   └── blog/                  # Blog post markdown files
├── layouts/
│   ├── BaseLayout.astro       # General page layout
│   └── BlogLayout.astro       # Blog post layout with enhanced features
├── lib/
│   ├── reading-time.ts        # Reading time calculation utilities
│   ├── seo.ts                 # SEO optimization utilities
│   └── utils.ts               # General utilities
└── pages/
    ├── blog/
    │   ├── index.astro        # Blog listing page
    │   └── [...slug].astro    # Dynamic blog post pages
    ├── rss.xml.ts             # RSS feed generation
    └── index.astro            # Homepage with blog integration
```

## 🛠 Content Creation

### Creating a New Blog Post

1. Create a new `.md` or `.mdx` file in `src/content/blog/`
2. Add the required frontmatter:

```markdown
---
title: "Your Blog Post Title"
description: "A compelling description for SEO and social sharing"
pubDate: 2025-01-27
category: "nutrition" # nutrition, wellness, lifestyle, etc.
tags: ["health", "diet", "science"]
featured: false # Set to true for homepage featuring
author: "Your Name"
heroImage: "/blog/your-image.jpg" # Optional
heroImageAlt: "Descriptive alt text"
seo:
  metaTitle: "Custom SEO title (optional)"
  metaDescription: "Custom meta description (optional)"
  ogImage: "/blog/your-og-image.jpg" # Optional
readingTime: 5 # Optional, auto-calculated if not provided
---

# Your Blog Post Content

Write your content here...
```

### Content Guidelines

#### SEO Optimization
- **Title**: 50-60 characters for optimal display in search results
- **Description**: 120-155 characters, compelling and informative
- **Categories**: Use consistent category names (nutrition, wellness, lifestyle, etc.)
- **Tags**: 3-5 relevant tags per post
- **Images**: Always include alt text for accessibility

#### Writing Best Practices
- Use clear, descriptive headings (H2, H3, etc.)
- Include relevant internal links to other blog posts
- Add image captions where helpful
- Keep paragraphs concise and scannable
- Include actionable takeaways

#### Performance Considerations
- Optimize images before uploading (WebP format recommended)
- Use lazy loading for non-critical images
- Keep markdown clean and well-structured

## 🎨 Styling

### Tailwind CSS
The blog uses Tailwind CSS with the Typography plugin for beautiful prose styling. Key classes:

```css
prose            # Base typography styles
prose-lg         # Larger text for better readability
max-w-none       # Remove max-width restrictions
```

### Custom Styling
Additional styles are defined in:
- `src/styles/global.css` - Global styles and CSS variables
- `tailwind.config.js` - Custom typography styles for the blog

## 🔧 Configuration

### Site Configuration
Update `astro.config.ts` for your site:

```typescript
export default defineConfig({
  site: 'https://your-domain.com', // Your site URL
  integrations: [
    react(),
    sitemap(),
  ],
  // ... other config
});
```

### SEO Configuration
Update SEO settings in:
- `src/components/BlogSEO.astro` - Meta tags and structured data
- `src/pages/rss.xml.ts` - RSS feed configuration

## 📊 Analytics & Performance

### Core Web Vitals
The blog is optimized for:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Performance Features
- Static site generation for instant loading
- Image optimization with proper sizing
- Critical CSS inlining
- Minimal JavaScript for core functionality
- DNS prefetching for external resources

## 🚀 Deployment

### Build Process
```bash
# Install dependencies
pnpm install

# Generate content collection types
pnpm astro sync

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Deployment Platforms
The blog is optimized for:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Static hosting** services

### Environment Variables
Set these for production:
```bash
SITE_URL=https://your-domain.com
```

## 🧪 Development

### Local Development
```bash
# Start development server
pnpm dev

# Access the blog
# Homepage: http://localhost:4321/
# Blog: http://localhost:4321/blog/
# RSS: http://localhost:4321/rss.xml
```

### Content Validation
The content schema ensures:
- Required fields are present
- Dates are properly formatted
- Tags and categories are consistent
- SEO metadata is complete

### Testing Checklist
- [ ] All blog posts load correctly
- [ ] RSS feed validates
- [ ] Meta tags are properly set
- [ ] Images have alt text
- [ ] Links work correctly
- [ ] Mobile responsiveness
- [ ] Performance scores (Lighthouse)

## 🔮 Future Enhancements

### Content Features
- [ ] Related posts suggestions
- [ ] Full-text search
- [ ] Comment system integration
- [ ] Author profiles
- [ ] Content series/collections

### SEO & Performance
- [ ] Dynamic Open Graph image generation
- [ ] Advanced schema markup
- [ ] Automatic internal linking
- [ ] Image optimization service
- [ ] CDN integration

### User Experience
- [ ] Table of contents generation
- [ ] Reading progress indicator
- [ ] Print-friendly styles
- [ ] Offline reading support
- [ ] Social sharing analytics

## 📝 Contributing

### Content Contribution
1. Fork the repository
2. Create a new blog post in `src/content/blog/`
3. Follow the content guidelines
4. Submit a pull request

### Code Contribution
1. Follow the existing code style
2. Add TypeScript types where applicable
3. Test changes locally
4. Update documentation if needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Astro** for the amazing static site generator
- **Tailwind CSS** for the utility-first CSS framework
- **Shadcn UI** for the beautiful component library
- **TypeScript** for type safety and developer experience

---

For questions or support, please open an issue on GitHub or contact the maintainers. 