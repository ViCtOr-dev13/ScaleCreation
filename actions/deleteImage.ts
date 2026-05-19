"use server";

import { UTApi } from "uploadthing/server";

export const deleteImage = async(image:string[]) => {
    const utApi = new UTApi()
    const UUID = image.map((image) => image.split("/").pop() || "");
try {
    const deleteImages  = await utApi.deleteFiles(UUID)
    return{
        success: true,
        message: "Images deleted successfully",
        data: JSON.parse(JSON.stringify(deleteImages)),
    };
} catch (error) {
    console.log("Error deleting images", error);
    return {
        success: false, 
    }
}

    
}