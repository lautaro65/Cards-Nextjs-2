"use client"

import React from 'react'
import InnovativeCard from './components/InnovativeCard/innovativeCard'
import ParticleBackground from './components/ParticleBackground/page'
export default function Home() {
  return (
    <main className="min-h-screen w-full bg-black flex items-start justify-center p-6">
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <InnovativeCard
          title="Fiesta Innovadora"
          description="Explora un nuevo concepto en diseño "
        />
      </div>
    </main>
  )
}

