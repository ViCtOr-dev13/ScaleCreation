import { useState } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { useEditorSubmit } from "@/hooks/useEditorSubmit";

interface EmailEditorProps {
  userId?: string;
}
const EmailEditor = ({ userId = "default-user-id" }: EmailEditorProps) => {
  const { handleSubmit, isLoading } = useEditorSubmit();
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState<{ url: string; status: "accepted" | "rejected" | "pending" }[]>([]);
  const [prompt, setPrompt] = useState("");

  // Fonction aléatoire qui "accepte" ou "refuse" une URL
  const analyzeUrl = (urlToAnalyze: string) => {
    const newUrl = { url: urlToAnalyze, status: "pending" as const };
    setUrls([...urls, newUrl]);
    setUrl("");

    setTimeout(() => {
      const result = Math.random() > 0.5 ? "accepted" : "rejected";
      setUrls((prev) =>
        prev.map((u) =>
          u.url === urlToAnalyze ? { ...u, status: result as "accepted" | "rejected" } : u
        )
      );
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && url.trim() !== "") {
      analyzeUrl(url.trim());
    }
  };

  const removeUrl = (urlToRemove: string) => {
    setUrls(urls.filter((u) => u.url !== urlToRemove));
  };
  const onLaunchCreation = async () => {
    // Vérifier qu'au moins un prompt ou une URL est fourni
    if (!prompt.trim() && urls.length === 0) {
      alert("Veuillez entrer un prompt ou ajouter au moins une URL");
      return;
    }

    try {
      await handleSubmit({
        designType: "EmailEditor",
        userId: userId,
        additionalData: {
          urls: urls.filter(u => u.status === "accepted").map(u => u.url),
          prompt: prompt.trim()
        }
      });
      
      // Succès - réinitialiser le formulaire
      setUrls([]);
      setPrompt("");
      //alert("Newsletter créée avec succès!");
      
    } catch (error) {
      alert("Erreur lors de la création de l\'email");
    }
  };
  return (
      <div className="w-full xl:w-5xl root:bg-white  rounded-3xl shadow-xl border-2 border-black dark:border-white p-12">
        <h1 className="text-3xl mb-12 text-center">
          Personnaliser vos campagnes d'email ici
        </h1>

        <div className="mb-8">
          <label className="block mb-4 text-lg font-medium secondary-text">
            Coller les pages web d'inspiration
          </label>
          <input
            type="text"
            placeholder="https://...."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          />

          <div className="flex flex-wrap gap-3 mt-4">
            {urls.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                  item.status === "accepted"
                    ? "bg-emerald-100 text-emerald-700"
                    : item.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <span className="truncate max-w-[150px]">{item.url}</span>
                {item.status === "accepted" && <Check className="w-4 h-4" />}
                {item.status === "rejected" && (
                  <X className="w-4 h-4 cursor-pointer" onClick={() => removeUrl(item.url)} />
                )}
                {item.status === "pending" && <Loader2 className="w-4 h-4 animate-spin" />}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="block mb-4 text-lg font-medium text-gray-700">
            Entrer un prompt détaillé et démarrer la création
          </label>
          <textarea
            placeholder={`Créer un email pour présenter mes services, avertir de la vente d'un produit, ou toute autre demande.
Détaillé les avantages, le ton à employer, ajouter des blagues ou rester formelle.`}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent h-32 resize-none"
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

  );
};

export default EmailEditor;