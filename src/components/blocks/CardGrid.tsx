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
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-stage-cyan">
                {block.eyebrow}
              </p>
            )}
            {block.title && (
              <h2 className="text-2xl font-semibold tracking-[0.02em] text-[#1f1b15] sm:text-3xl">
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
    <Link to={`/case-studies#${item.slug}`} className="block h-full border border-[#d2c8b3] bg-[#efe6d5]/60 p-5 transition-colors hover:bg-[#efe6d5]">
      <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#1f1b15]">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[#534b3f]">{item.summary}</p>
      {item.metric && (
        <div className="mt-4 border-t border-[#d2c8b3] pt-3">
          <p className="font-mono text-xl font-bold text-stage-signal">{item.metric}</p>
          {item.metricLabel && (
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#6f6656]">
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
    <div className="border border-[#d2c8b3] bg-[#efe6d5]/60 p-5">
      <div className="mb-3 h-16 w-16 border border-[#d2c8b3] bg-[#f5efdf]" aria-hidden />
      <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#1f1b15]">{item.name}</h3>
      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-stage-cyan">{item.title}</p>
      <p className="mt-2 text-xs leading-relaxed text-[#534b3f]">{item.bio}</p>
    </div>
  )
}

function JobListingCard({ item }: { item: JobCardType }) {
  return (
    <div className="flex h-full flex-col border border-[#d2c8b3] bg-[#efe6d5]/60 p-5">
      <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#1f1b15]">{item.title}</h3>
      <div className="mt-1 flex gap-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-stage-cyan">{item.department}</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#6f6656]">{item.location}</span>
      </div>
      <p className="mt-3 flex-1 text-xs leading-relaxed text-[#534b3f]">{item.description}</p>
      <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-stage-signal">
        Apply &rarr;
      </p>
    </div>
  )
}

function PressItemCard({ item }: { item: PressCardType }) {
  const inner = (
    <div className="border border-[#d2c8b3] bg-[#efe6d5]/60 p-5 transition-colors hover:bg-[#efe6d5]">
      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#8a8174]">{item.date}</p>
      <h3 className="mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#1f1b15]">{item.title}</h3>
      {item.source && (
        <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-stage-cyan">{item.source}</p>
      )}
      <p className="mt-2 text-xs leading-relaxed text-[#534b3f]">{item.summary}</p>
    </div>
  )
  if (item.href) return <a href={item.href} target="_blank" rel="noreferrer">{inner}</a>
  return inner
}

function BlogPostCard({ item }: { item: BlogCardType }) {
  return (
    <Link to={`/resources/blog/${item.slug}`} className="block border border-[#d2c8b3] bg-[#efe6d5]/60 p-5 transition-colors hover:bg-[#efe6d5]">
      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#8a8174]">{item.date}</p>
      <h3 className="mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#1f1b15]">{item.title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-[#534b3f]">{item.summary}</p>
      {item.author && (
        <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-[#6f6656]">{item.author}</p>
      )}
    </Link>
  )
}
