import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { useDialog } from "@/providers/DialogProvider"
import UploadModal from "../toolbar/upload-modal/upload-modal"
import UtilityPanel from "../toolbar/quick-helper/quick-helper"
import MeshGeomtriesUi from "../studio/mesh-geometry-objects/mesh-geomtries-ui"

const Sidebar = () => {
    const { showDialog } = useDialog()

    return (
        <Menubar
            style={{ height: ' -webkit-fill-available' }}
            className="absolute  bg-gray-800 border border-black backdrop-blur-lg bg-white/20 rounded-xl p-8 shadow-xl text-white flex flex-col left-0 top-0 m-2 p-2 rounded-lg shadow-lg">
            <MenubarMenu >
                <MenubarTrigger>Menu</MenubarTrigger>
                <MenubarContent side="right">
                    <MenubarItem onClick={() => showDialog(<UploadModal />)}>Upload</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => showDialog(<UtilityPanel />, true)}>Quick Helper</MenubarItem>
                </MenubarContent>
            </MenubarMenu>

            <MenubarMenu >
                <MenubarTrigger>Add</MenubarTrigger>
                <MenubarContent side="right">
                    <MenubarItem onClick={() => showDialog(<MeshGeomtriesUi />)}>Mesh</MenubarItem>
                    <MenubarItem >Light</MenubarItem>
                    <MenubarItem >Camera</MenubarItem>
                </MenubarContent>
            </MenubarMenu>

        </Menubar>
    )
}

export default Sidebar