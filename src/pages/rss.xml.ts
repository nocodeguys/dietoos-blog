import rss from '@astrojs/rss';
import { strapiClient } from '@/lib/strapi';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blog = await strapiClient.getBlogPosts();

  return rss({
    title: 'Dietoos Blog',
    description: 'Evidence-based insights on nutrition, wellness, and healthy living. Expert-curated content to help you make informed decisions for your wellness journey.',
    site: context.site || 'https://localhost:4321',
    
    items: blog.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
      author: post.data.author,
      categories: [post.data.category, ...post.data.tags],
      
      // Custom RSS elements for better SEO
      customData: `
        <content:encoded><![CDATA[
          ${post.data.description}
          <br><br>
          <a href="${context.site || 'https://localhost:4321'}/blog/${post.slug}/">Read the full article</a>
        ]]></content:encoded>
        <dc:creator>${post.data.author}</dc:creator>
        ${post.data.heroImage ? `<media:content url="${post.data.heroImage}" type="image/jpeg" />` : ''}
        <guid isPermaLink="true">${context.site || 'https://localhost:4321'}/blog/${post.slug}/</guid>
      `.trim(),
    })),

    // RSS feed customization
    customData: `
      <language>en-us</language>
      <copyright>Copyright ${new Date().getFullYear()} Dietoos Blog</copyright>
      <managingEditor>maciej@dietoos.com (Maciej Wisniewski)</managingEditor>
      <webMaster>maciej@dietoos.com (Maciej Wisniewski)</webMaster>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <category>Health</category>
      <category>Nutrition</category>
      <category>Wellness</category>
      <category>Diet</category>
      <ttl>60</ttl>
      <image>
        <url>${context.site || 'https://localhost:4321'}/og-image.png</url>
        <title>Dietoos Blog</title>
        <link>${context.site || 'https://localhost:4321'}</link>
        <description>Evidence-based insights on nutrition and wellness</description>
        <width>144</width>
        <height>144</height>
      </image>
    `.trim(),

    // RSS 2.0 with content extensions
    xmlns: {
      content: 'http://purl.org/rss/1.0/modules/content/',
      dc: 'http://purl.org/dc/elements/1.1/',
      media: 'http://search.yahoo.com/mrss/',
    },
  });
} 