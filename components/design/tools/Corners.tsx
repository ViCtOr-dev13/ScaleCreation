import { ITextProps } from 'fabric';

import { Slider } from "@/components/ui/slider"
import HovercardHeader from '@/components/global/HovercardHeader';

const Corners = ({
    onChange,
    value,

}:{
    onChange:(
        property: keyof fabric.Object | keyof ITextProps | "rect",
        value: string | number | boolean | number[] | undefined
    )=> void;
    value: number;

}) => {
  return (
    <div className='felx flex-col space-y-4'>
      <HovercardHeader
      title='Arrondir les coins'/>
      <div className="flex items-center justify-between">
    
      <Slider
      defaultValue={[value]}
      onValueChange={(values) => onChange("rect", values[0])}
      
      />
      <span className="text-sm font-medium">
              {Array.isArray(value) ? value[0] : value || 0}%
            </span>
      </div>

    </div>
  )
}

export default Corners
