import { useModalStore } from "@/app/components/quick-helper/store/upload-modal-store"

const lightTypes = [
  "PointLight",
  "DirectionalLight",
  "SpotLight",
  "AmbientLight",
] as const

const LightUiHelper = () => {
  const { LightHelper, setLightHelper } = useModalStore()

  const update = (key: string, value: any) => {
    setLightHelper({
      ...LightHelper,
      [key]: value,
    })
    console.log("Updated LightHelper:", {
      ...LightHelper,
      [key]: value,
    })
  }

  const showDistance = LightHelper.active === "PointLight" || LightHelper.active === "SpotLight"
  const showDecay = LightHelper.active === "PointLight" || LightHelper.active === "SpotLight"

  return (
    <div className="rounded-xl bg-zinc-900 p-4 text-zinc-200 shadow-lg space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
        Light Settings
      </h3>

      {/* Light Type */}
      <div className="space-y-1">
        <label className="text-xs text-zinc-400">Light Type</label>
        <select
          value={LightHelper.active}
          onChange={(e) => update("active", e.target.value)}
          className="w-full rounded-md bg-zinc-800 px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
        >
          {lightTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Color */}
      <div className="flex items-center justify-between gap-3">
        <label className="text-xs text-zinc-400">Color</label>
        <input
          type="color"
          value={LightHelper.color}
          onChange={(e) => {
            update("color", e.target.value)
          }}
          className="h-8 w-10 cursor-pointer rounded bg-transparent"
        />
      </div>

      {/* Intensity */}
      <div className="space-y-1">
        <label className="text-xs text-zinc-400">
          Intensity: {LightHelper.intensity.toFixed(2)}
        </label>
        <input
          type="range"
          min={0}
          max={10}
          step={0.1}
          value={LightHelper.intensity}
          onChange={(e) => update("intensity", Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Distance */}
      {showDistance && (
        <div className="space-y-1">
          <label className="text-xs text-zinc-400">
            Distance: {LightHelper.distance}
          </label>
          <input
            type="range"
            min={0}
            max={500}
            step={1}
            value={LightHelper.distance}
            onChange={(e) => update("distance", Number(e.target.value))}
            className="w-full"
          />
        </div>
      )}

      {/* Decay */}
      {showDecay && (
        <div className="space-y-1">
          <label className="text-xs text-zinc-400">
            Decay: {LightHelper.decay.toFixed(2)}
          </label>
          <input
            type="range"
            min={0}
            max={5}
            step={0.1}
            value={LightHelper.decay}
            onChange={(e) => update("decay", Number(e.target.value))}
            className="w-full"
          />
        </div>
      )}
    </div>
  )
}

export default LightUiHelper
