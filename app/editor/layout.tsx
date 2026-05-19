"use client";

import { useState, useEffect } from "react";
import Header from "@/components/navigation/Header"

const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Ajoute l'ombre après 10px de scroll
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Nettoyage
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Header className={isScrolled ? "shadow-xl" : ""} />
      {children}
    </div>
  )
}

export default EditorLayout