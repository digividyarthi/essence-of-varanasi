import Image from 'next/image';
import Link from 'next/link';
import { posts } from '@/lib/posts';
import SectionHeading from '@/components/ui/SectionHeading';
import { IconArrowUpRight, IconClock } from '@/components/ui/icons';

export default function InspirationGrid() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Inspiration"
          title={
            <>
              Notes from the <span className="accent-italic">ghats</span>
            </>
          }
          description="Slow reads to help you plan — the kind of local knowledge that only decades on the river can produce."
          className="mx-auto"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-line bg-white shadow-soft card-hover"
            >
              <div className="relative aspect-[5/3] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 768px) 400px, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-maroon backdrop-blur">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs text-brand-muted">
                  <IconClock width={13} height={13} /> {post.readTime} read
                </div>
                <h3 className="mt-3 font-serif text-xl text-brand-maroon leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-brand-ink/70">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-saffron-dark transition-all group-hover:gap-2">
                  Read more <IconArrowUpRight width={15} height={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
