import Link from '@/components/Link'
import { Vector3 } from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D, Center, Float, OrbitControls } from '@react-three/drei'
import { useRef, Suspense } from 'react'

const orbitControlsProps = {
  // 上下旋转角度
  minPolarAngle: Math.PI * (60 / 360),
  maxPolarAngle: Math.PI * (300 / 360),
  // 左右旋转角度
  minAzimuthAngle: - Math.PI * (60 / 360),
  maxAzimuthAngle: Math.PI * (60 / 360),

  enablePan: false, // 禁止鼠标右键拖拽
  enableZoom: false, // 禁止缩放大小
}

const NotFound = () => {
  return (
    <div className="text-gray-900 dark:text-gray-100 h-96">
      <Canvas
        shadows
        camera={{
          position: new Vector3(0, 0, 40),
          fov: 15,
          // lookAt: () => new Vector3(0, 0, 0),
        }}
      >
        <Suspense fallback={null}>
          <Center>
            <Float speed={3} floatIntensity={5}>
              <Text3D font="/static/fonts/helvetiker_regular.json" size={2} height={1} bevelEnabled bevelSize={0.05}>
                404
                <meshNormalMaterial />
              </Text3D>
            </Float>

            <ambientLight intensity={0.8} />
            <pointLight intensity={1} position={[0, 6, 0]} />

            <OrbitControls {...orbitControlsProps} />
          </Center>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default NotFound
