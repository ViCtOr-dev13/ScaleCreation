"use client";
import { useState, useEffect } from "react";
import LoginModal from "@/components/modals/LoginModal";
import PlansModal from "@/components/modals/PlansModal";
const Modals = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    if (!isMounted) {
        return null; 
    }
  return( <>
  <LoginModal/>
  <PlansModal/>
  </>);
}

export default Modals
