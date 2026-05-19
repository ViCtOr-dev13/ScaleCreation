import {create} from "zustand";

interface useNetworkStatusStore {
    isOnline: boolean;
    setIsOnline : (isOnline: boolean) => void;


}

export const useNetworkStatus = create<useNetworkStatusStore>((set) => ({
    isOnline : true,
    setIsOnline : (isOnline) => 
        set({isOnline: isOnline }),


}));

