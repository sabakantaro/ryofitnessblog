import React from 'react';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import urlFor from '@/sanity/lib/urlFor';
import PortableText from 'react-portable-text';
import { RichTextComponents } from '@/components/RichTextComponents';
import { Post as PostType } from '@/typings';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 30;

export async function generateStaticParams() {
  const query = groq`
    *[_type == 'post'] {
        slug
      }`;

  const slugs: PostType[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug.slug.current);

  return slugRoutes.map((slug) => ({
    slug,
  }));
}

const Post = async ({ params: { slug } }: Props) => {
  const query = groq`
  *[_type == 'post' && slug.current == $slug][0] {
    ...,
    author->,
    categories[]->
  }
`;

  const post = await client.fetch(query, { slug });

  return (
    <article className='px-10 mb-28'>
      <section className='space-y-20 border border-[#0a8cf7] text-white'>
        <div className='relative min-h-56 flex flex-col md:flex-row justify-between'>
          <div className='absolute top-0 w-full h-full opacity-10 blur-sm p-10'>
            <Image
              className='object-cover object-center mx-auto'
              src={urlFor(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </div>

          <section className='p-5 bg-[#0a8cf7] w-full'>
            <div className='flex flex-col md:flex-row justify-between gap-y-5'>
              <div>
                <h1 className='text-4xl font-bold'>{post.title}</h1>

                <p>
                  {new Date(post._createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <a href={`/author/${post.author.slug.current}`} className='flex items-center space-x-2 z-50'>
                <Image
                  className='rounded-full'
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  width={40}
                  height={40}
                />

                <div className='w-64'>
                  <h3>{post.author.name}</h3>
                </div>
              </a>
            </div>
            <div>
              <h2 className='italic pt-10'>{post.description}</h2>
              <div className='flex items-center justify-end mt-auto space-x-2'>
                {post.categories.map((category: any) => (
                  <p
                    key={category._id}
                    className='bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4'
                  >
                    {category.title}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      <PortableText content={post.body} serializers={RichTextComponents} />
    </article>
  );
};

export default Post;
