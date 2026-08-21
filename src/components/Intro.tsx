import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface IntroProps {
  onComplete: () => void
}

export default function Intro({ onComplete }: IntroProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const rolesRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Slide up the overlay
        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete: onComplete,
        })
      },
    })

    // Counter animation
    tl.fromTo(
      counterRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    )

    // Count up 0-100
    const counter = { value: 0 }
    tl.to(
      counter,
      {
        value: 100,
        duration: 2,
        ease: 'power1.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(Math.round(counter.value))
          }
        },
      },
      '<'
    )

    // Fade out counter
    tl.to(counterRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')

    // Reveal the name letter by letter
    const nameEl = nameRef.current
    if (nameEl) {
      nameEl.innerHTML = 'ALI'
        .split('')
        .map((char) => `<span class="char" style="display:inline-block;overflow:hidden"><span style="display:inline-block;transform:translateY(100%)">${char}</span></span>`)
        .join('')
    }

    tl.to(
      `${nameRef.current ? '#intro-name' : ''} .char span`,
      {
        y: '0%',
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out',
      },
      '-=0.1'
    )

    // Line
    tl.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )

    // Tagline
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )

    // Roles
    tl.fromTo(
      rolesRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )

    // Hold, then complete
    tl.to({}, { duration: 0.8 })

    // Fade name + tagline out
    tl.to([nameRef.current, taglineRef.current, rolesRef.current, lineRef.current], {
      opacity: 0,
      y: -20,
      stagger: 0.05,
      duration: 0.5,
      ease: 'power3.in',
    })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      className="intro-overlay"
      aria-hidden="true"
    >
      {/* Background subtle particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              background: 'rgba(155, 143, 212, 0.3)',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `grain ${2 + Math.random() * 3}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Counter */}
      <div
        ref={counterRef}
        className="absolute bottom-10 right-12 font-sans text-dim"
        style={{ fontSize: '0.65rem', letterSpacing: '0.2em', opacity: 0 }}
      >
        0
      </div>

      {/* Main content */}
      <div className="text-center px-8 relative z-10">
        <div
          id="intro-name"
          ref={nameRef}
          className="font-display text-cream"
          style={{
            fontSize: 'clamp(5rem, 20vw, 16rem)',
            fontWeight: 300,
            letterSpacing: '0.15em',
            lineHeight: 0.9,
          }}
        />

        <div
          ref={lineRef}
          className="mx-auto mt-6 mb-6"
          style={{
            height: '1px',
            background: 'rgba(200, 196, 190, 0.2)',
            width: '200px',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />

        <div
          ref={taglineRef}
          className="font-sans text-ash"
          style={{ fontSize: '0.8rem', letterSpacing: '0.15em', opacity: 0 }}
        >
          Building digital experiences where technology meets creativity.
        </div>

        <div
          ref={rolesRef}
          className="mt-4 font-sans"
          style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: '#4a4744', opacity: 0 }}
        >
          DATA SCIENCE STUDENT &nbsp;•&nbsp; DEVELOPER &nbsp;•&nbsp; UI/UX ENTHUSIAST
        </div>
      </div>
    </div>
  )
}
