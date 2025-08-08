// src/components/three/ParticleField.tsx

'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField() {
  const meshRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Generate particles
  const particles = useMemo(() => {
    const count = 5000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const scales = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Position
      positions[i3] = (Math.random() - 0.5) * 50
      positions[i3 + 1] = (Math.random() - 0.5) * 50
      positions[i3 + 2] = (Math.random() - 0.5) * 50

      // Color (gradient from blue to purple)
      const t = Math.random()
      colors[i3] = 0.0 + t * 0.7     // R
      colors[i3 + 1] = 0.8 - t * 0.3 // G
      colors[i3 + 2] = 1.0           // B

      // Scale
      scales[i] = Math.random() * 0.5 + 0.5
    }

    return { positions, colors, scales }
  }, [])

  // Animation
  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.getElapsedTime()
    
    // Rotate entire particle system
    meshRef.current.rotation.x = time * 0.05
    meshRef.current.rotation.y = time * 0.075

    // Mouse influence
    const mouse = state.mouse
    mouseRef.current.x += (mouse.x - mouseRef.current.x) * 0.05
    mouseRef.current.y += (mouse.y - mouseRef.current.y) * 0.05

    meshRef.current.rotation.x += mouseRef.current.y * 0.1
    meshRef.current.rotation.y += mouseRef.current.x * 0.1

    // Update shader uniforms
    const material = meshRef.current.material as THREE.ShaderMaterial
    if (material.uniforms) {
      material.uniforms.uTime.value = time
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)
    }
  })

  // Custom shader material
  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        },
        vertexShader: `
          uniform float uTime;
          uniform vec2 uMouse;
          attribute float scale;
          attribute vec3 color;
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            vColor = color;
            
            vec3 pos = position;
            
            // Wave animation
            pos.x += sin(uTime * 0.5 + position.y * 0.1) * 0.5;
            pos.y += cos(uTime * 0.3 + position.x * 0.1) * 0.5;
            pos.z += sin(uTime * 0.7 + position.x * 0.1) * 0.5;
            
            // Mouse influence
            vec2 mouseInfluence = uMouse * 2.0;
            pos.xy += mouseInfluence * 0.5;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // Size attenuation
            gl_PointSize = scale * (300.0 / -mvPosition.z);
            
            // Fade based on depth
            vAlpha = 1.0 - smoothstep(10.0, 50.0, -mvPosition.z);
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            // Circular particle shape
            vec2 center = gl_PointCoord - 0.5;
            float dist = length(center);
            
            if (dist > 0.5) discard;
            
            // Soft edges
            float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
            alpha *= vAlpha;
            
            // Glow effect
            vec3 color = vColor * (1.0 + (1.0 - dist) * 0.5);
            
            gl_FragColor = vec4(color, alpha * 0.8);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  )

  return (
    <points ref={meshRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[particles.scales, 1]}
          count={particles.scales.length}
          array={particles.scales}
          itemSize={1}
        />
      </bufferGeometry>
    </points>
  )
}