import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 3.5 }
    )
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-8 md:px-12 py-7"
        style={{
          background: scrolled
            ? 'linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, transparent 100%)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'background 0.5s ease',
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#"
          className="font-display text-cream text-2xl font-light tracking-widest"
          style={{ letterSpacing: '0.15em' }}
          data-cursor="hover"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          A.
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              data-cursor="hover"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ cursor: 'pointer', background: 'none', border: 'none' }}
        >
          <span
            className="block w-6 h-px bg-cream transition-all duration-300"
            style={{
              transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none',
            }}
          />
          <span
            className="block w-4 h-px bg-cream transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-px bg-cream transition-all duration-300"
            style={{
              transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-[499] md:hidden flex flex-col items-center justify-center gap-10"
        style={{
          background: 'rgba(10,10,10,0.97)',
          backdropFilter: 'blur(20px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        {navItems.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            className="font-display text-cream text-5xl font-light"
            onClick={(e) => handleNavClick(e, item.href)}
            style={{
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `transform 0.4s ease ${i * 0.08}s, opacity 0.4s ease ${i * 0.08}s`,
              opacity: menuOpen ? 1 : 0,
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  )
}
