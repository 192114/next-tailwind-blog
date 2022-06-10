import Link from '@/components/Link'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
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

    // 创建模型
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshNormalMaterial()

    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // 创建透视相机 （视角为15度）
    const camera = new THREE.PerspectiveCamera(15, containerWidth / containerHeight, 1, 10000)
    camera.position.set(0, 0, 10)
    camera.lookAt(target)
    renderer.render(scene, camera)

    // 鼠标操作
    const controls = new OrbitControls(camera, renderer.domElement)

    controls.enableDamping = true // 动画循环是否有阻尼
    // controls.autoRotate = true
    // controls.dampingFactor = 0.05
    // controls.screenSpacePanning = false
    // controls.minDistance = 100
    // controls.maxDistance = 500
    // controls.maxPolarAngle = Math.PI / 2
    // controls.target = target
    // controls.update()

    const render = () => {
      // controls.update()
      renderer.render(scene, camera)
    }

    const resizeWindow = () => {
      const containerWidth = container.offsetWidth
      const containerHeight = container.offsetHeight
      renderer.setSize(containerWidth, containerHeight)
      render()
    }

    // 必须注册该方法 否则无效
    controls.addEventListener('change', render)

    window.addEventListener('resize', resizeWindow, false)

    return () => {
      container.removeChild(renderer.domElement)
      renderer.dispose()
      controls.dispose()
      window.removeEventListener('resize', resizeWindow, false)
    }
  }, [])

  return <div ref={containerRef} className="text-gray-900 dark:text-gray-100 h-96"></div>
}

export default NotFound
