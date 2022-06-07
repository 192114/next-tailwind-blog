import Link from '@/components/Link'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D, Center, Float, OrbitControls } from '@react-three/drei'
import { useRef, Suspense } from 'react'

const NotFound = () => {
  return (
    <div className="text-gray-900 dark:text-gray-100 h-96">
      <Suspense fallback={null}>
        <Canvas
          camera={{
            position: [0, 0, 40],
            fov: 15,
          }}
        >
          <Center>
            <Float speed={3} floatIntensity={5}>
              <Text3D font="/static/fonts/Blaka_Regular.json" size={3}>
                404
                <meshBasicMaterial />
              </Text3D>
            </Float>
          </Center>
          <OrbitControls />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default NotFound
