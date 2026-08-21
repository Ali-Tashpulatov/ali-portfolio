import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// The actual robot model and animation logic
function RobotModel({ isMobile }: { isMobile: boolean }) {
  const headRef = useRef<THREE.Group>(null)
  
  // Mouse position target for lerping
  const targetRotation = useRef(new THREE.Euler(0, 0, 0))
  
  // Track mouse globally
  const globalMouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (isMobile) return
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 .. 1
      globalMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      globalMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  useFrame((state) => {
    if (!headRef.current) return
    
    // On desktop, look at the mouse
    if (!isMobile) {
      const maxRotX = Math.PI / 6 // up/down limit
      const maxRotY = Math.PI / 4 // left/right limit
      
      targetRotation.current.x = -globalMouse.current.y * maxRotX
      targetRotation.current.y = globalMouse.current.x * maxRotY
    } else {
      // Idle animation for mobile
      targetRotation.current.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      targetRotation.current.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.1
    }

    // Smoothly interpolate current rotation to target rotation
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotation.current.x, 0.05)
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotation.current.y, 0.05)
  })

  // Dark premium materials
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    roughness: 0.2,
    metalness: 0.8,
  })
  
  const accentMaterial = new THREE.MeshStandardMaterial({
    color: '#333333',
    roughness: 0.4,
    metalness: 0.5,
  })

  const eyeMaterial = new THREE.MeshBasicMaterial({
    color: '#f0ede8', // Cream color from theme
  })

  return (
    <group>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[0, -0.5, 0]}>
          {/* Main Body */}
          <mesh material={bodyMaterial} position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.6, 0.4, 1.2, 32]} />
          </mesh>
          
          {/* Body details */}
          <mesh material={accentMaterial} position={[0, 0.8, 0.61]}>
            <boxGeometry args={[0.4, 0.1, 0.1]} />
          </mesh>
          <mesh material={accentMaterial} position={[0, 0.2, 0.51]}>
            <boxGeometry args={[0.3, 0.05, 0.1]} />
          </mesh>

          {/* Floating Head Group (rotates based on mouse) */}
          <group ref={headRef} position={[0, 1.4, 0]}>
            {/* Neck connection (visual only) */}
            <mesh material={accentMaterial} position={[0, -0.2, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.4, 16]} />
            </mesh>
            
            {/* Head Dome */}
            <mesh material={bodyMaterial}>
              <boxGeometry args={[0.9, 0.7, 0.9]} />
            </mesh>
            
            {/* Visor / Eyes */}
            <mesh material={new THREE.MeshStandardMaterial({ color: '#050505', roughness: 0.1, metalness: 0.9 })} position={[0, 0.05, 0.46]}>
              <boxGeometry args={[0.7, 0.25, 0.05]} />
            </mesh>
            
            {/* Glowing Eye Light */}
            <mesh material={eyeMaterial} position={[0, 0.05, 0.48]}>
              <boxGeometry args={[0.5, 0.05, 0.02]} />
            </mesh>
            
            {/* Head details */}
            <mesh material={accentMaterial} position={[-0.46, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.15, 0.15, 0.1]} />
            </mesh>
            <mesh material={accentMaterial} position={[0.46, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.15, 0.15, 0.1]} />
            </mesh>
          </group>
        </group>
      </Float>
      
      {/* Subtle shadow underneath */}
      <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={5} blur={2} far={4} color="#000000" />
    </group>
  )
}

export default function Robot() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Environment mapping for premium reflections on the metal */}
        <Environment preset="city" />
        
        <RobotModel isMobile={isMobile} />
      </Canvas>
    </div>
  )
}
