import Link from '@/components/Link'
import { Canvas } from '@react-three/fiber'
import { Text3D } from '@react-three/drei'

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

    <div className="h-screen">
      <Canvas
        shadows={true}
        className=""
        camera={{
          position: [-6, 7, 7],
        }}
      >
        <Text3D font="/static/fonts/bold.blob">hello world!</Text3D>
      </Canvas>
    </div>
  )
}

export default NotFound