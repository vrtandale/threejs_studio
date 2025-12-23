import React from 'react'
import { useModalStore } from '../../toolbar/store/upload-modal-store'
import useAddTranslationController from './dyanmic-controller-translation'
import { useRayCaster } from '../raycaster/raycaster-hook'

const ControllerAttacher = () => {
  useRayCaster()
  return null
}

export default ControllerAttacher