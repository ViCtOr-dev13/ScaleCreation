"use client"

import { useState } from "react"
import { useMutation } from "convex/react";


export const useApiMutation = (mutationFunction: any) =>{
    const [pending, setPending] = useState(false);
    const ApiMutation = useMutation(mutationFunction);

    const mutate = async (args: any) => {
        setPending(true);
        try {
            const result = await ApiMutation(args);
            return result;
        } catch (error) {
            console.error("API Mutation Error:", error);
            throw error;
        } finally { 
            setPending(false);
        }
    };
    return {mutate, pending};
}