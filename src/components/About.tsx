import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import portraitImg from '../assets/ali-portrait.jpg'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const textBlockRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Label
    gsap.fromTo(
      labelRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    )

    // Image reveal: clip path from bottom
    gsap.fromTo(
      imageWrapRef.current,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: imageWrapRef.current,
          start: 'top 80%',
        },
      }
    )

    // Image parallax
    gsap.to(imageRef.current, {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: imageWrapRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    // Text reveal
    const textLines = textBlockRef.current?.querySelectorAll('.text-reveal-line')
    textLines?.forEach((line, i) => {
      gsap.fromTo(
        line,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: i * 0.12,
          scrollTrigger: {
            trigger: textBlockRef.current,
            start: 'top 70%',
          },
        }
      )
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 md:py-48 px-8 md:px-16 lg:px-24 overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start">
        {/* Left: Portrait */}
        <div className="md:col-span-5 md:col-start-1">
          <div
            ref={imageWrapRef}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '2px',
              // Asymmetric portrait frame
              height: 'clamp(420px, 70vh, 700px)',
            }}
          >
            <img
              ref={imageRef}
              src={portraitImg}
              alt="Ali — Data Science student and developer"
              style={{
                width: '100%',
                height: '115%',
                objectFit: 'cover',
                objectPosition: 'center 15%',
                filter: 'brightness(0.9) contrast(1.05) saturate(0.85)',
                display: 'block',
              }}
            />

            {/* Cinematic vignette overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, transparent 50%, rgba(10,10,10,0.5) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Bottom label */}
            <div
              className="absolute bottom-5 left-5"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.55rem',
                letterSpacing: '0.25em',
                color: 'rgba(200,196,190,0.5)',
                textTransform: 'uppercase',
              }}
            >
              Ali Tashpulatov — 2026
            </div>
          </div>
        </div>

        {/* Right: Text */}
        <div
          ref={textBlockRef}
          className="md:col-span-6 md:col-start-7 flex flex-col justify-center"
          style={{ paddingTop: 'clamp(0px, 8vw, 80px)' }}
        >
          <div ref={labelRef} className="text-label mb-10">
            About
          </div>

          <div
            className="text-reveal-line font-display text-cream"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              fontWeight: 300,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              marginBottom: '2rem',
            }}
          >
            I'm Ali — a Data Science student exploring technology,
            design, and creative development.
          </div>

          <div className="h-line mb-8" style={{ width: '60px' }} />

          <p
            className="text-reveal-line text-ash font-sans"
            style={{ fontSize: '0.95rem', lineHeight: 1.85, maxWidth: '46ch', marginBottom: '1.5rem' }}
          >
            I enjoy building digital products, experimenting with modern web
            technologies, and combining data science with visual design to create
            experiences that are both intelligent and beautiful.
          </p>

          <p
            className="text-reveal-line text-ash font-sans"
            style={{ fontSize: '0.95rem', lineHeight: 1.85, maxWidth: '46ch' }}
          >
            Whether it's designing interfaces, building full-stack applications, or
            exploring machine learning — I approach every project with curiosity
            and a strong eye for detail.
          </p>

          {/* Small stats row */}
          <div className="text-reveal-line mt-12 flex gap-12">
            {[
              { value: '3+', label: 'Projects Built' },
              { value: '5+', label: 'Technologies' },
              { value: '∞', label: 'Curiosity' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-display text-cream"
                  style={{ fontSize: '2rem', fontWeight: 300, lineHeight: 1 }}
                >
                  {stat.value}
                </div>
                <div className="text-label mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
