import { create } from "zustand";
import * as fabric from "fabric";

interface ActiveElementStoreProps {
    activeElement:
        | (fabric.Object & {
              rx?: number; // Make rx optional
              ry?: number; // Make ry optional
          } & fabric.ITextProps)
        | null
        | undefined;
    setActiveElement: (
        activeElement:
            | (fabric.Object & {
                  rx?: number; // Make rx optional
                  ry?: number; // Make ry optional
              } & fabric.ITextProps)
            | null
            | undefined
    ) => void;
    activeElements:
        | (fabric.Object & {
              rx?: number; // Make rx optional
              ry?: number; // Make ry optional
          } & fabric.ITextProps)[]
        | null
        | undefined;
    setActiveElements: (
        activeElements:
            | (fabric.Object & {
                  rx?: number; // Make rx optional
                  ry?: number; // Make ry optional
              } & fabric.ITextProps)[]
            | null
            | undefined
    ) => void;
}

export const useActiveElement = create<ActiveElementStoreProps>((set) => ({
    activeElement: null,
    setActiveElement: (activeElement) => set({ activeElement }),
    activeElements: null,
    setActiveElements: (activeElements) => set({ activeElements }),
}));