"use client";

import Image  from "next/image";
import Link from "next/link";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { ImSpinner, ImSpinner6 } from "react-icons/im";
import {Button} from "@/components/ui/button";
import { useLoginModal } from "@/store/useLoginModal";
import UserButton from "@/components/global/UserButton";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const {openLoginModal} = useLoginModal()
  return (
    <div className={`header sticky top-0 z-50 bg-white transition-shadow duration-300 ${className || ""}`}>
      <Link  className="ml-6"   href={"/"}> 
      <Image
        src={"/logo.png"}
        alt = "Logo"
        width ={100}
        height ={100}
        className="size-auto"
        />
      </Link>
      <div className="flex gap-2 items-center mr-6">
        <AuthLoading>
          <ImSpinner className="animate-spin size-7" />
        </AuthLoading>
        <Unauthenticated>
          <Button onClick={() => openLoginModal(true)} variant={"outline"}>
            Login
          </Button>
          <Button onClick={() => openLoginModal(true)}>
            Sign up
          </Button>
        </Unauthenticated>
        <Authenticated>
          <UserButton />
        </Authenticated>
      </div>
    </div>
  )
}

export default Header