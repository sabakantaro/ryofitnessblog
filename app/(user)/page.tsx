import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import BlogList from '@/components/BlogList';
const query = groq`
  *[_type == 'post'] {
    ...,
    author->,
    categories[]->
  } | order(_createdAt desc)
`;

export const revalidate = 30;

export default async function HomePage() {
  const posts = await client.fetch(query);
  // exclude privacy-policy from posts
  const filteredPosts = posts.filter(
    (post: any) => post.slug.current !== 'privacy-policy'
  );
  return <BlogList posts={filteredPosts} />;
}
