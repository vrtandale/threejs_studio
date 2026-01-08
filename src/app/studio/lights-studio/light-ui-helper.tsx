import React from "react"
import { useStudioStore } from "../store/studio-store"

const LightUiHelper = () => {
  const { LightHelper, setLightHelper } = useStudioStore()

  const [selectedLight, setSelectedLight] = React.useState<string>(
    LightHelper[0]?.id ?? ""
  )

  const currentLight = React.useMemo(
    () => LightHelper.find((light) => light.id === selectedLight),
    [LightHelper, selectedLight]
  )

  const update = (key: string, value: any) => {
    if (!selectedLight) return

    setLightHelper(
      LightHelper.map((light) =>
        light.id === selectedLight
          ? { ...light, [key]: value }
          : light
      )
    )
  }

  if (!currentLight) return null

  return (
    <div className="rounded-xl bg-zinc-900 p-4 text-zinc-200 shadow-lg space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
        Light Settings
      </h3>

      {/* Light Selector */}
      <div className="space-y-1">
        <label className="text-xs text-zinc-400">Light</label>
        <select
          value={selectedLight}
          onChange={(e) => setSelectedLight(e.target.value)}
          className="w-full rounded-md bg-zinc-800 px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
        >
          {LightHelper.map((light) => (
            <option key={light.id} value={light.id}>
              {light.active}__{light.id.slice(0, 5)}
            </option>
          ))}
        </select>
      </div>

      {/* Color */}
      <div className="flex items-center justify-between gap-3">
        <label className="text-xs text-zinc-400">Color</label>
        <input
          type="color"
          value={currentLight.color ?? "#ffffff"}
          onChange={(e) => update("color", e.target.value)}
          className="h-8 w-10 cursor-pointer rounded bg-transparent"
        />
      </div>

      {/* Intensity */}
      <div className="space-y-1">
        <label className="text-xs text-zinc-400">
          Intensity: {currentLight.intensity.toFixed(2)}
        </label>
        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={currentLight.intensity}
          onChange={(e) => update("intensity", Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Distance */}
      <div className="space-y-1">
        <label className="text-xs text-zinc-400">
          Distance: {currentLight.distance}
        </label>
        <input
          type="range"
          min={0}
          max={500}
          step={1}
          value={currentLight.distance}
          onChange={(e) => update("distance", Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Decay */}
      <div className="space-y-1">
        <label className="text-xs text-zinc-400">
          Decay: {currentLight.decay.toFixed(2)}
        </label>
        <input
          type="range"
          min={0}
          max={5}
          step={0.1}
          value={currentLight.decay}
          onChange={(e) => update("decay", Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  )
}

export default LightUiHelper
