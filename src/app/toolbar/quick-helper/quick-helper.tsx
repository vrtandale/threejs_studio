import ClippingHelper from "../clipping/clipping-helper"
import { useClippingStore } from "../clipping/clipping-store"
import "./utility-panel.css"

const UtilityPanel = () => {

    return (<div className="utility-panel">

        <div className="utility-title">
            🛠 Utilities Panel
        </div>
        <ClippingHelper/>
    </div>


    )
}

export default UtilityPanel
