import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import { FaCrown } from "react-icons/fa";

const PlanCard = (
    {
        PriceName,
        Description,
        price,
        url,
        storage,
        support,
        templates
    }: {
        PriceName: string;
        Description: string;
        price: string;
        url: string;
        storage: string;
        support: string;
        templates: string;
    }
) => {
    return (
        <div className={cn("flex flex-col justify-between p-5 rounded-lg xl:w-[300px] sm:w-[250px] text-black min-h-[400px]",
        PriceName === "Gratuit" ? "bg-gray-100":" bg-primary/10" )
        }>
            {/* Section supérieure */}
            <div className="space-y-6">
                <p className="xl:text-3xl sm:text-2xl xl:text-shadow-xs font-bold text-primary">
                    {PriceName}
                </p>
                <div className="flex justify-between items-center">
                    <span className="bg-white rounded-full sm:text-sm xl:text-base px-2 py-1">{price}</span>
                    {PriceName === "Gratuit" &&( 
                        <span className ="p-2.5 bg-white rounded-full">
                            <FaCrown className="text-yellow-500 size-4"/>
                        </span>
                    )}
                </div>
                

                
                <p className="sm:text-sm xl:text-base ">
                    {Description}
                </p>
                
                <div className="space-y-2">
                    <p className="sm:text-sm xl:text-base">• {storage}</p>
                    <p className="sm:text-sm xl:text-base">• {url} </p>
                    <p className="sm:text-sm xl:text-base">• {support}</p>
                    <p className="sm:text-sm xl:text-base">• {templates}</p>
                </div>
            </div>
            
            {/* Bouton toujours en bas */}
            <Button className="w-full text-white">
                {PriceName === "Gratuit" ? "Commencer":"14 jours gratuit"}
            </Button>
        </div>
    )
}

export default PlanCard