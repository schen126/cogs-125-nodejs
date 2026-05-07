'use client'

import { Suspense, useState, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Center } from '@react-three/drei'
import { Model } from './DeskAndLaptopModel'
import {playwrite} from '../../fonts'
import * as THREE from 'three'
import gsap from 'gsap'

const INITIAL_CAM = { x: -2, y: 0.8, z: 3 }
const INITIAL_TARGET = { x: 0, y: 0, z: 0 }

function ScreenOverlayTracker({
  meshRef,
  overlayRef,
}: {
  meshRef: React.RefObject<THREE.Mesh>
  overlayRef: React.RefObject<HTMLDivElement>
}) {
  const { camera, size } = useThree()
  const _box = useRef(new THREE.Box3())
  const _v = useRef(new THREE.Vector3())

  useFrame(() => {
    if (!meshRef.current || !overlayRef.current) return

    _box.current.setFromObject(meshRef.current)
    const { min, max } = _box.current
    const v = _v.current

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
    for (let i = 0; i < 8; i++) {
      v.set(
        i & 1 ? max.x : min.x,
        i & 2 ? max.y : min.y,
        i & 4 ? max.z : min.z,
      ).project(camera)
      const sx = (v.x * 0.5 + 0.5) * size.width
      const sy = (-v.y * 0.5 + 0.5) * size.height
      if (sx < minX) minX = sx
      if (sx > maxX) maxX = sx
      if (sy < minY) minY = sy
      if (sy > maxY) maxY = sy
    }

    const el = overlayRef.current
    el.style.left = `${minX}px`
    el.style.top = `${minY}px`
    el.style.width = `${maxX - minX}px`
    el.style.height = `${maxY - minY}px`
  })

  return null
}

interface CameraRigProps {
  zoomed: boolean
  setZoomed: (v: boolean) => void
  setShowOverlay: (v: boolean) => void
  goBackRef: React.MutableRefObject<() => void>
  screenSurfaceRef: React.RefObject<THREE.Mesh>
}

function CameraRig({ zoomed, setZoomed, setShowOverlay, goBackRef, screenSurfaceRef }: CameraRigProps) {
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
      onComplete: () => setShowOverlay(true),
    })
    gsap.to(cam, {
      fov: 8,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => cam.updateProjectionMatrix(),
    })
  }

  goBackRef.current = () => {
    setShowOverlay(false)
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
        <Model onScreenClick={!zoomed ? handleScreenClick : undefined} screenSurfaceRef={screenSurfaceRef} />
      </Center>
      <OrbitControls ref={controlsRef} enabled={!zoomed} />
    </>
  )
}

export default function Scene() {
  const [zoomed, setZoomed] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const goBackRef = useRef<() => void>(() => {})
  const screenSurfaceRef = useRef<THREE.Mesh>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

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
          <CameraRig zoomed={zoomed} setZoomed={setZoomed} setShowOverlay={setShowOverlay} goBackRef={goBackRef} screenSurfaceRef={screenSurfaceRef} />
          <ScreenOverlayTracker meshRef={screenSurfaceRef} overlayRef={overlayRef} />
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
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          background: 'rgb(255, 255, 255)',
          color: 'black',
          borderRadius: '4px',
          padding: '2rem',
          opacity: showOverlay ? 1 : 0,
          animation: showOverlay ? 'flicker-in 0.8s ease forwards' : 'none',
          pointerEvents: showOverlay ? 'auto' : 'none',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <h1 style={{ 
          fontSize: '2.5rem',
          fontWeight: 'bold',
          fontFamily: playwrite.style.fontFamily,
          animation: showOverlay 
            ? 'fade-in-text 0.5s ease 0.9s forwards': 'none', 
          opacity: 0,
        }}>
          Hi, I'm Serena
        </h1>
        <a
          href="this_is_a_virus.pdf"
          /*target="_blank"
          rel="noopener noreferrer"*/
          download="this_is_a_virus.pdf"
          style={{
            display: 'inline-block',
            marginTop: '1rem',
            padding: '0.6rem 1.5rem',
            background: 'black',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '1rem',
            animation: showOverlay ? 'fade-in-text 0.5s ease 1.2s forwards' : 'none',
            opacity: 0,
          }}
        >
          View my resume here
        </a>
      </div>
    </div>
  )
}
