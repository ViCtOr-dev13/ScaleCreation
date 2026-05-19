import { ITextProps } from "fabric";
import Hint from "@/components/global/Hint";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {FaBible, FaBold , FaItalic, FaStrikethrough, FaUnderline} from "react-icons/fa"
import {ChevronDown, AlignLeft, AlignCenter, AlignRight} from 'lucide-react'
import { useActiveElement } from "@/store/useActiveElement";
import HovercardGlobal from "@/components/global/HovercardGlobal";
import TextFont from "./TextFont";
import { FaA } from "react-icons/fa6";
import Color from "@/components/global/Color";

const Text = ({updateSelectedObject}:
    {
        updateSelectedObject: (
            property: keyof fabric.Object | keyof ITextProps | "rect" , 
            value: string | number | boolean | number [] | undefined
             
        ) => void;
    }) => {
        const  {activeElement }= useActiveElement()

  return (

    <>
    {/*color for letter*/}
    {/* Couleur du contour des lettres */}
        <div className="flex items-center h-full justify-center">
  <HovercardGlobal 
    trigger={
      <Hint label="Couleur du contour" side="bottom" sideOffset={5}>
        <Button
        size="icon"
        variant="ghost"
        className=" flex flex-col items-center gap-0.5 not-only-of-type:justify-center size-9 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
        {/* Icône principale */}
        <FaA className="text-black size-6 scale-125 mt-5 items-center justify-center " />

        {/* Barre de couleur en dessous */}
        <span
            className="w-6 h-2 rounded-sm mb-5 border"
            style={{
            backgroundColor:
                typeof activeElement?.stroke === "string"
                ? activeElement.stroke
                : "#000000",
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
    {/*font*/}
      <div className="flex items-center h-full justify-center">
        <HovercardGlobal
        trigger= {
            <Hint label="Police" side="bottom" sideOffset={5}>
                <Button  size={"icon"} variant={"ghost"}
                className="w-auto px-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div className="'max-w[100px] truncate">
                        {activeElement?.fontFamily}
                    </div>
                <ChevronDown className="size-4 ml-2 shrink-0"/>
                </Button>

            </Hint>
        }
        content={<TextFont
            value={activeElement?.fontFamily}
            fontSize={activeElement?.fontSize}
            onChange={updateSelectedObject}/>}
        />
      </div>
     {/*font weigth*/}
      <div className="flex items-center h-full justify-center">
                    <Hint
                    label= "Gras"
                    side = "bottom"
                    sideOffset={5}
                    >
                        <Button
                        onClick={() => {
                            const newValue = (activeElement?.fontWeight as number) > 500 ? 500 : 700;
                            updateSelectedObject("fontWeight", newValue)
                        }}
                        size="icon"
                        variant={"ghost"}
                        className={cn("hover:bg-gray-100 dark:hover:bg-gray-700",
                            (activeElement?.fontWeight  as number )> 500 && "bg-gray-200 dark:bg-gray-600"
                        )}
                        >
                            <FaBold className="size-4"/>
                         </Button>
                    </Hint>
                </div>
    {/*Italic/normal*/}
      <div className="flex items-center h-full justify-center">
                    <Hint
                    label= "Italique"
                    side = "bottom"
                    sideOffset={5}
                    >
                        <Button
                        onClick={() => {
                            const isItalic = activeElement?.fontStyle === "italic"
                            const newValue = isItalic ? "normal": "italic"
                            updateSelectedObject("fontStyle", newValue)
                        }}
                        size="icon"
                        variant={"ghost"}
                        className={cn("hover:bg-gray-100 dark:hover:bg-gray-700",
                            activeElement?.fontStyle === "italic" && "bg-gray-200 dark:bg-gray-600"
                        )}
                        >
                            <FaItalic className="size-4"/>
                         </Button>
                    </Hint>
                </div>
    {/*UnderLine*/}
      <div className="flex items-center h-full justify-center">
                    <Hint
                    label= "Souligné"
                    side = "bottom"
                    sideOffset={5}
                    >
                        <Button
                        onClick={() => {
                            const newValue = activeElement?.underline ? false : true
                            updateSelectedObject("underline", newValue)
                        }}
                        size="icon"
                        variant={"ghost"}
                        className={cn("hover:bg-gray-100 dark:hover:bg-gray-700",
                            activeElement?.underline && "bg-gray-200 dark:bg-gray-600"
                        )}
                        >
                            <FaUnderline className="size-4"/>
                         </Button>
                    </Hint>
                </div>
    
    {/*Strike*/}
      <div className="flex items-center h-full justify-center">
                    <Hint
                    label= "Sous-ligné"
                    side = "bottom"
                    sideOffset={5}
                    >
                        <Button
                        onClick={() => {
                            const newValue = activeElement?.linethrough ? false : true
                            updateSelectedObject("linethrough", newValue)
                        }}
                        size="icon"
                        variant={"ghost"}
                        className={cn("hover:bg-gray-100 dark:hover:bg-gray-700",
                            activeElement?.linethrough && "bg-gray-200 dark:bg-gray-600"
                        )}
                        >
                            <FaStrikethrough className="size-4"/>
                         </Button>
                    </Hint>
                </div>
    {/* Align left */}
      <div className="flex items-center h-full justify-center">
                    <Hint
                    label= "Sous-ligné"
                    side = "bottom"
                    sideOffset={5}
                    >
                        <Button
                        onClick={() => {
                            const isLeft = activeElement?.textAlign === "left"; 
                            const newValue = isLeft ? "" : "left"
                            updateSelectedObject("textAlign", newValue)
                        }}
                        size="icon"
                        variant={"ghost"}
                        className={cn("hover:bg-gray-100 dark:hover:bg-gray-700",
                            activeElement?.textAlign ==="left" && "bg-gray-200 dark:bg-gray-600"
                        )}
                        >
                            <AlignLeft className="size-4"/>
                         </Button>
                    </Hint>
                </div>
        {/* Align right */}
      <div className="flex items-center h-full justify-center">
                    <Hint
                    label= "Sous-ligné"
                    side = "bottom"
                    sideOffset={5}
                    >
                        <Button
                        onClick={() => {
                            const isLeft = activeElement?.textAlign === "right"; 
                            const newValue = isLeft ? "" : "right"
                            updateSelectedObject("textAlign", newValue)
                        }}
                        size="icon"
                        variant={"ghost"}
                        className={cn("hover:bg-gray-100 dark:hover:bg-gray-700",
                            activeElement?.textAlign ==="right" && "bg-gray-200 dark:bg-gray-600"
                        )}
                        >
                            <AlignRight className="size-4"/>
                         </Button>
                    </Hint>
                </div>
        {/* Align center */}
        <div className="flex items-center h-full justify-center">
                    <Hint
                    label= "Sous-ligné"
                    side = "bottom"
                    sideOffset={5}
                    >
                        <Button
                        onClick={() => {
                            const isLeft = activeElement?.textAlign === "center"; 
                            const newValue = isLeft ? "" : "center"
                            updateSelectedObject("textAlign", newValue)
                        }}
                        size="icon"
                        variant={"ghost"}
                        className={cn("hover:bg-gray-100 dark:hover:bg-gray-700",
                            activeElement?.textAlign ==="center" && "bg-gray-200 dark:bg-gray-600"
                        )}
                        >
                            <AlignCenter className="size-4"/>
                         </Button>
                    </Hint>
                </div>
    </>
  )
}

export default Text
