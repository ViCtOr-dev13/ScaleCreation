import Hint from "@/components/global/Hint";
import HovercardGlobal from "@/components/global/HovercardGlobal";
import { Button } from "@/components/ui/button";
import { useActiveElement } from "@/store/useActiveElement";
import { ITextProps } from "fabric";
import { BsBorderWidth } from "react-icons/bs";
import StrokeWidth from "./StrokeWidth";
import { TbBorderCornerIos } from "react-icons/tb";
import Corners from "./Corners";
import Color from "@/components/global/Color";
import { cn } from "@/lib/utils";

const Geometry = ({updateSelectedObject}:
    {
        updateSelectedObject: (
            property: keyof fabric.Object | keyof ITextProps | "rect" , 
            value: string | number | boolean | number [] | undefined
             
        ) => void;
    }) => {
        const  {activeElement }= useActiveElement()
  return (
    <>
    {/* contour color */} 
<div className="flex items-center h-full justify-center">
  <HovercardGlobal 
    trigger={
      <Hint
        label="Couleur du trait"
        side="bottom"
        sideOffset={5}
      >
        <Button
          size="icon"
          variant="ghost"
          className="p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {/* Affichage de la couleur du contour */}
        {/* Affichage de la couleur du contour */}
        <div
            className="rounded-sm size-5 border-2 w-5 h-5 mr-1"
            style={{
                borderColor:
                    typeof activeElement?.stroke === "string"
                        ? activeElement.stroke
                        : "#000",
                backgroundColor:
                    typeof activeElement?.fill === "string"
                        ? activeElement.fill
                        : "#fff", // fallback si ce n'est pas une string
            }}
        />

        </Button>
      </Hint>
    }
    content={
      <Color
        onChange={updateSelectedObject}
        value={activeElement?.fill || "#000000"}
        strokeValue={activeElement?.stroke || "#000000"}
        title="Couleur"
        desc="Changer la couleur du fond et du contour"
    />
    }
  />
</div>
                {/* largeur contour  */} 
                <div className="flex items-center h-full justify-center">
                    <HovercardGlobal 
                    trigger = {
                        <Hint
                        label = "Style de trait"
                        side = "bottom"
                        sideOffset={5}>

                        
                        <Button
                        size={"icon"}
                        variant ={"ghost"}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                         <BsBorderWidth className="size-4"/>
                        </Button>
                        </Hint>
                    }
                        content = {
                            <StrokeWidth
                            onChange={updateSelectedObject}
                             />
                        }
                        />
                </div>
                            {/* Rect  */} 
                <div className="flex items-center h-full justify-center">
                    <HovercardGlobal 
                    trigger = {
                        <Hint
                        label = "coins"
                        side = "bottom"
                        sideOffset={5}>

                        
                        <Button
                        size={"icon"}
                        variant ={"ghost"}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                         <TbBorderCornerIos className="size-4"/>
                        </Button>
                        </Hint>
                    }
                        content = {
                            <Corners
                            onChange={updateSelectedObject}
                            value = { activeElement?.rx || 0}
                             />
                        }
                        />

                </div>
    </>
  )
}

export default Geometry
