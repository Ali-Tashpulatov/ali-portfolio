import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import novaImg from '../assets/nova-architecture.jpg'
import shopnavImg from '../assets/shopnav.jpg'
import qrImg from '../assets/qr-ordering.jpg'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    number: '01',
    title: 'Nova Architecture',
    category: 'UI/UX Concept',
    description:
      'A fictional luxury architecture studio website exploring cinematic typography, immersive transitions, and editorial design. A concept project pushing the boundaries of web aesthetics.',
    tech: ['React', 'TypeScript', 'GSAP', 'Framer Motion'],
    image: novaImg,
    note: 'Fictional / Concept Project',
  },
  {
    number: '02',
    title: 'ShopNav',
    category: 'Web Application',
    description:
      'A smart product finder designed to help users discover and compare products across multiple supermarkets, featuring interactive maps and real-time filtering.',
    tech: ['React', 'JavaScript', 'HTML', 'CSS', 'Leaflet / OpenStreetMap'],
    image: shopnavImg,
  },
  {
    number: '03',
    title: 'QR Ordering',
    category: 'Digital Experience',
    description:
      'A complete restaurant ordering platform where customers scan a QR code at their table, browse the digital menu, and place orders — entirely contactless.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'FastAPI', 'SQLite'],
    image: qrImg,
  },
]

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Section title reveal
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        },
      }
    )

    // Each project card
    const cards = sectionRef.current?.querySelectorAll('.project-card')
    cards?.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          },
        }
      )

      // Image clip-path reveal
      const img = card.querySelector('.project-image-wrap')
      if (img) {
        gsap.fromTo(
          img,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.3,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
            },
          }
        )
      }
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-32 md:py-48 px-8 md:px-16 lg:px-24"
    >
      {/* Section Header */}
      <div ref={titleRef} className="flex items-end justify-between mb-20 md:mb-32">
        <div>
          <p className="text-label mb-4">Selected Work</p>
          <h2
            className="font-display text-cream"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 300,
              lineHeight: 0.95,
            }}
          >
            Projects that
            <br />
            <em>speak for themselves.</em>
          </h2>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-dim font-sans" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>
            2024 — 2026
          </p>
        </div>
      </div>

      {/* Project List */}
      <div className="space-y-2">
        {projects.map((project, index) => (
          <article
            key={project.number}
            className="project-card group relative"
            data-cursor="project"
          >
            {/* Top divider */}
            <div className="h-line" />

            <div className="py-8 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left: Number */}
              <div className="md:col-span-1 flex items-start pt-1">
                <span
                  className="text-dim font-sans"
                  style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}
                >
                  {project.number}
                </span>
              </div>

              {/* Center: Info */}
              <div className="md:col-span-5">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-label">{project.category}</span>
                  {project.note && (
                    <span
                      className="font-sans text-dim border border-dim rounded px-2 py-0.5"
                      style={{ fontSize: '0.55rem', letterSpacing: '0.15em' }}
                    >
                      {project.note.toUpperCase()}
                    </span>
                  )}
                </div>

                <h3
                  className="font-display text-cream mb-5 transition-all duration-500 group-hover:text-violet"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    fontWeight: 300,
                    lineHeight: 1.05,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {project.title}
                </h3>

                <p
                  className="text-ash font-sans mb-6"
                  style={{ fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '42ch' }}
                >
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-sans text-dim border border-muted px-3 py-1 rounded-full"
                      style={{ fontSize: '0.6rem', letterSpacing: '0.12em' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Image */}
              <div className="md:col-span-6">
                <div
                  className="project-image-wrap relative bg-[#1a1a1a] rounded-xl border border-[#333] shadow-2xl"
                  style={{
                    width: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <div className="w-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={`${project.title} project preview`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        objectFit: 'contain',
                        filter: 'brightness(0.85) contrast(1.05)',
                        transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s ease',
                      }}
                      className="group-hover:scale-[1.03] group-hover:brightness-100"
                    />
                  </div>

                  {/* Overlay number */}
                  <div
                    className="absolute bottom-4 right-4 font-display text-cream opacity-20 z-20"
                    style={{ fontSize: '4rem', fontWeight: 300, lineHeight: 1, pointerEvents: 'none' }}
                  >
                    {project.number}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom divider for last item */}
            {index === projects.length - 1 && <div className="h-line" />}
          </article>
        ))}
      </div>
    </section>
  )
}
