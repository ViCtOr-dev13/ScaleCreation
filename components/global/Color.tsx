import { HoverCard } from "@radix-ui/react-hover-card";
import { TFiller } from "fabric";
import * as fabric from "fabric";
import HoverCardHeader from "./HovercardHeader";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, CheckCheck, Palette, Droplets, Ruler } from "lucide-react";
import { toast } from "sonner";
import { ITextProps } from 'fabric';

interface ColorProps {
    value?: string | TFiller;
    strokeValue?: string | TFiller;
    onChange: (property: keyof fabric.Object | keyof ITextProps | "rect" , value: string) => void;
    title: string;
    desc: string;
}

const Color = ({
    value,
    strokeValue,
    onChange,
    title,
    desc
}: ColorProps) => {
    const [color, setColor] = useState(
        typeof value === "string" ? value : "#000000"
    );
    const [strokeColor, setStrokeColor] = useState(
        typeof strokeValue === "string" ? strokeValue : "#000000"
    );
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState("presets");
    const [colorMode, setColorMode] = useState<"fill" | "stroke">("fill");

    const getCurrentColor = () => {
        return colorMode === "fill" ? color : strokeColor;
    };

    const handleColorChange = (newColor: string) => {
        if (colorMode === "fill") {
            setColor(newColor);
            onChange("fill", newColor);
        } else {
            setStrokeColor(newColor);
            onChange("stroke", newColor);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(getCurrentColor());
            setCopied(true);
            toast.success("Couleur copiée !");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error("Erreur lors de la copie");
        }
    };

    const presetColors = [
        "#000000", "#ffffff", "#ff3b30", "#ff9500", "#ffcc00",
        "#4cd964", "#5ac8fa", "#007aff", "#5856d6", "#ff2d55",
        "#8e8e93", "#c7c7cc", "#d1d1d6", "#e5e5ea", "#f2f2f7"
    ];

    return (
        <div className="w-[300px]">
            <HoverCardHeader title={title} description={desc} />

            <div className="space-y-4 items-center max-h-[60vh] overflow-y-auto">
                {/* Aperçu de la couleur */}
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div 
                            className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600"
                            style={{ backgroundColor: getCurrentColor() }}
                        />
                        <div>
                            <p className="text-sm font-medium">
                                Couleur {colorMode === "fill" ? "de fond" : "de contour"}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {getCurrentColor()}
                            </p>
                        </div>
                    </div>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={copyToClipboard}
                        className="h-8 w-8 p-0"
                    >
                        {copied ? <CheckCheck className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>

                {/* Bouton de switch fill/stroke */}
                <div className="flex items-center justify-center space-x-2 p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <Button
                        size="sm"
                        variant={colorMode === "fill" ? "default" : "outline"}
                        onClick={() => setColorMode("fill")}
                        className="flex-1"
                    >
                        <Palette className="h-4 w-4 mr-2" />
                        Fond
                    </Button>
                    <Button
                        size="sm"
                        variant={colorMode === "stroke" ? "default" : "outline"}
                        onClick={() => setColorMode("stroke")}
                        className="flex-1"
                    >
                        <Ruler className="h-4 w-4 mr-2" />
                        Contour
                    </Button>
                </div>

                {/* Sélecteur de type de couleur */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="justify-center items-center">
                    <TabsList className="grid grid-cols-2 justify-center items-center">
                        <TabsTrigger value="solid" className="text-xs">
                            <Palette className="h-3 w-3 mr-1" />
                            Solide
                        </TabsTrigger>
                        <TabsTrigger value="presets" className="text-xs">
                            <Droplets className="h-3 w-3 mr-1" />
                            Prédéfinies
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="solid" className="mt-4">
                        <div className="w-full max-w-[350px] mx-auto">
                            <ColorPicker
                                value={getCurrentColor()}
                                onChange={handleColorChange}
                                className="rounded-lg"
                                hideControls={false}
                                hideInputs={false}
                                hidePresets={true}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="gradient" className="mt-4">
                        <div className="w-full max-w-[350px] mx-auto">
                            <ColorPicker
                                value={getCurrentColor()}
                                onChange={handleColorChange}
                                className="w-full!"
                                hideControls={false}
                                hideInputs={false}
                                hidePresets={true}
                                hideGradientControls={false}
                                hideGradientType={false}
                                hideGradientAngle={false}
                                hideGradientStop={false}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="presets" className="mt-4">
                        <div className="grid grid-cols-5 gap-2 max-w-[350px] mx-auto">
                            {presetColors.map((presetColor, index) => (
                                <button
                                    key={index}
                                    className="w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform"
                                    style={{ backgroundColor: presetColor }}
                                    onClick={() => handleColorChange(presetColor)}
                                />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Dernières couleurs utilisées */}
                <div className="space-y-2 max-w-[350px] mx-auto">
                    <Label className="text-xs">Récentes</Label>
                    <div className="grid grid-cols-6 gap-1">
                        {presetColors.slice(0, 6).map((recentColor, index) => (
                            <button
                                key={index}
                                className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform"
                                style={{ backgroundColor: recentColor }}
                                onClick={() => handleColorChange(recentColor)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Color;