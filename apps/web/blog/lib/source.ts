import { createMDXSource } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';
import { blogPosts } from '@/.source';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const blog = loader({
  // it assigns a URL to your pages
  baseUrl: '/blog',
  source: createMDXSource(blogPosts),
});
