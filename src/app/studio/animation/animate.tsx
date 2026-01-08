import React from "react"
import { useStudioStore } from "../store/studio-store"
import { useCanvasContext } from "@/threejs/canvas-utils/canvas-provider"
import { Button } from "../controllers/controller-attacher-helper"

const Animate = () => {
    const { animationFrames } = useStudioStore()
    const {scene}=useCanvasContext()

    function runAnimation() {
        Object.entries(animationFrames).forEach(([key, frames]) => {
            const object = scene.getObjectByProperty('uuid', key)
            if (!object) return
            frames.forEach((matrix, index) => {
                setTimeout(() => {
                    object.matrix.copy(matrix)
                    object.matrix.decompose(object.position, object.quaternion, object.scale)
                }, index * 20) // 100ms per frame
            })        
        })
    }

    return (
        <><Button active onClick={runAnimation} label="runanimate"/></>
    )
}

export default Animate