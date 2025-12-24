import CameraUtil from "../../studio/camera-view/camera-util"
import ControllerAttacher from "../../studio/controllers/controller-attacher-helper"
import ClippingHelper from "../clipping/clipping-helper"
import ModalEditor from "../upload-modal/modal-editor"
import "./utility-panel.css"

const UtilityPanel = () => {

    return (
    <div className="utility-panel" style={{height:"100%", overflowY:"scroll",scrollbarWidth:"none"}}>
        <div className="utility-section">
            <div className="utility-title">
                🛠 Utilities Panel
            </div>
        </div>
        <div className="utility-section">
            <CameraUtil />
        </div>
        <div className="utility-section">
            <ClippingHelper />
        </div>
        <div className="utility-section">
            <ModalEditor />
        </div>
        <div className="utility-section">
            <ControllerAttacher />
        </div>
    </div>


    )
}

export default UtilityPanel
