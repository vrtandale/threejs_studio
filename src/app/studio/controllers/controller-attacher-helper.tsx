import { useStudioStore } from "../store/studio-store"

export const Button = ({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    style={{
      padding: "8px 12px",
      borderRadius: "6px",
      border: "1px solid #333",
      background: active ? "#2563eb" : "#111",
      color: "#fff",
      cursor: "pointer",
      fontWeight: active ? 600 : 400,
      minWidth: 80,
    }}
  >
    {label}
  </button>
)

const ControllerAttacher = () => {
  const { controllerMovement, setControllerMovement, setSingleGeometryRaycast, singleGeometryRaycast } = useStudioStore()

  return (
    <>
      <div className="utility-section">
        <div className="utility-title">
          🛠 Modal Controller
        </div>
        <div style={{ display: 'grid', gap: 4 }}>
          <Button
            label="Move"
            active={controllerMovement === "translate"}
            onClick={() => setControllerMovement("translate")}
          />
          <Button
            label="Rotate"
            active={controllerMovement === "rotate"}
            onClick={() => setControllerMovement("rotate")}
          />
          <Button
            label="Scale"
            active={controllerMovement === "scale"}
            onClick={() => setControllerMovement("scale")}
          />
          <Button
            label="None"
            active={controllerMovement === null}
            onClick={() => setControllerMovement(null)}
          />
        </div>
      </div>

      <div className="utility-section">
        <div className="utility-title">
          🛠 Modal Selector
        </div>
        <div>

          <Button
            label={`Single Geometry Selection ${singleGeometryRaycast}`}
            active={singleGeometryRaycast}
            onClick={() => setSingleGeometryRaycast(!singleGeometryRaycast)}
          />
        </div>
      </div>

    </>
  )
}

export default ControllerAttacher
