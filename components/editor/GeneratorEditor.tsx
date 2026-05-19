import { useState } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { useEditorSubmit } from "@/hooks/useEditorSubmit";

interface GeneratorEditorProps {
  userId?: string;
}

const GeneratorEditor = ({ userId = "default-user-id" }: GeneratorEditorProps) => {
  const { handleSubmit, isLoading } = useEditorSubmit();
  const [prompt, setPrompt] = useState("");
  const onLaunchCreation = async () => {
    // Vérifier qu'au moins un prompt ou une URL est fourni
    if (!prompt.trim()) {
      alert("Veuillez entrer un prompt");
      return;
    }

    try {
      await handleSubmit({
        designType: "GeneratorEditor",
        userId: userId,
        additionalData: {
          prompt: prompt.trim()
        }
      });
      
      // Succès - réinitialiser le formulaire
      setPrompt("");
      //alert("Newsletter créée avec succès!");
      
    } catch (error) {
      alert("Erreur lors de la création de l\'image");
    }
  };
  return (
        <div className="w-full xl:w-5xl root:bg-white rounded-3xl shadow-xl border-2 border-black dark:border-white p-12">
      <h1 className="text-3xl mb-12 text-center">
        Créer une image pour votre design
      </h1>
    <div className="mb-8">
        <label className="block mb-4 ml-1 text-lg font-medium text-gray-700">
          Entrer un prompt détaillé et démarrer la création
        </label>
        <textarea
          placeholder="Détaillé vos idées pour générer une image unique... , style, couleurs, ambiance, etc."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent h-32 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex justify-center">
        <button 
          onClick={onLaunchCreation}
          disabled={isLoading}
          className="bg-emerald-400 hover:bg-emerald-500 text-black font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Création en cours...
            </span>
          ) : (
            "Lancer la création"
          )}
        </button>
      </div>
    </div>
  )
}

export default GeneratorEditor
