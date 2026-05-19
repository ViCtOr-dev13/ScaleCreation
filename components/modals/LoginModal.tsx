
import { useAuthActions } from "@convex-dev/auth/react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { useState } from "react";
import { useLoginModal } from "@/store/useLoginModal";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {Button} from "@/components/ui/button"
import { useNetworkStatus } from "@/store/useNetworkStatus";

const LoginModal = () => {
    const {isLoginModalOpen, openLoginModal} = useLoginModal();
    const [loading,setLoading] = useState(false)
    const { signIn} = useAuthActions();
    const {isOnline}= useNetworkStatus();
    

    const onProviderSignUp = async (provider: "github" | "google") => {
        setLoading(true)
        await signIn(provider, { redirectTo: "/" }).then((res) =>{
            setLoading(false)
        }).catch((error) => {
            setLoading(false);
            console.log(error);
        })


    }
  if (isLoginModalOpen){
    return (
    <Dialog open = {isLoginModalOpen} onOpenChange = {openLoginModal}>
    <DialogContent className="flex p-0 border-none md:max-w-lg lg:max-w-4xl rounded-lg">
        <div className="p-4 lg:p-6">
           <DialogTitle className="text-xl"> 
            Login ou Sign up
            </DialogTitle>
            <p className="text-muted-foreground mt-4">
                Entrer votre email ou choisir un autre mode de connexion pour continuer
            </p>
            <div className="w-full space-x-4 mt-6">
            <Button
            className="w-full space-y-4 mt-6"
            variant = {"outline"}
            onClick={() => {onProviderSignUp("google")}}
            disabled= {loading || !isOnline}
            >

            <FcGoogle className = "size-5"/>
            
                Google
            </Button>
                        <Button
            className="w-full space-y-4 mt-6"
            variant = {"outline"}
            onClick={() => onProviderSignUp("github")}
            disabled= {loading || !isOnline}
            >

            <FaGithub className = "size-5"/>
            
                Github
            </Button>
                        <Button
            className="w-full space-y-4 mt-6"
            variant = {"outline"}
            onClick={() => {} }
            >

            <MdOutlineMail className = "size-5"/>
                Email
            </Button>

            
        </div>  
        </div>
        <div>
        <Image
        src="/auth_dialog_canva.jpg"
        alt="auth_dialog_canva"
        height = {400}
        width = {400}
        className="hidden md:flex rounded-r-md"
         />        
        </div>

    </DialogContent>
    
    </Dialog>
  )}
}

export default LoginModal
