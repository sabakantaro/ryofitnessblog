import React from 'react';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import urlFor from '@/sanity/lib/urlFor';
import PortableText from 'react-portable-text';
import { RichTextComponents } from '@/components/RichTextComponents';
import { Author as AuthorType } from '@/typings';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 30;

export async function generateStaticParams() {
  const query = groq`
    *[_type == 'author'] {
        slug
      }`;

  const slugs: AuthorType[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug.slug.current);

  return slugRoutes.map((slug) => ({
    slug,
  }));
}

const Author = async ({ params: { slug } }: Props) => {
  const query = groq`
  *[_type == 'author' && slug.current == $slug][0] {
    ...,
    author->,
    categories[]->
  }
`;

  const author = await client.fetch(query, { slug });

  return (
    <article className='px-10 mb-28'>
      <section className='space-y-20 border border-[#0a8cf7] text-white mb-5'>
        <div className='relative min-h-56 flex flex-col md:flex-row justify-between'>
          <div className='absolute top-0 w-full h-full opacity-10 blur-sm p-10'>
            <Image
              className='object-cover object-center mx-auto'
              src={urlFor(author.image).url()}
              alt={author.name}
              fill
            />
          </div>

          <section className='p-5 bg-[#0a8cf7] w-full'>
            <div className='flex flex-col md:flex-row justify-between gap-y-5'>
              <div>
                <h1 className='text-4xl font-bold'>{author.name}&apos;s Bio</h1>
              </div>
              <div className='flex items-center space-x-2 z-50'>
                <Image
                  className='rounded-full'
                  src={urlFor(author.image).url()}
                  alt={author.name}
                  width={40}
                  height={40}
                />

                <div className='w-64'>
                  <h3>{author.name}</h3>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <PortableText content={author.bio} serializers={RichTextComponents} />
    </article>
  );
};

export default Author;
