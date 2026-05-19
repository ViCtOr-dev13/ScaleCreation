import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
DropdownMenu,
DropdownMenuCheckboxItem,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuLabel,
DropdownMenuPortal,
DropdownMenuSeparator,
DropdownMenuSub,
DropdownMenuSubContent,
DropdownMenuSubTrigger,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/fetch/useCurrentUser";
import { usePlansModal } from "@/store/usePlansModal";
import { useAuthActions } from "@convex-dev/auth/react";
import {useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { MdLogout, MdOutlinePriceCheck } from "react-icons/md";
const UserButton = () => {
    const{theme, setTheme} = useTheme();
    const user = useCurrentUser();
    const {signOut} = useAuthActions();
    const router = useRouter();
    const {openPlansModal} = usePlansModal();

    const handleSignOut = async () => {
        signOut();
        router.push("/");
    };
  return (
    <DropdownMenu>
    <DropdownMenuTrigger>
    <Avatar className="size-12 rounded-lg cursor-pointer">
    <AvatarImage src={user?. image} alt="User Avatar" />
    <AvatarFallback>{user?. name?.charAt(0)}</AvatarFallback>
    </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-40 dark: bg-background z-70 border-none" >
        <DropdownMenuSub>
        <DropdownMenuSubTrigger>
            {theme === "light" ? ( <IoSunnyOutline className="mr-2"/>) :
             (<FaMoon className="size-5"/> )}
            <span className="capitalize">{theme}</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-40 bg-background border-none z-70">
                <DropdownMenuLabel>
                    Thème
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuCheckboxItem
                checked={theme === "light"}
                onCheckedChange={() => setTheme("light")}
                >
                    Light
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                checked={theme === "dark"}
                onCheckedChange={() => setTheme("dark")}
                >
                    Dark
                </DropdownMenuCheckboxItem>
 
            </DropdownMenuSubContent>
                

        </DropdownMenuPortal>

        </DropdownMenuSub>
        <DropdownMenuItem onClick={() => openPlansModal(true)}>
            <MdOutlinePriceCheck />
            Plans
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut} className="mr-2">
            <MdLogout/>
            Sign Out
        </DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
    )
}

export default UserButton
