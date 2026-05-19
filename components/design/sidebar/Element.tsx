import HovercardHeader from '@/components/global/HovercardHeader'
import { FaRegCircle } from "react-icons/fa6";
import { IoTriangleOutline } from "react-icons/io5";
import { LuDiamond } from "react-icons/lu";
import { BiRectangle } from "react-icons/bi";
import * as fabric from "fabric" ;
import ElementCard from './ElementCard'

import {
  CIRCLE_OPTIONS,
  RECTANGLE_OPTIONS,
  DIAMOND_OPTIONS,
  TRIANGLE_OPTIONS,
  TEXT_OPTIONS
} from "@/type/types"
import { useCanvas } from '@/store/useCanvas';
const Element = () => {
  const {canvas} = useCanvas()
  //  RECT
  const addRect = () => {
    const rect = new fabric.Rect({
      ...RECTANGLE_OPTIONS
    })
    canvas?.add(rect)
    canvas?.setActiveObject(rect)
    canvas?.requestRenderAll();
    
  }
    //  Circle
  const addCirle = () => {
    const circle = new fabric.Circle({
      ...CIRCLE_OPTIONS
    })
    canvas?.add(circle)
    canvas?.setActiveObject(circle)
    canvas?.requestRenderAll();
  }
    //  Triangle
  const addTriangle = () => {
    const triangle = new fabric.Triangle({
      ...TRIANGLE_OPTIONS
    })
    canvas?.add(triangle)
    canvas?.setActiveObject(triangle)
    canvas?.requestRenderAll();
    
  }
    //  Losange
  const addDiamond = () => {
    const points = [
      {x: 0, y:-50},
      {x: 50, y:0},
      {x: 0, y:50},
      {x: -50, y:0}
    ]
    const diamond = new fabric.Polygon(points,{
      ...DIAMOND_OPTIONS
    })
    canvas?.add(diamond)
    canvas?.setActiveObject(diamond)
    canvas?.requestRenderAll();
    
  }

  return (
    <div className='flex flex-col space-y-2'>
     <HovercardHeader
     title = "Elements"
     description= "Ajouter des elements a ton design"/>
    <div className='flex gap-2'>
    <ElementCard onClick={addRect} Icon={BiRectangle} Text="Rectangle"/>
    <ElementCard onClick={addCirle} Icon={FaRegCircle} Text="Circle" />
    <ElementCard onClick={addTriangle} Icon={IoTriangleOutline} Text="Triangle"/>
    <ElementCard onClick={addDiamond} Icon={LuDiamond} Text="Diamond" /> 
    
    
    
    </div>
    </div>
  )
}

export default Element
