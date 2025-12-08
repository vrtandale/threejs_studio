import { useDialog } from '../../providers/DialogProvider';
import Settings from './settings/settings';
import './toolbar.css'
import UploadModal from './upload-modal/upload-modal';
const Toolbar = () => {
    const {showDialog}=useDialog()
  return (
    <div className="toolbar">
      <button className="toolbar-btn">Home</button>
      <button className="toolbar-btn" onClick={()=>showDialog(<UploadModal/>)}>Upload</button>
      <button className="toolbar-btn" onClick={()=>showDialog(<Settings/>)} >Settings</button>
    </div>
  );
};

export default Toolbar;
