'use client'

import { Suspense, useState, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Center } from '@react-three/drei'
import { Model } from './DeskAndLaptopModel'
import * as THREE from 'three'
import gsap from 'gsap'

const INITIAL_CAM = { x: -2, y: 0.8, z: 3 }
const INITIAL_TARGET = { x: 0, y: 0, z: 0 }

interface CameraRigProps {
  zoomed: boolean
  setZoomed: (v: boolean) => void
  goBackRef: React.MutableRefObject<() => void>
}

function CameraRig({ zoomed, setZoomed, goBackRef }: CameraRigProps) {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)

  const handleScreenClick = (screenWorldPos: THREE.Vector3) => {
    setZoomed(true)
    const controls = controlsRef.current
    const cam = camera as THREE.PerspectiveCamera
    gsap.to(camera.position, {
      x: screenWorldPos.x,
      y: screenWorldPos.y + 0.5,
      z: screenWorldPos.z + 2,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => controls?.update(),
    })
    gsap.to(controls.target, {
      x: screenWorldPos.x,
      y: screenWorldPos.y + 0.1,
      z: screenWorldPos.z,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => controls?.update(),
    })
    gsap.to(cam, {
      fov: 8,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => cam.updateProjectionMatrix(),
    })
  }

  goBackRef.current = () => {
    const controls = controlsRef.current
    const cam = camera as THREE.PerspectiveCamera
    gsap.to(camera.position, {
      ...INITIAL_CAM,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => controls?.update(),
    })
    gsap.to(controls.target, {
      ...INITIAL_TARGET,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => controls?.update(),
      onComplete: () => setZoomed(false),
    })
    gsap.to(cam, {
      fov: 20,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => cam.updateProjectionMatrix(),
    })
  }

  return (
    <>
      <Center>
        <Model onScreenClick={!zoomed ? handleScreenClick : undefined} />
      </Center>
      <OrbitControls ref={controlsRef} enabled={!zoomed} />
    </>
  )
}

export default function Scene() {
  const [zoomed, setZoomed] = useState(false)
  const goBackRef = useRef<() => void>(() => {})

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [INITIAL_CAM.x, INITIAL_CAM.y, INITIAL_CAM.z], fov: 20 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <Environment preset="city" />
          <CameraRig zoomed={zoomed} setZoomed={setZoomed} goBackRef={goBackRef} />
        </Suspense>
      </Canvas>
      {zoomed && (
        <button
          onClick={() => goBackRef.current()}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '0.75rem 2rem',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            backdropFilter: 'blur(4px)',
          }}
        >
          ← Go Back
        </button>
      )}
    </div>
  )
}
