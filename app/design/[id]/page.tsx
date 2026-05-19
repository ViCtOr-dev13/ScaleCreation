"use client"

import Header from '@/components/design/header'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { redirect, useParams } from 'next/navigation'
import * as fabric from "fabric"
import { useEffect, useRef } from 'react'
import { useCanvas } from '@/store/useCanvas'
import Sidebar from '@/components/design/sidebar'
import { useActiveElement } from '@/store/useActiveElement'
import Tools from '@/components/design/tools'
import { Id } from '@/convex/_generated/dataModel'
import { useNetworkStatus } from '@/store/useNetworkStatus'
import { ImSpinner6 } from 'react-icons/im'
import Zoom from '@/components/design/tools/Zoom';
import { useZoom } from '@/store/useZoom'
const design = () => {
  const { zoom } = useZoom()
  const {id} = useParams();
  const {canvas, setCanvas}  = useCanvas()
  const { isOnline } = useNetworkStatus()
  const {activeElement, setActiveElement, setActiveElements } = useActiveElement()
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const design = useQuery(api.design.getDesigns, {id: id as Id<"designs">});
  
  if(design === null) return redirect("/dashboard")

  const width = design?.width || 1240 ; 
  const height = design?.height || 720 ; 

  const handleChange = ( 
    property: keyof fabric.FabricObject,
    value: string | boolean | number 
  ) => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.set(property, value)
        if (property === "padding") activeObject.setCoords();
        canvas.requestRenderAll()
      }
    }
  }

  useEffect(() => {
  
  if (!canvasRef.current || !design) return 

  const FabricCanvas = new fabric.Canvas(canvasRef.current, {
    backgroundColor: "#ffffff",
    height: height,
    width: width,
    controlsAboveOverlay: true,
    preserveObjectStacking: true,
  })
  
  setCanvas(FabricCanvas);

  const updateSelectedObject = () => {
    const activeObject = FabricCanvas.getActiveObject()
    if (activeObject) {
      setActiveElement(activeObject as fabric.Object & fabric.ITextProps);
      
      // Applique les styles aux objets sélectionnés
      activeObject.set({
        cornerColor: "#023834",
        cornerStyle: "circle",
        borderColor: "#023834",
        padding: 10,
        borderScaleFactor: 1.5,
        cornerSize: 12,
        hasControls: true,
        borderOpacityWhenMoving: 0.8,
        transparentCorners: false,
      });
      activeObject.setCoords();
      FabricCanvas.requestRenderAll();
    } else {
      setActiveElement(null)
    }
  }

  const updateSelectedObjects = () => {
    const activeObjects = FabricCanvas.getActiveObjects()
    if (activeObjects && activeObjects.length > 0) {
      setActiveElements(activeObjects as (fabric.Object & fabric.ITextProps)[]);
      
      // Applique les styles à tous les objets sélectionnés
      activeObjects.forEach(obj => {
        obj.set({
          cornerColor: "#023834",
          cornerStyle: "circle",
          borderColor: "#023834",
          padding: 10,
          borderScaleFactor: 1.5,
          cornerSize: 12,
          hasControls: true,
          borderOpacityWhenMoving: 0.8,
          transparentCorners: false,
        });
        obj.setCoords();
      });
      FabricCanvas.requestRenderAll();
    } else {
      setActiveElements(null)
    }
  }

  // Événements pour les sélections multiples
  FabricCanvas.on("selection:created", updateSelectedObjects);
  FabricCanvas.on("selection:updated", updateSelectedObjects);
  FabricCanvas.on("selection:cleared", () => setActiveElements(null));

  // Événements pour la sélection unique
  FabricCanvas.on("selection:created", updateSelectedObject);
  FabricCanvas.on("selection:updated", updateSelectedObject);
  FabricCanvas.on("selection:cleared", () => setActiveElement(null));

  // Applique les styles par défaut à tous les nouveaux objets
  FabricCanvas.on("object:added", (e) => {
    if (e.target) {
      e.target.set({
        cornerColor: "#023834",
        cornerStyle: "circle",
        borderColor: "#023834",
        padding: 10,
        borderScaleFactor: 1.5,
        cornerSize: 12,
        hasControls: true,
        borderOpacityWhenMoving: 0.8,
        transparentCorners: false,
      });
    }
  });

  FabricCanvas.requestRenderAll();

  return () => {
    FabricCanvas.dispose()
  }
}, [setCanvas, setActiveElement, setActiveElements, width, height, design])
 useEffect(() => {
    if(!canvas) return; 
    canvas.selection = isOnline;
    canvas.getObjects().forEach((object) => {
      object.selectable = isOnline;
      object.evented = isOnline;
    });
    
  }, [isOnline, canvas])
  // Afficher le loader pendant le chargement
  if (design === undefined) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <ImSpinner6 className='size-10 animate-spin'/>
      </div>
    )
  }
 

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <Header design={design} />
      
      <div className="flex-1 flex overflow-hidden">
        {isOnline && (
          <Sidebar design={design} />
        )}
        
        <main className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <Tools />
          
          <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
            <div 
              className="bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-200"
              style={{ 
                width: width * (zoom / 100), 
                height: height * (zoom / 100),
              }}
            >
              <canvas 
                ref={canvasRef} 
                width={width} 
                height={height}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block'
                }}
              />
            </div>
          </div>
          
          <div className="h-8 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800" />
        </main>
      </div>
      
      <Zoom />
    </div>
  );
};

export default design