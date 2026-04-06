import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { CardGridBlock, CardItem, CaseStudyCard as CaseStudyCardType, TeamCard as TeamCardType, JobCard as JobCardType, PressCard as PressCardType, BlogCard as BlogCardType } from '@/types/contracts'

interface CardGridProps {
  block: CardGridBlock
}

const colsClass = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

export function CardGrid({ block }: CardGridProps) {
  const cols = block.columns ?? 3

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-[1420px] px-4 lg:px-8">
        {(block.eyebrow || block.title) && (
          <div className="mb-8">
            {block.eyebrow && (
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-accent-cyan">
                {block.eyebrow}
              </p>
            )}
            {block.title && (
              <h2 className="text-2xl font-semibold tracking-[0.02em] text-txt sm:text-3xl">
                {block.title}
              </h2>
            )}
          </div>
        )}

        <div className={`grid gap-4 ${colsClass[cols]}`}>
          {block.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.25, delay: i * 0.06 }}
            >
              <CardSwitch item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CardSwitch({ item }: { item: CardItem }) {
  switch (item.cardType) {
    case 'caseStudy': return <CaseStudyCard item={item} />
    case 'team': return <TeamMemberCard item={item} />
    case 'job': return <JobListingCard item={item} />
    case 'press': return <PressItemCard item={item} />
    case 'blog': return <BlogPostCard item={item} />
  }
}

function CaseStudyCard({ item }: { item: CaseStudyCardType }) {
  return (
    <Link to={`/case-studies#${item.slug}`} className="block h-full border border-line bg-surface-secondary p-5 transition-colors hover:bg-surface-secondary">
      <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-txt">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-txt-secondary">{item.summary}</p>
      {item.metric && (
        <div className="mt-4 border-t border-line pt-3">
          <p className="font-mono text-xl font-bold text-accent-signal">{item.metric}</p>
          {item.metricLabel && (
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-txt-muted">
              {item.metricLabel}
            </p>
          )}
        </div>
      )}
    </Link>
  )
}

function TeamMemberCard({ item }: { item: TeamCardType }) {
  return (
    <div className="border border-line bg-surface-secondary p-5">
      <div className="mb-3 h-16 w-16 border border-line bg-surface-elevated" aria-hidden />
      <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-txt">{item.name}</h3>
      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-accent-cyan">{item.title}</p>
      <p className="mt-2 text-xs leading-relaxed text-txt-secondary">{item.bio}</p>
    </div>
  )
}

function JobListingCard({ item }: { item: JobCardType }) {
  return (
    <div className="flex h-full flex-col border border-line bg-surface-secondary p-5">
      <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-txt">{item.title}</h3>
      <div className="mt-1 flex gap-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-accent-cyan">{item.department}</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-txt-muted">{item.location}</span>
      </div>
      <p className="mt-3 flex-1 text-xs leading-relaxed text-txt-secondary">{item.description}</p>
      <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent-signal">
        Apply &rarr;
      </p>
    </div>
  )
}

function PressItemCard({ item }: { item: PressCardType }) {
  const inner = (
    <div className="border border-line bg-surface-secondary p-5 transition-colors hover:bg-surface-secondary">
      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-txt-muted">{item.date}</p>
      <h3 className="mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-txt">{item.title}</h3>
      {item.source && (
        <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-accent-cyan">{item.source}</p>
      )}
      <p className="mt-2 text-xs leading-relaxed text-txt-secondary">{item.summary}</p>
    </div>
  )
  if (item.href) return <a href={item.href} target="_blank" rel="noreferrer">{inner}</a>
  return inner
}

function BlogPostCard({ item }: { item: BlogCardType }) {
  return (
    <Link to={`/resources/blog/${item.slug}`} className="block border border-line bg-surface-secondary p-5 transition-colors hover:bg-surface-secondary">
      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-txt-muted">{item.date}</p>
      <h3 className="mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-txt">{item.title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-txt-secondary">{item.summary}</p>
      {item.author && (
        <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-txt-muted">{item.author}</p>
      )}
    </Link>
  )
}
