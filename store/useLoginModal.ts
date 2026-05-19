import {create} from "zustand";

interface LoginModalStore {
    isLoginModalOpen: boolean;
    openLoginModal : (isLoginModalOpen: boolean) => void;


}

export const useLoginModal = create<LoginModalStore>((set) => ({
    isLoginModalOpen : false,
    openLoginModal : (isLoginModalOpen) => 
        set({isLoginModalOpen: isLoginModalOpen }),


}));

