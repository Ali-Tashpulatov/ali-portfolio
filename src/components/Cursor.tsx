import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isOnProject, setIsOnProject] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile('ontouchstart' in window || window.innerWidth < 768)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out',
      })
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      gsap.set(ring, { x: ringX, y: ringY })
      requestAnimationFrame(animate)
    }

    const rafId = requestAnimationFrame(animate)

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="project"]')) {
        setIsOnProject(true)
        setIsHovering(false)
      } else if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor="hover"]')
      ) {
        setIsHovering(true)
        setIsOnProject(false)
      } else {
        setIsHovering(false)
        setIsOnProject(false)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          opacity: isOnProject ? 0 : 1,
          width: isHovering ? '10px' : '6px',
          height: isHovering ? '10px' : '6px',
          background: isHovering ? 'var(--violet)' : 'var(--cream)',
        }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'hovering' : ''} ${isOnProject ? 'on-project' : ''}`}
      />
    </>
  )
}
