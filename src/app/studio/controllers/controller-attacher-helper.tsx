import React from 'react'
import { useModalStore } from '../../toolbar/store/upload-modal-store'
import useAddTranslationController from './dyanmic-controller-translation'

const ControllerAttacher = () => {
    const {object3d}=useModalStore()
    const attacher=useAddTranslationController()
    React.useEffect(()=>{
        object3d?.forEach((x)=>{
            attacher(x)
        })
    },[object3d])
  return null
}

export default ControllerAttacher