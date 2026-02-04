import { useStudioStore } from "@/app/studio/store/studio-store"
import { useCanvasContext } from "@/threejs/canvas-utils/canvas-provider"
import BoxGeometry from "@/threejs/geometry/BoxGeometry"
import * as THREE from "three"
import React from "react"
import { TransformControls } from "three/addons/controls/TransformControls.js"

const ColliderObject = () => {
  const { scene, camera, renderer } = useCanvasContext()
  const { selectedMesh } = useStudioStore()
  const raysCaster = React.useMemo(() => new THREE.Raycaster(), [])
  React.useEffect(() => {
    setInterval(() => {
      createColliderBox()
    }, 100)
  }, [selectedMesh])

  const colorIntersectingFaces = (intersect: THREE.Intersection) => {
    const mesh = intersect.object as THREE.Mesh
    
    if (!mesh.geometry) return
    
    // Create a color attribute if it doesn't exist
    if (!mesh.geometry.getAttribute('color')) {
      const colors = new Float32Array(mesh.geometry.attributes.position.count * 3)
      colors.fill(1) // Default white
      mesh.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    }

    // Get face index
    const faceIndex = intersect.faceIndex
    if (faceIndex === undefined) return

    const colors = mesh.geometry.getAttribute('color') as THREE.BufferAttribute
    const color = new THREE.Color('blue') // Red color for intersection
    console.log('Intersecting face index:', faceIndex)
    // Color the three vertices of the intersecting face
    const indices = mesh.geometry.getIndex()
    if (indices) {
      const a = indices.getX(faceIndex * 3)
      const b = indices.getX(faceIndex * 3 + 1)
      const c = indices.getX(faceIndex * 3 + 2)
      
      colors.setXYZ(a, color.r, color.g, color.b)
      colors.setXYZ(b, color.r, color.g, color.b)
      colors.setXYZ(c, color.r, color.g, color.b)
    } else {
      // Non-indexed geometry
      const a = faceIndex * 3
      const b = faceIndex * 3 + 1
      const c = faceIndex * 3 + 2
      
      colors.setXYZ(a, color.r, color.g, color.b)
      colors.setXYZ(b, color.r, color.g, color.b)
      colors.setXYZ(c, color.r, color.g, color.b)
    }
    
    colors.needsUpdate = true

    // Enable vertex colors in material if needed
    if (mesh.material instanceof THREE.Material) {
      mesh.material.vertexColors = true
    }
  }

  const createColliderBox = () => {
    if (!scene || !camera || !renderer) return
    if (!selectedMesh) return
    const originPoint = selectedMesh.position.clone()
    const directions = [
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, -1, 0),
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, -1),
    ]
    const rayLength = 1
    directions.forEach(direction => {
      raysCaster.set(originPoint, direction)
      const intersects = raysCaster.intersectObjects(scene.children, true)

      intersects.forEach(intersect => {
        if (intersect.distance < rayLength && intersect.object !== selectedMesh && !intersect.object.userData.isGizmo) {
          colorIntersectingFaces(intersect)
        }
      })
    })
  }
  //get object which has attached to the gizmo
  //now take the object mesh and add start to raycasting from the object 

  return null
}

export default ColliderObject
