import React from "react"
import { Play, Circle, Square } from "lucide-react"
import { useStudioStore } from "../store/studio-store"
import { useCanvasContext } from "@/threejs/canvas-utils/canvas-provider"
import * as THREE from 'three'
import { Button } from "@/components/ui/button"

type AnimationState = {
    object: THREE.Object3D
    frames: THREE.Matrix4[]
    frameIndex: number
    t: number
}

const activeAnimations: AnimationState[] = []


const Animate = () => {
    const {
        animationFrames,
        recordingFrames,
        setRecordingFrames
    } = useStudioStore()

    const { scene} = useCanvasContext()
    //to run the animation 
    //create a function that works with requestAnimationFrame
    //what will happen it will take all the animation objects from the store
    //start to loop for each key until the frames are finished


    async function runAnimation3(key: string, frames: THREE.Matrix4[], frameNumber: number = 0) {
        return requestAnimationFrame(() => {
            const object = scene.getObjectByProperty("uuid", key)
            if (!object || frames.length === 0) return null
            const matrix = frames[frameNumber]
            object.matrix.copy(matrix)
            object.matrix.decompose(
                object.position,
                object.quaternion,
                object.scale
            )
            object.updateMatrix()

            if(frameNumber < frames.length - 1) {
               return runAnimation3(key, frames, frameNumber + 1)
            }
        })
    }

    function initAnimate() {
        Object.keys(animationFrames).map(async (key) => {
            await runAnimation3(key, animationFrames[key])
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
            <Button className="bg-white" onClick={initAnimate}>
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
