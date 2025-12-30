import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { useDialog } from "@/providers/DialogProvider"
import UploadModal from "../toolbar/upload-modal/upload-modal"
import UtilityPanel from "../toolbar/quick-helper/quick-helper"

const Sidebar = () => {
        const {showDialog}=useDialog()
    
    return (
        <Menubar className="absolute  bg-gray-800 border border-black backdrop-blur-lg bg-white/20 rounded-xl p-8 shadow-xl text-white flex flex-col left-0 top-0 m-2 p-2 rounded-lg shadow-lg">
            <MenubarMenu >
                <MenubarTrigger>Menu</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem onClick={()=>showDialog(<UploadModal/>)}>Upload</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem  onClick={()=>showDialog(<UtilityPanel/>,true)}>Quick Helper</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        
        </Menubar>
    )
}

export default Sidebar