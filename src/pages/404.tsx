import Link from '@/components/Link'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { useEffect, useRef } from 'react'

const NotFound = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const target = new THREE.Vector3(0, 0, 0)
    const container = containerRef.current as HTMLDivElement
    const containerWidth = container.offsetWidth
    const containerHeight = container.offsetHeight

    // 创建场景
    const scene = new THREE.Scene()
    // 绘制辅助线
    const axisHelper = new THREE.AxesHelper(250)
    scene.add(axisHelper)

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff) // 环境光会均匀的照亮场景中的所有物体。
    scene.add(ambientLight)

    // 渲染器
    const renderer = new THREE.WebGLRenderer({
      alpha: true, // 背景透明
      antialias: true, // 抗锯齿
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    // 设置尺寸
    renderer.setSize(containerWidth, containerHeight)
    container.appendChild(renderer.domElement)

    new FontLoader().load('/static/fonts/helvetiker_regular.json', (textFont) => {
      // 创建模型
      const textGeometry = new TextGeometry('4 0 4', {
        font: textFont,
        size: 0.5,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.05,
        bevelSegments: 3,
      })
      const material = new THREE.MeshNormalMaterial()

      // textGeometry.computeBoundingBox() // 计算 box 边界
      // if (textGeometry.boundingBox) {
      //   textGeometry.translate(
      //     -textGeometry.boundingBox.max.x * 0.5, // Subtract bevel size
      //     -textGeometry.boundingBox.max.y * 0.5, // Subtract bevel size
      //     -textGeometry.boundingBox.max.z * 0.5 // Subtract bevel thickness
      //   )
      // }

      textGeometry.center()

      const cube = new THREE.Mesh(textGeometry, material)
      scene.add(cube)

      renderer.render(scene, camera)
    })

    // 创建透视相机 （视角为15度）
    const camera = new THREE.PerspectiveCamera(15, containerWidth / containerHeight, 1, 10000)
    camera.position.set(0, 0, 10)
    camera.lookAt(target)

    // 鼠标操作
    const controls = new OrbitControls(camera, renderer.domElement)

    const render = () => {
      renderer.render(scene, camera)
    }

    // 必须注册该方法 否则无效
    controls.addEventListener('change', render)

    return () => {
      container.removeChild(renderer.domElement)
      renderer.dispose()
      controls.dispose()
    }
  }, [])

  return <div ref={containerRef} className="text-gray-900 dark:text-gray-100 h-96"></div>
}

export default NotFound
