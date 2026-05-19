import { Button } from "@/components/ui/button";
import Hint from "@/components/global/Hint";
import { cn } from "@/lib/utils";
import { useCanvas } from "@/store/useCanvas";
import * as fabric from "fabric";
import {FaLayerGroup} from "react-icons/fa"


const Group = () => {
    const {canvas } = useCanvas()
    const activeObject = canvas?.getActiveObject()

    const groupSelectedObjects = () => {
        const selectedObjects = canvas?.getActiveObjects();
        if (selectedObjects && selectedObjects.length >1){
            
            const group = new fabric.Group(selectedObjects ); 
            // add group to canvas and remove individual objects
            canvas?.add(group);
            selectedObjects.forEach((obj) => canvas?.remove(obj))
            canvas?.setActiveObject(group)
        }
        if (activeObject && activeObject.type ==="group") {
            const group = activeObject as fabric.Group
            const objects = group.getObjects();
            group.remove();
            canvas?.remove(activeObject)
            for(const object of objects){
                canvas?.add(object);
                //canvas?.item(canvas.size() - 1)?.set("hasControls", true)
            }
            canvas?.discardActiveObject();

        }
        canvas?.renderAll()
       
    }
  return (
    <div className="flex items-center h-full justify-center">
        <Hint
        label = "Group"
        side="bottom"
        sideOffset={5}>
            <Button
            size={"icon"}
            variant={"ghost"}
            className={cn(
                activeObject && activeObject.type === "group" && 
                "bg-gray-200 dark:bg-darkHover"
            )
            }
            onClick={groupSelectedObjects}
            >
                <FaLayerGroup className = "size-5"/>

            </Button>

        </Hint>
    </div>
  )
}

export default Group
