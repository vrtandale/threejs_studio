import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useCanvasContext } from "../../../threejs/canvas-utils/canvas-provider"
import { useModalStore } from "../../components/quick-helper/store/upload-modal-store"
import useTransformController from "../controllers/dyanmic-controller-translation"
import { useStudioStore } from "../store/studio-store"

export const useRayCasterController = () => {
  const { renderer, camera, scene } = useCanvasContext()
  const raycaster = useRef(new THREE.Raycaster())
  const mouse = useRef(new THREE.Vector2())
  const { object3d } = useModalStore()
  const { attach } = useTransformController()
  const {singleGeometryRaycast}=useStudioStore()
  useEffect(() => {
    if (!renderer || !camera || !scene) return

    const handleClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()

      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.current.setFromCamera(mouse.current, camera)

      const intersects = raycaster.current.intersectObjects(
        object3d ?? [],
        true
      ).filter(i => !i.object.userData.isGizmo)
      console.log('Intersects:', intersects)

      if (intersects.length > 0) {
        const mesh = singleGeometryRaycast?intersects[0].object:getSelectableRoot(intersects[0].object)
        attach(mesh)          // 🔥 auto removes previous controller
      }
    }

    renderer.domElement.addEventListener("pointerdown", handleClick)
    return () => {
      renderer.domElement.removeEventListener("pointerdown", handleClick)
    }
  }, [renderer, camera, scene, object3d, attach,singleGeometryRaycast])
}


function getSelectableRoot(object: THREE.Object3D): THREE.Object3D {
  let current: THREE.Object3D | null = object

  while (current?.parent) {
    // stop when parent is Scene or marked as selectable root
    if (
      current.parent.userData.isRootModel
    ) {
      return current
    }
    current = current.parent
  }

  return object
}
