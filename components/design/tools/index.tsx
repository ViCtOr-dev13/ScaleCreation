import { Button } from "@/components/ui/button";
import { useCanvas } from "@/store/useCanvas";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ITextProps } from "fabric"
import { MdOpacity } from "react-icons/md"
import { ArrowUp, ArrowDown, Copy, Trash } from "lucide-react"
import { FaA } from "react-icons/fa6";
import HovercardGlobal from "@/components/global/HovercardGlobal";
import { useActiveElement } from "@/store/useActiveElement";
import Color from "@/components/global/Color";
import Hint from "@/components/global/Hint";
import StrokeWidth from "./StrokeWidth";
import Corners from "./Corners";
import Opacity from "./Opacity";
import Group from "./Group";
import Text from "./Text";
import Geometry from "./Geometry";

const Tools = () => {
    const { canvas } = useCanvas()
    const { activeElement, setActiveElement, activeElements, setActiveElements } = useActiveElement()
    
    const updateSelectedObject = (
        property: keyof fabric.Object | keyof ITextProps | "rect",
        value: string | number | boolean | number[] | undefined
    ) => {
        if (activeElement) {
            if (activeElement.type === "rect" && property === "rect") {
                activeElement.set({ rx: value, ry: value })
            }
            activeElement.set(property, value);
            canvas?.renderAll()
            setActiveElement(activeElement)
        }
    }
    
    const deleteSelectedObject = () => {
        //single Object
        if (canvas && activeElement) {
            canvas.remove(activeElement);
            setActiveElement(null)
            canvas.renderAll()
        }
        //multiple Object
        if (canvas && activeElements) {
            activeElements.forEach((obj) => { canvas.remove(obj); })
            setActiveElements(null)
            canvas.discardActiveObject();
            canvas.renderAll()
        }
    }

    const bringfForward = () => {
        if (activeElement) {
            canvas?.bringObjectForward(activeElement);
            canvas?.renderAll()
        }
    }
    
    const sendBackward = () => {
        if (activeElement) {
            canvas?.sendObjectBackwards(activeElement);
            canvas?.renderAll()
        }
    }
    
    const duplicate = async () => {
        if (activeElement) {
            const DuplicateObject = await activeElement.clone();
            // Offset the position so it's visible and not overlapping
            DuplicateObject.set({
                left: (activeElement.left ?? 0) + 30,
                top: (activeElement.top ?? 0) + 30,
            });
            canvas?.add(DuplicateObject);
            setActiveElement(DuplicateObject);
            canvas?.setActiveObject(DuplicateObject);
            canvas?.renderAll();
        }
    }

    // Si aucun élément n'est sélectionné, ne rien afficher
    if (!activeElement && (!activeElements || activeElements.length === 0)) {
        return null;
    }

    return (
        <div className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
            <ScrollArea className="w-full">
                <div className="flex justify-center items-center w-full space-x-2 p-3 min-h-[60px]">
                    
                    {/* Text tools */}
                    {(activeElement?.type === "i-text" || activeElement?.type === "textbox") && (
                        <Text updateSelectedObject={updateSelectedObject} />
                    )}
                    
                    {/* image and Geometry tools */}
                    {(activeElement?.type === "rect" || 
                      activeElement?.type === "circle" || 
                      activeElement?.type === "polygon" ||
                      activeElement?.type === "triangle" ||
                      activeElement?.type === "image") && (
                        <Geometry updateSelectedObject={updateSelectedObject} />
                    )}

                    {/* Separator */}
                    {(activeElement?.type === "i-text" || 
                      activeElement?.type === "textbox" || 
                      activeElement?.type === "rect" || 
                      activeElement?.type === "circle" || 
                      activeElement?.type === "polygon" ||
                      activeElement?.type === "triangle") && (
                        <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />
                    )}

                    {/* Bring forward */}
                    <div className="flex items-center h-full">
                        <Hint
                            label="Avancer"
                            side="bottom"
                            sideOffset={5}
                        >
                            <Button
                                onClick={bringfForward}
                                size="icon"
                                variant="ghost"
                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <ArrowUp className="size-4" />
                            </Button>
                        </Hint>
                    </div>

                    {/* Bring backward */}
                    <div className="flex items-center h-full">
                        <Hint
                            label="Reculer"
                            side="bottom"
                            sideOffset={5}
                        >
                            <Button
                                onClick={sendBackward}
                                size="icon"
                                variant="ghost"
                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <ArrowDown className="size-4" />
                            </Button>
                        </Hint>
                    </div>

                    {/* Duplicate */}
                    <div className="flex items-center h-full">
                        <Hint
                            label="Dupliquer"
                            side="bottom"
                            sideOffset={5}
                        >
                            <Button
                                onClick={duplicate}
                                size="icon"
                                variant="ghost"
                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <Copy className="size-4" />
                            </Button>
                        </Hint>
                    </div>

                    {/* Separator */}
                    <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />

                    {/* Opacity */}
                    <div className="flex items-center h-full justify-center">
                        <HovercardGlobal
                            trigger={
                                <Hint
                                    label="Opacité"
                                    side="bottom"
                                    sideOffset={5}
                                >
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <MdOpacity className="size-4" />
                                    </Button>
                                </Hint>
                            }
                            content={
                                <Opacity
                                    onChange={updateSelectedObject}
                                    property="opacity"
                                    value={
                                        activeElement?.opacity !== undefined
                                            ? activeElement.opacity
                                            : 1
                                    }
                                />
                            }
                        />
                    </div>

                    {/* Group tools */}
                    {(activeElement?.type === "group" || (activeElements && activeElements?.length > 1)) && (
                        <>
                            <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />
                            <Group />
                        </>
                    )}

                    {/* Separator before delete */}
                    <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />

                    {/* Delete */}
                    <div className="flex items-center h-full">
                        <Hint
                            label="Supprimer"
                            side="bottom"
                            sideOffset={5}
                        >
                            <Button
                                onClick={deleteSelectedObject}
                                size="icon"
                                variant="ghost"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/30"
                            >
                                <Trash className="size-4" />
                            </Button>
                        </Hint>
                    </div>
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

export default Tools