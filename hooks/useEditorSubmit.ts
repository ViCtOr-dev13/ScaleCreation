import { useState } from 'react';
import { useApiMutation } from './useApiMutation';
import { api } from '@/convex/_generated/api';
import { designTypes } from '@/type/types';
import { useRouter } from 'next/navigation';
import * as fabric from 'fabric';
import { The_Nautigal } from 'next/font/google';

interface EditorSubmitData {
  designType: string; // Le type de design (newsletter, email, etc.)
  userId: string;
  additionalData?: any; // Données supplémentaires de l'éditeur (urls, prompt, etc.)
}

export const useEditorSubmit = () => {
  const { mutate, pending } = useApiMutation(api.design.createDesign);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: EditorSubmitData) => {
    setIsLoading(true);
    
    try {
      console.log("Données soumises:", data);
      
      // Trouver le design correspondant dans designTypes
      const designConfig = designTypes.find(
        design => design.editor === data.designType || design.label === data.designType
      );

      if (!designConfig) {
        throw new Error(`Type de design non trouvé: ${data.designType}`);
      }

      // Créer le design
      const result = await mutate({
        category: designConfig.label, 
        title: "Design sans nom",
        json: JSON.stringify({
          version: fabric.version,
          objects: [],
          background: "white",
        }),
        height: designConfig.height,
        width: designConfig.width,
        isPro: false,
        isPublished: false,
      }).then((id) => {
        // Rediriger vers la page d'édition du design nouvellement créé
        router.push(`/design/${id}/`);
      }).catch ((error) => {
        console.error("Erreur lors de la mutation de création de design:", error);
        throw error;
        });

      
    } catch (error) {
      console.error("Erreur lors de la création du design:", error);
      throw error;
      
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading: isLoading || pending };
};