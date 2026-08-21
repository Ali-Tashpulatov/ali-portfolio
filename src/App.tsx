import { useState, useEffect } from 'react'
import { useLenis } from './hooks/useLenis'
import Cursor from './components/Cursor'
import Navigation from './components/Navigation'
import Intro from './components/Intro'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import Skills from './components/Skills'
import Journey from './components/Journey'
import Contact from './components/Contact'

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  useLenis()

  useEffect(() => {
    if (introComplete) {
      // Re-initialize ScrollTrigger after intro
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
    }
  }, [introComplete])

  return (
    <div className="grain">
      {/* Custom cursor */}
      <Cursor />

      {/* Cinematic intro */}
      <Intro onComplete={() => setIntroComplete(true)} />

      {/* Main content */}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <Navigation />

        <main>
          <Hero />

          {/* Horizontal rule between sections */}
          <div className="h-line mx-8 md:mx-16 lg:mx-24" />

          <Work />
          <About />
          <Skills />
          <Journey />
          <Contact />
        </main>
      </div>
    </div>
  )
}

export default App
