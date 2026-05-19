import * as fabric from "fabric";
import { useCanvas } from "@/store/useCanvas";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import HoverCardHeader from "@/components/global/HovercardHeader";
import Color from "@/components/global/Color";
import { useState, useEffect } from "react";

const Draw = () => {
  const { canvas } = useCanvas();
  const [brushWidth, setBrushWidth] = useState<number>(10);
  const [brushColor, setBrushColor] = useState<string>("#000000");

  useEffect(() => {
    if (!canvas) return;

    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = brushWidth;
    canvas.freeDrawingBrush.color = brushColor;
  }, [canvas]);

  if (!canvas) return null;

  const drawMode = () => {
    canvas.isDrawingMode = !canvas.isDrawingMode;
  };

  const onValueChange = (value: number) => {
    if (!canvas?.freeDrawingBrush) return;
    setBrushWidth(value);
    canvas.freeDrawingBrush.width = value;
  };

  const chooseColor = (property: string, value: string) => {
    if (!canvas?.freeDrawingBrush) return;
    setBrushColor(value);
    canvas.freeDrawingBrush.color = value;
  };

  return (
    <div className="flex flex-col space-y-2">
      <Button onClick={drawMode}>
        {canvas?.isDrawingMode ? "Désactivé mode dessin" : "Activé mode dessin"}
      </Button>

      <HoverCardHeader title="Ajuster la largeur" description="" />

      <Slider
        value={[brushWidth]}
        onValueChange={(values) => onValueChange(values[0])}
        max={100}
        min={1}
        step={1}
      />
      
      {/* témoin visuel */}
      <div className="flex flex-col items-center py-2">
        <div className="w-full flex items-center justify-center mb-1">
          <div
            className="rounded-full transition-all duration-200"
            style={{
              width: `${brushWidth}px`,
              height: `${brushWidth}px`,
              backgroundColor: brushColor
            }}
          />
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <span>Largeur: {brushWidth}px</span>
        </div>
      </div>

      <Color
        title="Couleur du pinceau"
        desc="Choisir la couleur du pinceau"
        onChange={chooseColor}
        value={brushColor}
        strokeValue="#000000"
      />
    </div>
  );
};

export default Draw;