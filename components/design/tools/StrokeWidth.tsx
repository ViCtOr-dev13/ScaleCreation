import { Button } from "@/components/ui/button";
import { useCanvas } from "@/store/useCanvas";
import { ScrollArea , ScrollBar } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { useActiveElement } from "@/store/useActiveElement";
import HovercardHeader from "@/components/global/HovercardHeader";

import { Label } from "@/components/ui/label";

import { useState } from "react";
import { cn } from "@/lib/utils";


interface StrokeWidthProps {
    onChange: ( property:keyof fabric.Object,value: number | number[])=> void;

}

const StrokeWidth = ({onChange}: StrokeWidthProps) => {

    const {canvas} = useCanvas()
    const {activeElement, setActiveElement} = useActiveElement()
    const [property, setProperty] = useState<keyof fabric.Object>("strokeWidth")
    const value= property==="strokeDashArray"
        ?activeElement?.strokeDashArray
        :activeElement?.strokeWidth
    const  onWidthChange = (values: number[]) => {
        if(property=== "strokeWidth") {
            if(activeElement){
                activeElement.set("strokeDashArray", [0,0]);
                canvas?.renderAll();

            }
            onChange(property,values[0])
        }
        else {
            onChange(property,[values[0],values[0]])
        }   
    }
return (
    <>
      <HovercardHeader title="Contours" />
      
      <div className="p-4 space-y-4">
        {/* Type de trait */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            className={cn(
              "h-12 rounded-lg border-2 transition-all flex items-center justify-center",
              property === "strokeWidth"
                ? "border-primary bg-primary/10"
                : "border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800"
            )}
            variant="ghost"
            onClick={() => setProperty("strokeWidth")}
          >
            <div className="w-16 h-0 border-t-2 border-foreground" />
          </Button>
          
          <Button
            className={cn(
              "h-12 rounded-lg border-2 transition-all flex items-center justify-center",
              property === "strokeDashArray"
                ? "border-primary bg-primary/10"
                : "border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800"
            )}
            variant="ghost"
            onClick={() => setProperty("strokeDashArray")}
          >
            <div className="w-16 h-0 border-t-2 border-dashed border-foreground" />
          </Button>
        </div>

        {/* Largeur */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Largeur</Label>
            <span className="text-sm font-medium">
              {Array.isArray(value) ? value[0] : value || 0}px
            </span>
          </div>
          
          <Slider
            step={1}
            defaultValue={[Array.isArray(value) ? value[0] : value || 0]}
            onValueChange={(values) => onWidthChange(values)}
          />
        </div>
      </div>
    </>
  )
}

export default StrokeWidth
