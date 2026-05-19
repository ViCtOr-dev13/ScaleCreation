import {create} from "zustand";

interface usePlansModalStore {
    isPlansModalOpen: boolean;
    openPlansModal : (isPlansModalOpen: boolean) => void;


}

export const usePlansModal = create<usePlansModalStore>((set) => ({
    isPlansModalOpen : false,
    openPlansModal : (isPlansModalOpen) => 
        set({isPlansModalOpen: isPlansModalOpen }),


}));

