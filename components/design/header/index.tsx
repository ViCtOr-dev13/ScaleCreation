import Image  from "next/image";

import { useNetworkStatus } from "@/store/useNetworkStatus";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MdRedo, MdUndo } from "react-icons/md";
import { Authenticated, AuthLoading, useQuery } from "convex/react";
import { ImSpinner } from "react-icons/im";
import UserButton from "@/components/global/UserButton";
import DesignInput from "./DesignInput";
import { designProps } from "@/type/index"; // Importez le type
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";

const Header = ({design}: {design: designProps | undefined}) => {
    const { isOnline } = useNetworkStatus();

    return (
        <div className="header">
            <div className="flex text-center gap-4 items-center">
                <Link href={"/"}>
                    <Image
                        src={"/logo.png"}
                        alt="logo"
                        height={80}
                        width={80}
                        className="size-auto"
                    />
                </Link>

                <Button
                    variant={"ghost"}
                    size={"icon"}
                    disabled={!isOnline}
                    onClick={() => {}}
                    className="text-white"
                >
                    <MdUndo className="size-5" />
                </Button>
                <Button
                variant={"ghost"}
                size={"icon"}
                disabled={!isOnline}
                onClick={() => {}}
                className="text-white"
                >
                    <MdRedo className="size-5" />
                </Button>

            </div>
            <div className="flex gap-4 items-center">
                <DesignInput name= {design?.title} id={design?._id}/>
                <Button>
                    Exporter
                </Button>
                
                <AuthLoading>
                    <ImSpinner className="size-6 animate-spin"/>
                </AuthLoading>
                <Authenticated>
                    <UserButton/>
                </Authenticated>
            </div>
        </div>
    );
}

export default Header
