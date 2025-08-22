// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blogs', ({ data }) => !('draft' in data) || !data.draft);
  return rss({
    title: 'Your Name — Blog',
    description: 'Writing on infra, observability, product and other randomness.',
    site: context.site,              // requires astro.config.mjs "site"
    items: posts.map((p) => ({
      link: `/blog/${p.slug}/`,
      title: p.data.title,
      description: p.data.description,
      pubDate: new Date(p.data.datetime),
    })),
  });
}
