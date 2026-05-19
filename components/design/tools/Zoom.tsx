"use client"

import { useCanvas } from '@/store/useCanvas'
import { useEffect, useState } from 'react'
import { LuZoomIn, LuZoomOut } from 'react-icons/lu'
import { MdOutlineRestartAlt } from 'react-icons/md'
import { useZoom } from '@/store/useZoom'

const Zoom = () => {
  const { canvas } = useCanvas()
  const { zoom, setZoom } = useZoom()

  useEffect(() => {
    if (!canvas) return

    const zoomLevel = zoom / 100
    canvas.setZoom(zoomLevel)
    canvas.requestRenderAll()
  }, [zoom, canvas])

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 10, 200))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 10, 25))
  }

  const handleReset = () => {
    setZoom(100)
  }

  return (
    <div className="fixed bottom-6 right-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-3 border border-gray-200 dark:border-gray-700 flex items-center gap-3 z-50">
      <button
        onClick={handleZoomOut}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        title="Zoom out"
      >
        <LuZoomOut className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2">
        <input
          type="range"
          min="25"
          max="200"
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #023834 0%, #023834 ${((zoom - 25) / 175) * 100}%, #e5e7eb ${((zoom - 25) / 175) * 100}%, #e5e7eb 100%)`
          }}
        />
        <span className="text-sm font-medium w-12 text-center dark:text-gray-200">
          {zoom}%
        </span>
      </div>

      <button
        onClick={handleZoomIn}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        title="Zoom in"
      >
        <LuZoomIn className="w-5 h-5" />
      </button>

      <button
        onClick={handleReset}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors border-l border-gray-200 dark:border-gray-700 ml-1 pl-3"
        title="Reset zoom"
      >
        <MdOutlineRestartAlt className="w-5 h-5" />
      </button>
    </div>
  )
}

export default Zoom