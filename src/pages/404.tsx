import Link from '@/components/Link'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D } from '@react-three/drei'
import { useRef } from 'react'

const NotFound = () => {


  return (
    // <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
    //   <div className="space-x-2 pt-6 pb-8 md:space-y-5">
    //     <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
    //       404
    //     </h1>
    //   </div>
    //   <div className="max-w-md">
    //     <Link href="/">
    //       <button className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-primary-700 focus:outline-none dark:hover:bg-primary-500">
    //         博客首页
    //       </button>
    //     </Link>
    //   </div>
    // </div>

    <div className="h-screen text-gray-900 dark:text-gray-100">
      <Canvas
        shadows={true}
        className=""
        camera={{
          position: [0, 3, 100],
          fov: 15
        }}
      >
        <Text3D font="/static/fonts/Blaka_Regular.json" size={3}>
          404
        </Text3D>
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.3} />
        <directionalLight position={[-20, 0, -10]} intensity={0.7} />
      </Canvas>
    </div>
  )
}

export default NotFound
