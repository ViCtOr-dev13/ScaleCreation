//import { DeleteImage } from "@/actions/deleteImage";
import HovercardHeader from "@/components/global/HovercardHeader";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useCanvas } from "@/store/useCanvas";
import { UploadButton } from "@/lib/uploadthing";
import Offline from "@/components/global/Offline";
import { ScrollArea } from "@/components/ui/scroll-area";

import Image from "next/image";
import { useQuery } from "convex/react";
import { useTransition } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import * as fabric from "fabric";
import { ImSpinner6 } from "react-icons/im";
import NoItems from "@/components/global/NoItems";
import { useNetworkStatus } from "@/store/useNetworkStatus";
import { deleteImage } from "@/actions/deleteImage";

const Uploads = () => {
  const { canvas } = useCanvas();
  const { isOnline } = useNetworkStatus();
  const [deletePending, startTransition] = useTransition();
  const userImages = useQuery(api.images.getUsersImages);
  const { mutate, pending } = useApiMutation(api.images.createImages);
  const { mutate: updateMutate, pending: updatePending } = useApiMutation(
    api.images.UpdateUserImages
  );
  // console.log(userImages?.images);
  if (!isOnline) {
    return <Offline />;
  }

  const handleUpload = async (images: string[]) => {
    // console.log("Images: ", images);
    if (!images || images.length === 0) {
      toast.error("No images uploaded");
      return;
    }
    if (userImages === null) {
      await mutate({
        images: images,
      });
    } else {
      await updateMutate({
        id: userImages?._id,
        images: [...(userImages?.images || []), ...images],
      });
    }
  };

  // delete image
  const handleDelete = async (img: string) => {
  startTransition(async () => {
    try {
      const deleteFile = await deleteImage([img]);
      if (deleteFile.success) {
        // CORRECTION: utiliser !== au lieu de ===
        const updatedImages = userImages?.images.filter((image) => image !== img);
        
        await updateMutate({
          id: userImages?._id,
          images: updatedImages,
        });
        toast.success("Image supprimée");
      } else {
        toast.error("Un problème est survenu");
      }
    } catch (error) {
      console.log(error);
      toast.error("Un problème est survenu");
    }
  });
};
  
    

  const addToCanvas = (image: string) => {
    fabric.FabricImage.fromURL(image, { crossOrigin: "anonymous" })
      .then((img) => {
        if (!canvas) return;

        // Dimensions de l'image AVANT scaling
        const imgWidth = img.width;
        const imgHeight = img.height;

        // ClipPath aux dimensions ORIGINALES de l'image
        const clipPath = new fabric.Rect({
          width: imgWidth,
          height: imgHeight,
          originX: "center",
          originY: "center",
        });

        // Configuration de l'image
        img.set({
          width: imgWidth,
          height: imgHeight,
          clipPath: clipPath,
          left: canvas.width / 2,
          top: canvas.height / 2,
          originX: "center",
          originY: "center",
        });

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      })
      .catch((e) => {
        console.error("Error loading image", e);
      });
  };

  return (
    <ScrollArea className="h-[70vh] space-y-2">
      <div className="flex flex-col w-full">
        <HovercardHeader title="Téléchargement"/>
        <div className="flex flex-col items-center justify-center w-full py-4">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const images = res?.map((file) => file.url);
            handleUpload(images);
            toast.success("Upload terminé avec succès");
          }}
          onUploadError={(error: Error) => {
            toast.error("Échec de l'upload");
            console.log(`ERROR! ${error.message}`);
          }}
          appearance={{
                button:
                  "bg-primary hover:bg-primary/90 ut-ready:bg-primary ut-uploading:cursor-not-allowed rounded-md bg-none after:bg-primary/20 w-[250px] items-center !text-white font-medium",
                container:
                  "flex flex-col items-center justify-center space-y-2 mt-2 rounded-md border-cyan-300 bg-slate-800 mb-4 px-4 py-3",
                allowedContent:
                  "flex h-8 flex-col items-center justify-center px-2 text-white",
              }}
              content={{
                button({ ready, isUploading }) {
                  if (isUploading) return <div>Uploading...</div>;
                  if (ready) return <div>Choisir des images</div>;
                  return <div>Chargement...</div>;
                },
              }}
          disabled={pending || updatePending}
        />
      </div>

        <HovercardHeader
          title="Images"
          
        />
        {userImages?.images.length === 0 && (
          <NoItems text="No Images to Show" />
        )}
        {userImages === undefined ? (
          <div className="flex justify-center items-center h-[40vh]">
            <ImSpinner6 className="size-10 animate-spin" />
          </div>
        ) : (
          <div className="image-grid">
            {userImages?.images.map((image) => (
              <div key={image} className="relative cursor-pointer hover:p-1">
                <img
                  src={image}
                  alt="image"
                  onClick={() => addToCanvas(image)}
                  className=" border dark:border-gray-500 rounded-sm"
                />
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(image)}
                  className="absolute top-2 right-2 size-6 hover:size-8"
                  disabled={pending || updatePending || deletePending}
                >
                  <MdDelete className="size-8" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default Uploads;