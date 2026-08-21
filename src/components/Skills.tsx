import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const primarySkills = [
  { name: 'Python', align: 'left' },
  { name: 'TypeScript', align: 'right' },
  { name: 'React', align: 'left' },
  { name: 'JavaScript', align: 'right' },
  { name: 'FastAPI', align: 'left' },
  { name: 'UI/UX Design', align: 'right' },
]

const secondarySkills = [
  'HTML', 'CSS', 'Git', 'SQLite', 'GSAP', 'Framer Motion',
  'Tailwind CSS', 'Vite', 'Lenis', 'Figma', 'Data Science', 'Machine Learning',
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const skillRefs = useRef<(HTMLDivElement | null)[]>([])
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Title
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

    // Staggered skill reveals
    skillRefs.current.forEach((el, i) => {
      if (!el) return
      const isRight = i % 2 !== 0
      gsap.fromTo(
        el,
        { opacity: 0, x: isRight ? 40 : -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      )
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-32 md:py-48 overflow-hidden"
    >
      {/* Header */}
      <div
        ref={titleRef}
        className="px-8 md:px-16 lg:px-24 mb-20 md:mb-28"
      >
        <p className="text-label mb-4">Capabilities</p>
        <h2
          className="font-display text-cream"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 300,
            lineHeight: 0.95,
          }}
        >
          The tools I
          <br />
          <em>work with.</em>
        </h2>
      </div>

      {/* Large skills list */}
      <div className="px-8 md:px-16 lg:px-24">
        {primarySkills.map((skill, i) => (
          <div
            key={skill.name}
            ref={(el) => { skillRefs.current[i] = el }}
            className="skill-item group cursor-default"
            style={{
              display: 'block',
              textAlign: skill.align as 'left' | 'right',
              borderBottom: i < primarySkills.length - 1 ? '1px solid #1e1e1e' : 'none',
              paddingTop: '1.5rem',
              paddingBottom: '1.5rem',
            }}
          >
            <div className="flex items-center justify-between">
              {skill.align === 'left' && (
                <>
                  <span
                    className="font-display text-ash group-hover:text-cream transition-all duration-500"
                    style={{
                      fontSize: 'clamp(2.5rem, 7vw, 7rem)',
                      fontWeight: 300,
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {skill.name}
                  </span>
                  <span
                    className="text-dim font-sans opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}
                  >
                    SKILL 0{i + 1}
                  </span>
                </>
              )}
              {skill.align === 'right' && (
                <>
                  <span
                    className="text-dim font-sans opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}
                  >
                    SKILL 0{i + 1}
                  </span>
                  <span
                    className="font-display text-ash group-hover:text-cream transition-all duration-500"
                    style={{
                      fontSize: 'clamp(2.5rem, 7vw, 7rem)',
                      fontWeight: 300,
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {skill.name}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Marquee secondary skills */}
      <div className="mt-16 md:mt-24 overflow-hidden py-5 border-t border-b border-surface">
        <div
          ref={marqueeRef}
          className="flex gap-10 marquee-animate"
          style={{ width: 'max-content' }}
        >
          {[...secondarySkills, ...secondarySkills].map((skill, i) => (
            <span
              key={i}
              className="font-sans text-dim whitespace-nowrap"
              style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}
            >
              {skill}
              <span className="mx-4 text-border">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
