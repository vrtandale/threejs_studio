import { Button } from "../controllers/controller-attacher-helper"
import { useStudioStore } from "../store/studio-store"

const CameraUtil = () => {
  const { cameraMode, setCameraMode } = useStudioStore()
  return (
    <div className="utility-section">
      <div className="utility-title">
        🛠 Camera Selector
      </div>
      <div>

        <div style={{ "display": "flex", "gap": 4 }}>
          <Button
            label={`Orbit Controls `}
            active={cameraMode === "orbit"}
            onClick={() => setCameraMode("orbit")}
          />
          <Button
            label={`First Person Controls `}
            active={cameraMode === "first-person"}
            onClick={() => setCameraMode("first-person")}
          />
        </div>
      </div>
    </div>
  )
}

export default CameraUtil