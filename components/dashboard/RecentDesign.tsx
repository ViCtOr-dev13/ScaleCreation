"use client"
import { ImSpinner6 } from "react-icons/im";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useNetworkStatus } from "@/store/useNetworkStatus";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import NoItems from "@/components/global/NoItems";
import Link from "next/link";
import Moment from "react-moment"
import { toast } from "sonner";
import { X } from "lucide-react";
const RecentDesign = () => {
    const { isOnline } = useNetworkStatus();
    const designs = useQuery(api.design.getUsersDesigns)
    const { mutate, pending } = useApiMutation(api.design.DeleteDesign);
    
    if (!isOnline) return null

    const HandleDelete = async (id: string) => {
        await mutate({
            id
        }).then((res) => {
            console.log(res)
            toast.success("Design Deleted")
        }).catch((error) => {
            console.log(error);
            toast.error("ERROR")
        })
    }

    // Grouper les designs par catégorie
    const groupedDesigns = designs?.reduce((acc, design) => {
        const category = design.category || "Sans catégorie";
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(design);
        return acc;
    }, {} as Record<string, typeof designs>);

    return (
        <div className="space-y-8 pt-10">
            <h1 className="text-2xl text-primary font-bold dark:text-white">
                Vos Designs 
            </h1>
            
            {designs?.length === 0 && <NoItems text="Des possibilités t'attendent !"/>}
            
            {designs === undefined ? (
                <div className="flex justify-center items-center h-[40vh]">
                    <ImSpinner6 className="size-10 animate-spin"/>
                </div>
            ) : (
                <>
                    {Object.entries(groupedDesigns || {}).map(([category, categoryDesigns]) => (
                        <div key={category} className="space-y-4">
                            <h2 className="text-xl font-semibold capitalize">
                                {category}
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {categoryDesigns.map((design) => (
                                    <div 
                                        key={design._id}
                                        className="group relative bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                    >
                                        <Link 
                                            href={`/design/${design._id}`}
                                            className="block"
                                        >
                                            <div className="relative aspect-video bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                                                {design.thumbnail ? (
                                                    <img 
                                                        src={design.thumbnail}
                                                        alt={design.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-xl font-bold text-black">
                                                        {category}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <div className="p-4 space-y-2">
                                                <h3 className="font-semibold text-lg truncate">
                                                    {design.title}
                                                </h3>
                                                
                                                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                                                    <Moment fromNow>
                                                        {design._creationTime}
                                                    </Moment>
                                                    <span>
                                                        {design.width} x {design.height}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                        
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                disabled={pending}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    HandleDelete(design._id);
                                                }}
                                                className="bg-red-500 hover:bg-red-600 text-white"
                                            >
                                                <X className="w-4 h-4 cursor-pointer"/> 
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default RecentDesign;