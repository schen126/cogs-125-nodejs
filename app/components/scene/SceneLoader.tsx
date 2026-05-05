'use client'

import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('./Scene'), { ssr: false })

export default function SceneLoader() {
  return (
    <div style={{ width: '100%', height: '90vh' }}>
      <Scene />
    </div>
  )
}
