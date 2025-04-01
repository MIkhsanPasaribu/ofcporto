/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere() {
  const mesh = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    }
  })

  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#8352FD"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
      />
    </Sphere>
  )
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={1} />
        <AnimatedSphere />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}