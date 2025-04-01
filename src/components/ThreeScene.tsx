/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'

// Code Block component - represents a block of code
function CodeBlock({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = '#3a86ff' }) {
  const group = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005
    }
  })
  
  // Create a code-like texture with lines
  const codeTexture = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const context = canvas.getContext('2d')
    
    if (context) {
      // Background
      context.fillStyle = '#1e1e3f'
      context.fillRect(0, 0, canvas.width, canvas.height)
      
      // Code lines
      context.fillStyle = '#a9b1d6'
      for (let i = 0; i < 20; i++) {
        const y = 30 + i * 25
        const width = Math.random() * 300 + 50
        context.fillRect(20, y, width, 3)
      }
      
      // Syntax highlighting
      context.fillStyle = '#ff9d00'
      context.fillRect(20, 55, 80, 3)
      context.fillRect(20, 130, 60, 3)
      
      context.fillStyle = '#ff628c'
      context.fillRect(120, 80, 40, 3)
      context.fillRect(180, 180, 70, 3)
      
      context.fillStyle = '#5ccc96'
      context.fillRect(70, 105, 90, 3)
      context.fillRect(40, 205, 120, 3)
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    return texture
  }
  
  return (
    <group ref={group} position={position as [number, number, number]} rotation={rotation as [number, number, number]}>
      {/* Code block */}
      <mesh position={[0, 0, 0]} scale={scale}>
        <boxGeometry args={[2, 3, 0.2]} />
        <meshStandardMaterial map={codeTexture()} />
      </mesh>
      
      {/* Frame */}
      <mesh position={[0, 0, -0.11]} scale={scale}>
        <boxGeometry args={[2.2, 3.2, 0.1]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Laptop component
function Laptop({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const group = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005
      // Add a slight bobbing motion
      group.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.1
    }
  })
  
  return (
    <group ref={group} position={position as [number, number, number]} rotation={rotation as [number, number, number]}>
      {/* Screen */}
      <mesh position={[0, 0.5, 0]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial attach="material" color="#333" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Screen content */}
      <mesh position={[0, 0.5, 0.06]} rotation={[0.1, 0, 0]}>
        <planeGeometry args={[2.8, 1.8]} />
        <meshBasicMaterial color="#1e1e3f" />
      </mesh>
      
      {/* Keyboard base */}
      <mesh position={[0, -0.6, 0.6]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshStandardMaterial color="#444" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Atom model - representing molecular structure like React's atom logo
function AtomModel({ position = [0, 0, 0], rotation = [0, 0, 0], color = '#61dafb' }) {
  const group = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.01
      group.current.rotation.z += 0.005
    }
  })
  
  return (
    <group ref={group} position={position as [number, number, number]} rotation={rotation as [number, number, number]}>
      {/* Center sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.2} />
      </mesh>
      
      {/* Orbits */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 3 * i, Math.PI / 6 * i, 0]}>
          <torusGeometry args={[1.5, 0.05, 16, 100]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
        </mesh>
      ))}
      
      {/* Electrons */}
      {[0, 1, 2].map((i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos(i * Math.PI * 2/3) * 1.5,
            Math.sin(i * Math.PI * 2/3) * 1.5,
            0
          ]}
          rotation={[Math.PI / 3 * i, Math.PI / 6 * i, 0]}
        >
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="#fff" emissive={color} emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

// Main scene component
export default function ThreeScene() {
  const [currentScene, setCurrentScene] = useState(0)
  
  // Define different scenes to cycle through
  const scenes = [
    { 
      name: 'Code Editor',
      component: (
        <group>
          <CodeBlock position={[-2, 0, 0]} color="#ff628c" />
          <CodeBlock position={[2, 0.5, -1]} rotation={[0, -0.5, 0]} color="#5ccc96" />
          <CodeBlock position={[0, -1.5, -2]} rotation={[0.2, 0.3, 0]} color="#3a86ff" scale={0.8} />
        </group>
      )
    },
    {
      name: 'Developer Workspace',
      component: (
        <group>
          <Laptop position={[0, 0, 0]} />
          <mesh position={[2, -1, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.8, 32]} />
            <meshStandardMaterial color="#222" />
          </mesh>
          <mesh position={[2, -0.5, 0]}>
            <cylinderGeometry args={[0.3, 0.4, 0.2, 32]} />
            <meshStandardMaterial color="#964B00" />
          </mesh>
        </group>
      )
    },
    {
      name: 'React Atom',
      component: (
        <group>
          <AtomModel position={[0, 0, 0]} color="#61dafb" />
          {/* Replace Text component with a custom React logo */}
          <group position={[0, -2, 0]}>
            <mesh>
              <boxGeometry args={[1.2, 0.3, 0.1]} />
              <meshStandardMaterial color="#61dafb" />
            </mesh>
            <mesh position={[0, 0, 0.06]}>
              <boxGeometry args={[0.3, 1.2, 0.1]} />
              <meshStandardMaterial color="#61dafb" />
            </mesh>
          </group>
        </group>
      )
    }
  ]

  // Change scene every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % scenes.length)
    }, 10000)
    
    return () => clearInterval(interval)
  }, [scenes.length])

  const activeScene = scenes[currentScene]

  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#ff0000" />
        
        {activeScene.component}
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      <div className="absolute bottom-2 right-2 text-xs text-gray-400 opacity-50">
        {activeScene.name}
      </div>
    </div>
  )
}