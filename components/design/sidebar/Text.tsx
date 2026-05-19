import * as fabric from "fabric";
import { PiTextTBold } from "react-icons/pi";
import { useCanvas } from "@/store/useCanvas";
import { Button } from "@/components/ui/button";
import { TEXT_OPTIONS } from "@/type/types";
import HoverCardHeader from "@/components/global/HovercardHeader";

const Text = () => {
    const { canvas } = useCanvas();
    // addTextBox
    const addTextBox = () => {
        if (!canvas) return;
        const center = canvas.getCenterPoint();
        const textObject = new fabric.Textbox("Nouveau texte", {
            ...TEXT_OPTIONS,
            left: center.x,
            top: center.y,
        });
        if(canvas) {
            canvas.add(textObject);
            canvas.setActiveObject(textObject);
            canvas.renderAll();
        }
    }
    type TextStyle = "heading" | "subheading" | "small" 

    const addText = (text: string, style: TextStyle) => {
        if (!canvas) return;
        const center = canvas.getCenterPoint();
        const options = (values: {fontSize: number; fontWeight: number}) => {
            const textObject = new fabric.IText(text, { ...TEXT_OPTIONS,
            left: center.x,
            top: center.y, ...values});
        if (canvas) {
            canvas.add(textObject);
            canvas.setActiveObject(textObject);
            canvas.renderAll();
            }
        }

        if (style === "heading"){

            options ({fontSize: 36, fontWeight: 500})
        }   else     if (style === "subheading"){

            options ({fontSize: 24, fontWeight: 200})
        }   else     if (style === "small"){

            options ({fontSize: 14, fontWeight: 100})
        }
        
    };
    return (
        <div className="flex flex-col space-y-2">
            <HoverCardHeader title="Text" description="Ajouter un texte" />
            <Button onClick={addTextBox} className="w-full">
                <PiTextTBold className="mr-2" />
                Ajouter une zone de texte
            </Button>
            <h2 className="font-semibold text-xs">
                Default Text Styles
            </h2>
            <Button
            variant= {"ghost"}
            onClick={() => addText("Nouveau titre","heading")}
            className="border border-gray-400 dark:border-zinc-700 font-extrabold text-3xl h-14"
            >
                Ajouter un titre
            </Button>
            <Button
            variant= {"ghost"}
            onClick={() => addText("Nouveau sous-titre","subheading")}
            className="border border-gray-400 dark:border-zinc-700 font-bold text-lg h-12"
            >
                Ajouter un sous-titre
            </Button>
            <Button
            variant= {"ghost"}
            onClick={() => addText("Nouveau texte","small")}
            className="border border-gray-400 dark:border-zinc-700 "
            >
                Ajouter un corps de texte
            </Button>
        </div>
    );
};

export default Text;