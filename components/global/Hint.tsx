import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip"

export interface hintProps {
    label: string; 
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right"
    align?: "start" | "center" | "end"; 
    sideOffset?: number;
    alignOffset?: number; 
}

const Hint = ({
    label,
    children,
    side,
    align,
    sideOffset,
    alignOffset,
}: hintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                    className="bg-gray-100 border-gray-200 shadow-lg"
                >
                    <p className="text-white dark:text-gray-900 font-medium text-sm capitalize">
                        {label}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default Hint