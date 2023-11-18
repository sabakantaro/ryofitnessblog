import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import BlogList from '@/components/BlogList';

// @ts-ignore
export const query = groq`
  *[_type == 'post'] {
    ...,
    author->,
    categories[]->
  } | order(_createdAt desc)
`;

export default async function HomePage() {
  const posts = await client.fetch(query);
  return <BlogList posts={posts} />;
}
