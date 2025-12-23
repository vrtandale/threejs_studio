import { useStudioStore } from "../store/studio-store"

const Button = ({
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
  const { controllerMovement, setControllerMovement } = useStudioStore()

  return (
    <>
    <div className="utility-title">
                🛠 Modal Controller
            </div>
    <div style={{display:'grid',gap:4}}>
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
        active={controllerMovement === "none"}
        onClick={() => setControllerMovement("none")}
      />
    </div>
    </>
  )
}

export default ControllerAttacher
