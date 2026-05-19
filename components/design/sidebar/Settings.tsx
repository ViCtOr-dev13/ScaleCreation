import { designProps } from '@/type'
import React, { useState, useEffect } from 'react'
import HoverCardHeader from "@/components/global/HovercardHeader";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Color from '@/components/global/Color';
import { useCanvas } from '@/store/useCanvas';
import { useApiMutation } from '@/hooks/useApiMutation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { parseLinearGradientString } from '@/lib/utils';

const Settings = ({ design }: { design: designProps | undefined }) => {
  const { canvas } = useCanvas();
  const [width, setWidth] = useState<number>(Number(design?.width) || 800);
  const [height, setHeight] = useState<number>(Number(design?.height) || 600);
  const [bgColor, setBgColor] = useState<string>(
    canvas?.backgroundColor?.toString() || "#ffffff"
  );
  const { mutate, pending } = useApiMutation(api.design.UpdateDesignSize);

  // Synchroniser l'état avec le canvas et le design
  useEffect(() => {
    if (design) {
      setWidth(Number(design.width));
      setHeight(Number(design.height));
    }
  }, [design]);

  useEffect(() => {
    if (canvas?.backgroundColor) {
      const currentBg = canvas.backgroundColor.toString();
      setBgColor(currentBg);
    }
  }, [canvas?.backgroundColor]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!design || !canvas) return;

    canvas.setDimensions({ width, height });
    canvas.renderAll();

    await mutate({
      id: design._id,
      height,
      width
    })
      .then(() => {
        toast.success("La taille du design a été mise à jour");
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour :", error);
        toast.error("Échec du redimensionnement");
      });
  };

  const chooseColor = (property: "fill" , value: string) => {
    if (!value || !canvas) return;

    let newBackgroundColor;

    if (value.includes("linear")) {
      newBackgroundColor = parseLinearGradientString(value, canvas);
    } else {
      newBackgroundColor = value;
    }

    setBgColor(value);
    canvas.backgroundColor=newBackgroundColor ;
    canvas.renderAll();
  };

  if (!design) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-muted-foreground">Aucun design sélectionné</p>
      </div>
    );
  }

  return (
  <div className="flex flex-col relative h-full">
    <HoverCardHeader title="Paramètres"/>

    <ScrollArea className="flex-1 h-[70vh]">
      {/* Section Dimensions */}
      <div className="pr-1">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2 w-full"> {/* gap réduit à gap-2 */}
            <div className="space-y-2">
              <Label htmlFor="width" className="text-xs font-medium">
                Largeur
              </Label>
              <Input
                id="width"
                placeholder="Largeur"
                value={width}
                className="bg-transparent dark:bg-transparent border border-gray-400 dark:border-zinc-700"
                onChange={(e) => setWidth(Number(e.target.value))}
                disabled={pending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height" className="text-xs font-medium">
                Hauteur
              </Label>
              <Input
                id="height"
                placeholder="Hauteur"
                value={height}
                className="bg-transparent dark:bg-transparent border border-gray-400 dark:border-zinc-700"
                onChange={(e) => setHeight(Number(e.target.value))}
                disabled={pending}
              />
            </div>
          </div>

          <Button 
            className="w-full" 
            type="submit" 
            disabled={pending}
          >
            {pending ? "Mise à jour..." : "Appliquer les dimensions"}
          </Button>
        </form>
      </div>

      {/* Section Couleur d'arrière-plan */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-zinc-800">
        <Color
          title="Couleur d'arrière-plan"
          onChange={chooseColor}
          strokeValue={bgColor || "#ffffff"}
          value={bgColor}
        />
      </div>
    </ScrollArea>
  </div>
);
}


export default Settings;