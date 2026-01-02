import CameraUtil from "../../studio/camera-view/camera-util"
import ControllerAttacher from "../../studio/controllers/controller-attacher-helper"
import ClippingHelper from "../clipping/clipping-helper"
import ModalEditor from "../upload-modal/modal-editor"

import {
  Card,
  CardContent,
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
import { Separator } from "@/components/ui/separator"

const UtilityPanel = () => {
  return (
     <Card className="utility-panel" style={{height:"100%", overflowY:"scroll",scrollbarWidth:"none"}}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          🛠 Utilities Panel
        </CardTitle>
      </CardHeader>

      <Separator />

      <ScrollArea className="h-[calc(100%-4rem)] px-4">
        <Accordion
          type="multiple"
          defaultValue={["camera", "clipping"]}
          className="space-y-3"
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
