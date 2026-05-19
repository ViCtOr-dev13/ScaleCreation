"use client"
import { useNetworkStatus } from "@/store/useNetworkStatus"
import Image from "next/image";
const Offline = () => {
const { isOnline } = useNetworkStatus();
    if (!isOnline) {
        return (
            <div className="flex flex-col justify-center items-center z-[120]">
                <Image
                src={"/offline.png"}
                alt="offline-png"
                height={300}
                width={300}
                />
                <p className="font-bold">Vous êtes déconnecté</p>
                <p className="text-muted-foreground">
                Connectez vous à internet pour accéder à toutes les fonctionnalités. 
                </p>
            </div>
        );
   
    }
};
export default Offline;
