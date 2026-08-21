import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useMagnet(strength = 30) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = (e.clientX - centerX) * (strength / 100)
      const distY = (e.clientY - centerY) * (strength / 100)

      gsap.to(el, {
        x: distX,
        y: distY,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      })
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return ref
}
