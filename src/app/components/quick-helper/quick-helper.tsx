import CameraUtil from "../../studio/camera-view/camera-util"
import ControllerAttacher from "../../studio/controllers/controller-attacher-helper"
import ClippingHelper from "../../toolbar/clipping/clipping-helper"
import ModalEditor from "../../toolbar/upload-modal/modal-editor"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import './utility-panel.css'
import { ScrollArea } from "@/components/ui/scroll-area"

const UtilityPanel = () => {
  return (
     <Card className="utility-panel" style={{maxHeight:"100%", overflowY:"scroll",scrollbarWidth:"none"}}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          🛠 Utilities Panel
        </CardTitle>
      </CardHeader>

      <ScrollArea className="h-[calc(100%-4rem)] px-4">
        <Accordion
          type="multiple"
        >
          <AccordionItem value="camera">
            <AccordionTrigger>📷 Camera Tools</AccordionTrigger>
            <AccordionContent>
              <CameraUtil />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="clipping">
            <AccordionTrigger>✂️ Clipping Tools</AccordionTrigger>
            <AccordionContent>
              <ClippingHelper />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="modal">
            <AccordionTrigger>🖼 Upload / Modal Editor</AccordionTrigger>
            <AccordionContent>
              <ModalEditor />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="controller">
            <AccordionTrigger>🎮 Controller Attacher</AccordionTrigger>
            <AccordionContent>
              <ControllerAttacher />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </Card>
  )
}

export default UtilityPanel
