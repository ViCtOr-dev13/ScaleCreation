"use client"

import { useNetworkStatus } from "@/store/useNetworkStatus";
import {useEffect, useState} from "react";
import {IoCloudOfflineOutline} from "react-icons/io5"

const NetworkStatus = () => {
    const {isOnline, setIsOnline}= useNetworkStatus();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() =>{
        setIsMounted(true);

        setIsOnline(navigator.onLine);
        const handleOnline= () => {
            setIsOnline(true);
        }
        const handleOffline = () => {
            setIsOnline(false);
        }
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOnline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOnline);

        }
    },[]);
    if (!isMounted) return null;
    if (!isOnline){
        return (
    <div className= "flex justify-center items-center">
      
      <div className = "network-div">
        <div className = "ml-3 text-sm font-normal flex items-center">
            {!isOnline &&
            <>
            <IoCloudOfflineOutline className="mr-2 size-4"/>
            You are offline
            </>

            }

        </div>

      </div>
    </div>
    )
    }       
    }
  

export default NetworkStatus
