'use client';

import BlogList from '../components/BlogList';
import { usePreview } from '../sanity/lib/preview';

type Props = {
  query: string;
};

export default function PreviewBlogList({ query }: Props) {
  const posts = usePreview(false, query) as any;
  return <BlogList posts={posts} />;
}
