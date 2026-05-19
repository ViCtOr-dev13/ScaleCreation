import HovercardHeader from "@/components/global/HovercardHeader";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { fonts } from "@/type/types";
import { ITextProps } from "fabric";

const TextFont = ({
    onChange,
    value,
    fontSize,
}: {
        onChange: (
        property: keyof fabric.Object | keyof ITextProps | "rect",
        value: string | number | number[] | undefined
    ) => void;
    value: string | number | number[] | undefined;
    fontSize: number | undefined;
}) => {

    return <>
            {/* Section Taille de police */}
            <div className="space-y-3">
                <HovercardHeader title="Taille de police" />
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            {fontSize || 100}px
                        </span>
                    </div>
                    <Slider
                        value={[fontSize || 100]}
                        onValueChange={(values) => onChange("fontSize", values[0])}
                        max={100}
                        min={10}
                        step={1}
                        className="w-full"
                    />
                </div>
            </div>
    <ScrollArea className="h-[70vh] space-y-2 mt-3">
        <HovercardHeader title="Choix de police" />
        {fonts.map((font) => (
            <div key={font} className="px-4 py-2 space-y-1 flex flex-col">
                <Button
                    className={cn("w-full h-16 justify-start text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md", value === font && "border-2 border-primary bg-primary/10 shadow-sm text-black dark:text-white")}
                    size={"lg"}
                    style={{fontFamily: font}}
                    onClick={() => onChange("fontFamily", font)}>
                    {font}
                </Button>
            </div>
        ))}
    </ScrollArea>
     </>;
};
export default TextFont;
