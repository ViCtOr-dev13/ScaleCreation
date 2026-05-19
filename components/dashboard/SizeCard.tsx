"use client";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";

const SizeCard = ({
    backgroundColor,
    color,
    Icon,
    height,
    width,
    name,
}: {
    color: string;
    Icon: IconType;
    backgroundColor: string;
    height: number;
    width: number;
    name: string;
}) => {
    const size = `${width} x ${height}`;
return (
    <>
    <div className="P-4 rounded-full transition-all duration-300">
    <Icon className={cn("group-hover:animate-bounce")}/>
    </div>
    <p className="mt-4 text-base text-center">{name}</p>
    <p className="text-xs hidden group-hover:flex">{size}</p>
    </>
)
};

export default SizeCard;
