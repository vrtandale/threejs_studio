import { useEffect, useRef } from "react"
import { useCanvasContext } from "../../../threejs/canvas-utils/canvas-provider"
import BoxGeometry from "../../../threejs/geometry/BoxGeometry"
import {
  Object3D,
  Vector3,
  Mesh,
  BufferGeometry,
  Box3,
  Points,
  PointsMaterial,
} from "three"
import { TransformControls } from "three/addons/controls/TransformControls.js"

const ColliderObject = () => {
  const { scene, camera, renderer } = useCanvasContext()
  const refBox = useRef<Object3D>(null)
  const box3 = useRef(new Box3())
  const pointsMeshRef = useRef<Points | null>(null)


  /* ---------------------------------------------
   Collect intersecting geometry points
  --------------------------------------------- */
  const collectIntersectingPoints = () => {
    if (!refBox.current) return

    const boxMesh = refBox.current as Mesh
    box3.current.setFromObject(boxMesh)

    const intersectedPoints: Vector3[] = []

    scene.traverse(obj => {
      if (!(obj instanceof Mesh)) return
      if (obj === boxMesh) return


      // 🚫 Skip TransformControls gizmo meshes
      if (obj.userData.isGizmo) return



      const geometry = obj.geometry as BufferGeometry
      const pos = geometry.attributes.position

      for (let i = 0; i < pos.count; i++) {
        const v = new Vector3().fromBufferAttribute(pos, i)
        v.applyMatrix4(obj.matrixWorld)

        if (box3.current.containsPoint(v)) {
          intersectedPoints.push(v.clone())
        }
      }
    })
    console.log(intersectedPoints)
    renderPoints(intersectedPoints)
  }

  /* ---------------------------------------------
   Render points
  --------------------------------------------- */
  const renderPoints = (points: Vector3[]) => {
    if (pointsMeshRef.current) {
      scene.remove(pointsMeshRef.current)
      pointsMeshRef.current.geometry.dispose()
    }

    if (points.length === 0) return

    const geometry = new BufferGeometry().setFromPoints(points)
    const material = new PointsMaterial({
      color: 0xff0000,
      size: 0.05,
    })

    const pointsMesh = new Points(geometry, material)
    pointsMeshRef.current = pointsMesh
    console.log(pointsMesh)
    scene.add(pointsMesh)
    setTimeout(() => scene.remove(pointsMesh), 5000)
  }

  /* ---------------------------------------------
   Transform Controls
  --------------------------------------------- */
  useEffect(() => {
    if (!refBox.current || !camera || !renderer) return

    const controls = new TransformControls(camera, renderer.domElement)
    controls.attach(refBox.current)
    controls.getHelper().traverse(obj => {
    obj.userData.isGizmo = true
    })
    controls.getHelper().userData.isGizmo = true
    controls.dragging = false
    scene.add(controls.getHelper())

    controls.addEventListener("objectChange", collectIntersectingPoints)
    return () => {
      controls.removeEventListener("objectChange", collectIntersectingPoints)
      controls.detach()
      scene.remove(controls.getHelper())
    }
  }, [camera, renderer, scene])

  return <BoxGeometry ref={refBox} color="orange" />
}

export default ColliderObject
