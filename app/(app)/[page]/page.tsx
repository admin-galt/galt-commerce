import Prose from '@/components/prose';
import { getPayloadClient } from '@/lib/payload';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const payload = await getPayloadClient();
  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: params.page
      }
    }
  });

  if (!page.docs[0]) return notFound();

  return {
    title: page.docs[0].meta?.title || page.docs[0].title,
    description: page.docs[0].meta?.description,
  };
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params;
  const payload = await getPayloadClient();
  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: params.page
      }
    }
  });

  if (!page.docs[0]) return notFound();

  // Convert the rich text content to HTML
  const content = page.docs[0].content?.root?.children
    ?.map((node: any) => {
      if (node.type === 'paragraph') {
        return `<p>${node.children?.map((child: any) => child.text).join('')}</p>`;
      }
      return '';
    })
    .join('');

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{page.docs[0].title}</h1>
      <Prose className="mb-8" html={content} />
    </>
  );
}
