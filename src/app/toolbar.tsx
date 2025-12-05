import { useDialog } from '../providers/DialogProvider';
import './toolbar.css'
import UploadModal from './upload-modal';
const Toolbar = () => {
    const {showDialog}=useDialog()
  return (
    <div className="toolbar">
      <button className="toolbar-btn">Home</button>
      <button className="toolbar-btn" onClick={()=>showDialog(<UploadModal/>)}>Upload</button>
      <button className="toolbar-btn">Settings</button>
    </div>
  );
};

export default Toolbar;
