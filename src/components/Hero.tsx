import { useEffect, useRef, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Robot from './Robot'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameLine1Ref = useRef<HTMLDivElement>(null)
  const nameLine2Ref = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const rolesRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const robotContainerRef = useRef<HTMLDivElement>(null)

  // Mouse light effect
  useEffect(() => {
    const section = sectionRef.current
    const light = lightRef.current
    if (!section || !light) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      gsap.to(light, {
        x: x,
        y: y,
        duration: 1.2,
        ease: 'power2.out',
      })
    }

    section.addEventListener('mousemove', handleMouseMove)
    return () => section.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Entrance animations after intro
  useEffect(() => {
    const delay = 4.2 // After intro completes

    const tl = gsap.timeline({ delay })

    // Split "BUILDING" into chars
    const line1 = nameLine1Ref.current
    const line2 = nameLine2Ref.current

    if (line1) {
      line1.innerHTML = line1.textContent!
        .split('')
        .map((c) =>
          c === ' '
            ? '<span>&nbsp;</span>'
            : `<span class="char-wrap" style="display:inline-block;overflow:hidden"><span class="char-inner" style="display:inline-block;transform:translateY(110%)">${c}</span></span>`
        )
        .join('')
    }

    if (line2) {
      line2.innerHTML = line2.textContent!
        .split('')
        .map((c) =>
          c === ' '
            ? '<span>&nbsp;</span>'
            : `<span class="char-wrap" style="display:inline-block;overflow:hidden"><span class="char-inner" style="display:inline-block;transform:translateY(110%)">${c}</span></span>`
        )
        .join('')
    }

    tl.to('.char-inner', {
      y: '0%',
      duration: 1,
      stagger: 0.02,
      ease: 'power4.out',
    })

    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      '-=0.5'
    )

    tl.fromTo(
      rolesRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: 'power2.out' },
      '-=0.4'
    )

    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )

    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.2'
    )

    tl.fromTo(
      robotContainerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 0.6, scale: 1, duration: 1.5, ease: 'power3.out' },
      '-=1'
    )

    // Parallax on scroll
    gsap.to(nameLine1Ref.current, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    gsap.to(nameLine2Ref.current, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      },
    })

    gsap.to(taglineRef.current, {
      y: -30,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'center top',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: '12vh', paddingBottom: '8vh' }}
    >
      {/* Mouse following light */}
      <div
        ref={lightRef}
        className="mouse-light"
        style={{ top: '50%', left: '40%' }}
      />

      {/* Subtle background lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-0 bottom-0"
          style={{ width: '1px', background: 'rgba(38,38,38,0.5)' }}
        />
      </div>

      {/* Robot 3D Character */}
      <div 
        ref={robotContainerRef}
        className="relative md:absolute md:top-0 right-0 w-full md:w-[45%] lg:w-[40%] h-[40vh] md:h-full opacity-0 pointer-events-none z-0 order-2 md:order-none mt-8 md:mt-0"
        style={{ transformOrigin: 'center center' }}
      >
        <Suspense fallback={null}>
          <Robot />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24 order-1 md:order-none">
        {/* Small label */}
        <div className="text-label mb-6 md:mb-8 opacity-0" ref={rolesRef}>
          Data Science Student &nbsp;·&nbsp; Developer &nbsp;·&nbsp; UI/UX Enthusiast
        </div>

        {/* Large name / headline */}
        <div className="overflow-visible">
          <div
            ref={nameLine1Ref}
            className="font-display text-cream block leading-none select-none"
            style={{
              fontSize: 'clamp(2.8rem, 10vw, 10.4rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 0.88,
            }}
          >
            Building Digital
          </div>
          <div
            ref={nameLine2Ref}
            className="font-display block leading-none select-none"
            style={{
              fontSize: 'clamp(2.8rem, 10vw, 10.4rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 0.88,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(200,196,190,0.4)',
            }}
          >
            Experiences.
          </div>
        </div>

        {/* Tagline */}
        <div
          ref={taglineRef}
          className="mt-6 md:mt-10 max-w-lg opacity-0"
          style={{ marginLeft: '2px' }}
        >
          <p className="text-ash font-sans" style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
            Where technology meets creativity — designing and building
            <br className="hidden md:block" />
            premium digital products that feel intentional.
          </p>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-8 md:mt-12 opacity-0">
          <a
            href="#work"
            className="magnetic-btn inline-block"
            data-cursor="hover"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View Work
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 md:bottom-10 right-6 md:right-12 flex flex-col items-center gap-3 opacity-0 z-20"
      >
        <span className="text-label hidden md:block" style={{ writingMode: 'vertical-lr', letterSpacing: '0.2em' }}>
          Scroll
        </span>
        <div className="scroll-indicator" style={{ color: 'var(--dim)' }}>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
            <rect x="0.5" y="0.5" width="13" height="21" rx="6.5" stroke="currentColor" strokeOpacity="0.4" />
            <rect x="6" y="4" width="2" height="5" rx="1" fill="currentColor" fillOpacity="0.5" />
          </svg>
        </div>
      </div>
    </section>
  )
}
