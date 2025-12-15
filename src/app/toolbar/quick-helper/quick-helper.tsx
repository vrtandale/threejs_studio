import ClippingHelper from "../clipping/clipping-helper"
import ModalEditor from "../upload-modal/modal-editor"
import "./utility-panel.css"

const UtilityPanel = () => {

    return (<div className="utility-panel">

        <div className="utility-title">
            🛠 Utilities Panel
        </div>
        <ClippingHelper/>
        <ModalEditor/>
    </div>


    )
}

export default UtilityPanel
