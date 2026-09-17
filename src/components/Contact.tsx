import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const contactLinks = [
  {
    label: 'Email',
    value: 'tashpulatovali47@gmail.com',
    href: 'mailto:tashpulatovali47@gmail.com',
    display: 'tashpulatovali47@gmail.com',
  },
  {
    label: 'Phone',
    value: '+7 705 434 69 77',
    href: 'tel:+77054346977',
    display: '+7 705 434 69 77',
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const bgTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Background large text slow drift
    gsap.to(bgTextRef.current, {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    })

    // Headline reveal
    const hl = headlineRef.current
    if (hl) {
      const words = hl.textContent!.trim().split(' ')
      hl.innerHTML = words
        .map(
          (w) =>
            `<span class="word-wrap" style="display:inline-block;overflow:hidden;margin-right:0.25em"><span class="word-inner" style="display:inline-block;transform:translateY(100%)">${w}</span></span>`
        )
        .join('')
    }

    gsap.to('.word-inner', {
      y: '0%',
      duration: 1.2,
      stagger: 0.08,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: headlineRef.current,
        start: 'top 80%',
      },
    })

    gsap.fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: subRef.current, start: 'top 80%' },
      }
    )

    // Links staggered
    const linkEls = linksRef.current?.querySelectorAll('.contact-item')
    linkEls?.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: linksRef.current, start: 'top 80%' },
        }
      )
    })

    gsap.fromTo(
      socialsRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: socialsRef.current, start: 'top 85%' },
      }
    )

    gsap.fromTo(
      footerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 95%' },
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-32 px-8 md:px-16 lg:px-24"
      style={{ borderTop: '1px solid #1a1a1a' }}
    >
      {/* Background giant text */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10 md:opacity-100 z-0"
        aria-hidden="true"
      >
        <span
          className="font-display"
          style={{
            fontSize: 'clamp(8rem, 22vw, 22rem)',
            fontWeight: 300,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(38,38,38,0.6)',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          CONTACT
        </span>
      </div>

      <div className="relative z-10 max-w-4xl">
        {/* Label */}
        <p className="text-label mb-10">Let's connect</p>

        {/* Headline */}
        <div
          ref={headlineRef}
          className="font-display text-cream mb-8"
          style={{
            fontSize: 'clamp(3rem, 9vw, 9rem)',
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
          }}
        >
          Let's build something.
        </div>

        {/* Sub */}
        <p
          ref={subRef}
          className="text-ash font-sans mb-16 opacity-0"
          style={{ fontSize: '1rem', lineHeight: 1.8, maxWidth: '42ch' }}
        >
          Have an idea, project, or opportunity?
          <br />
          I'm always open to new collaborations.
        </p>

        {/* Contact links */}
        <div ref={linksRef} className="space-y-8 mb-16">
          {contactLinks.map((link) => (
            <div key={link.label} className="contact-item" style={{ opacity: 0 }}>
              <p className="text-label mb-2">{link.label}</p>
              <a
                href={link.href}
                className="contact-link font-display"
                data-cursor="hover"
                style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 2rem)',
                  letterSpacing: '-0.01em',
                }}
              >
                {link.display}
              </a>
            </div>
          ))}
        </div>

        {/* Social icons */}
        <div ref={socialsRef} className="flex gap-8 opacity-0">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-ash hover:text-cream transition-colors duration-300"
            data-cursor="hover"
            aria-label="GitHub profile"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <span
              className="font-sans"
              style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              GitHub
            </span>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-ash hover:text-cream transition-colors duration-300"
            data-cursor="hover"
            aria-label="LinkedIn profile"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            <span
              className="font-sans"
              style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              LinkedIn
            </span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="absolute bottom-8 left-8 md:left-16 lg:left-24 right-8 md:right-16 lg:right-24 flex items-center justify-between opacity-0"
      >
        <span className="text-dim font-sans" style={{ fontSize: '0.6rem', letterSpacing: '0.15em' }}>
          © 2026 Ali Tashpulatov. All rights reserved.
        </span>
        <span className="text-dim font-sans" style={{ fontSize: '0.6rem', letterSpacing: '0.15em' }}>
          Designed & Built by Ali
        </span>
      </div>
    </section>
  )
}
