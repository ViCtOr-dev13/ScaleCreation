import HovercardHeader from "@/components/global/HovercardHeader";
import { Slider } from "@/components/ui/slider";
import { HoverCard } from "@radix-ui/react-hover-card";

interface OpacityPickerProps {
    value: number;
    onChange: (property: keyof fabric.Object, value: number) => void;
    property: keyof fabric.Object;

}
const Opacity = ({onChange,property,value}:OpacityPickerProps) => {
  return (
    <div className=" flex flex-col space-y-4">
        <HovercardHeader
        title= "Opacité"
        />
        <Slider
        defaultValue = {[value]}
        max={1}
        min = {0}
        step = {0.01}
        onValueChange= {(values) => onChange(property, values[0]) }
        />
    </div>
  )
}

export default Opacity
