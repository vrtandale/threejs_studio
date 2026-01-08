import React from "react"
import { Play, Circle, Square } from "lucide-react"
import { useStudioStore } from "../store/studio-store"
import { useCanvasContext } from "@/threejs/canvas-utils/canvas-provider"
import * as THREE from 'three'
import { Button } from "@/components/ui/button"
const Animate = () => {
    const {
        animationFrames,
        recordingFrames,
        setRecordingFrames
    } = useStudioStore()

    const { scene } = useCanvasContext()

    function runAnimation() {
        Object.entries(animationFrames).forEach(([key, frames]) => {
            const object = scene.getObjectByProperty("uuid", key)
            if (!object) return

            frames.forEach((matrix, index) => {
                setTimeout(() => {
                    object.matrix.copy(matrix)
                    object.matrix.decompose(
                        object.position,
                        object.quaternion,
                        object.scale
                    )
                }, index * 20)
            })
        })
    }

    function runAnimation2() {
        Object.entries(animationFrames).forEach(([key, frames]) => {
            const object = scene.getObjectByProperty("uuid", key)
            if (!object || frames.length === 0) return

            frames.forEach((matrix, index) => {
                const nextMatrix = frames[index + 1]
                if (!nextMatrix) return

                setTimeout(() => {
                    // Decompose current frame
                    const posA = new THREE.Vector3()
                    const quatA = new THREE.Quaternion()
                    const scaleA = new THREE.Vector3()

                    matrix.decompose(posA, quatA, scaleA)

                    // Decompose next frame
                    const posB = new THREE.Vector3()
                    const quatB = new THREE.Quaternion()
                    const scaleB = new THREE.Vector3()

                    nextMatrix.decompose(posB, quatB, scaleB)

                    // LERP factor (0 → 1)
                    const t = 0.1

                    // Interpolate
                    object.position.lerpVectors(posA, posB, t)
                    object.quaternion.slerpQuaternions(quatA, quatB, t)
                    object.scale.lerpVectors(scaleA, scaleB, t)

                    object.updateMatrix()
                }, index * 20)
            })
        })
    }


    return (
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            Animation
            {/* Start Recording */}
            <Button className="bg-white" onClick={() => setRecordingFrames(!recordingFrames)}>
                {!recordingFrames ? <Circle
                    size={20}
                    color={recordingFrames ? "#999" : "red"}
                    style={{ cursor: "pointer" }}

                /> : <Square
                    size={20}
                    color={recordingFrames ? "black" : "#999"}
                    style={{ cursor: "pointer" }}
                    onClick={() => setRecordingFrames(false)}
                />}</Button>



            {/* Play Animation */}
            <Button className="bg-white" onClick={runAnimation2}>
                <Play
                    size={22}
                    color="black"
                    style={{ cursor: "pointer" }}

                />
            </Button>
        </div>
    )
}

export default Animate
