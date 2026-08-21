import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  {
    year: '2024',
    title: 'The Beginning',
    description:
      'Started exploring programming and web development. Fell in love with the idea of building things from scratch — first lines of code written.',
  },
  {
    year: '2025',
    title: 'First Real Projects',
    description:
      'Built ShopNav and the QR Restaurant Ordering System. Discovered the intersection of data science and creative development. Began studying UI/UX design principles.',
  },
  {
    year: '2026',
    title: 'Data Science & Modern Web',
    description:
      'Pursuing Data Science studies while expanding into advanced web technologies. Exploring AI, machine learning, and the future of intelligent digital products.',
  },
]

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const entriesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
      }
    )

    entriesRef.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        }
      )
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="py-32 md:py-48 px-8 md:px-16 lg:px-24"
    >
      {/* Header */}
      <div ref={titleRef} className="mb-20 md:mb-32">
        <p className="text-label mb-4">Journey</p>
        <h2
          className="font-display text-cream"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 300,
            lineHeight: 0.95,
          }}
        >
          How I got
          <br />
          <em>here.</em>
        </h2>
      </div>

      {/* Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Vertical line */}
        <div className="hidden md:block md:col-span-1 relative">
          <div
            className="absolute top-0 bottom-0 left-0"
            style={{ width: '1px', background: '#1e1e1e' }}
          />
        </div>

        {/* Entries */}
        <div className="md:col-span-10 md:col-start-2">
          {timeline.map((entry, i) => (
            <div
              key={entry.year}
              ref={(el) => { entriesRef.current[i] = el }}
              className="relative grid grid-cols-1 md:grid-cols-12 gap-6 pb-16 md:pb-24"
            >
              {/* Timeline dot (desktop) */}
              <div className="hidden md:block absolute -left-[calc(8.33%+0.5px)] top-2">
                <div
                  className="w-2 h-2 rounded-full border border-ash"
                  style={{ background: 'var(--ink)' }}
                />
              </div>

              {/* Year */}
              <div className="md:col-span-2">
                <span
                  className="font-display text-dim"
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 300,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {entry.year}
                </span>
              </div>

              {/* Content */}
              <div className="md:col-span-8">
                <h3
                  className="font-display text-cream mb-4"
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    fontWeight: 300,
                    lineHeight: 1.1,
                    fontStyle: 'italic',
                  }}
                >
                  {entry.title}
                </h3>
                <p
                  className="text-ash font-sans"
                  style={{ fontSize: '0.92rem', lineHeight: 1.85, maxWidth: '52ch' }}
                >
                  {entry.description}
                </p>
              </div>
            </div>
          ))}

          {/* Present marker */}
          <div className="flex items-center gap-4">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: 'var(--violet)', boxShadow: '0 0 8px rgba(155,143,212,0.5)' }}
            />
            <span className="text-label" style={{ color: 'var(--violet)' }}>
              Present
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
