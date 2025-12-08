import { useClippingStore } from "../clipping/clipping-store"
import "./utility-panel.css"

const UtilityPanel = () => {
    const { setClippingPosition } = useClippingStore()

    return (<div className="utility-panel">

        <div className="utility-title">
            🛠 Utilities Panel
        </div>

        <div className="utility-section">
            <div className="section-title">✂️ Clipping Position</div>

            <input
                type="range"
                min={0}
                max={100}
                onChange={(e) => setClippingPosition(Number(e.target.value))}
                className="slider"
            />
        </div>

        <div className="utility-coming-soon">
            More tools coming soon...
        </div>

    </div>


    )
}

export default UtilityPanel
