import HovercardGlobal from "@/components/global/HovercardGlobal";
import { BiCategoryAlt } from "react-icons/bi";

import {
MdOutlineSpaceDashboard,
MdOutlineDraw,
MdSettings,
} from "react-icons/md";
import { PiTextTBold } from "react-icons/pi";
import { RiUploadCloudLine } from "react-icons/ri";
import Trigger from "./Trigger";
import Element from "./Element";
import Uploads from "./Uploads";
import Draw from "./Draw";
import Text from "./Text";
import Settings from "./Settings";
import { designProps } from "@/type";
const Sidebar = ({design}: {design: designProps | undefined}) => {
return <div className="sidebar-section">
    <div className="mt-14">
        <HovercardGlobal
        trigger= {
            <Trigger text="Elements" Icon={BiCategoryAlt}/>
        }
        content={
            <Element/>
        }
        side="right"
        />
        <HovercardGlobal
        trigger= {
            <Trigger text={"Text"} Icon={PiTextTBold}/>
        }
        content={
            <Text/>
        }
        side="left"
        />
        <HovercardGlobal
        trigger= {
            <Trigger text={"Uploads"}  Icon={RiUploadCloudLine}/>
        }
        content={
            <Uploads/>
        }
        side="left"
        />
        <HovercardGlobal
        trigger= {
            <Trigger text={"Draw"} Icon={MdOutlineDraw}/>
        }
        content={
            <Draw/>
        }
        side="left"
        />
                <HovercardGlobal
        trigger= {
            <Trigger text={"Setting"} Icon={MdSettings}/>
        }
        content={
            <Settings design={design} />
        }
        side="left"
        />
        

    </div>
</div>;


}

export default Sidebar;