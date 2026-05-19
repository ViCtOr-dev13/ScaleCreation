"use client";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/fetch/useCurrentUser";
import { useLoginModal } from "@/store/useLoginModal";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const usePendingRedirect = () => {
  const setPending = () => sessionStorage.setItem('pendingRedirect', 'true');
  const getPending = () => sessionStorage.getItem('pendingRedirect') === 'true';
  const clearPending = () => sessionStorage.removeItem('pendingRedirect');
  
  return { setPending, getPending, clearPending };
};
const Hero = () => {
  const data = useCurrentUser();
  const { openLoginModal, isLoginModalOpen } = useLoginModal();
  const router = useRouter();
  const { setPending, getPending, clearPending } = usePendingRedirect();

  // Redirection automatique après connexion
  useEffect(() => {
    if (getPending() && data && !isLoginModalOpen) {
      clearPending();
      router.push("/dashboard");
    }
  }, [data, isLoginModalOpen, router]);

  const handleClick = () => {
    if (data) {
      router.push("/dashboard");
    } else {
      setPending();
      openLoginModal(true);
    }
  }
    
  return (    
    
    <div className="flex flex-col justify-center items-center space-y-8 p-4 ">
      <div className="flex flex-col justify-center items-center space-y-8">
      <h1 className="text-4xl lg:text-6xl font-bold text-center">
        Qu'allez-vous{" "}
        <span className="hero-text">créer</span>{" "}
        aujourd'hui ?
      </h1>
      <p className="text-muted-foreground font-semibold text-center max-w-2xl">
        Notre IA transforme vos idées en contenu percutant pour tous vos canaux.
      </p>
      </div>
      
      <Button size={"lg"} onClick={handleClick}>
        Commencer
      </Button>
    </div> 
  );
}

export default Hero;