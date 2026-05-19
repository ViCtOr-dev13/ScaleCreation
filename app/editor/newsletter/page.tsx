"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const CreationPage = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [urls, setUrls] = useState("");
  const [instruction, setInstruction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [urlList, setUrlList] = useState<string[]>([]);

  const options = ["Newsletter", "LinkedIn Content", "Emailing"];

  const toggleOption = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = async () => {
    if (!instruction.trim()) {
      alert("Veuillez entrer une instruction");
      return;
    }

    if (selectedOptions.length === 0) {
      alert("Veuillez sélectionner au moins un type de contenu");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulation du traitement - à remplacer par vos appels API réels
      const newUrls = urls.split('\n').filter(url => url.trim() && !urlList.includes(url.trim()));
      setUrlList(prev => [...prev, ...newUrls]);

      // Ici vous intégrerez vos appels à vos agents IA
      console.log("Options sélectionnées:", selectedOptions);
      console.log("URLs:", newUrls);
      console.log("Instruction:", instruction);

      // Simulation d'une réponse JSON
      setTimeout(() => {
        const mockResponse = {
          newsletter: {
            title: "Votre newsletter générée",
            content: "Contenu généré par l'IA basé sur vos sources...",
            sections: ["Introduction", "Développement", "Conclusion"]
          }
        };
        setGeneratedContent(mockResponse);
        setIsLoading(false);
      }, 2000);

    } catch (error) {
      console.error("Erreur:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Créateur de Contenu IA
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transformez vos sources en contenu percutant pour tous vos canaux
          </p>
        </div>

        <div className="grid gap-8">
          {/* Sélection des types de contenu */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Sélectionnez le type de contenu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {options.map(option => (
                  <Badge
                    key={option}
                    variant={selectedOptions.includes(option) ? "default" : "outline"}
                    className={`px-4 py-2 text-sm font-medium cursor-pointer transition-all ${
                      selectedOptions.includes(option)
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                    }`}
                    onClick={() => toggleOption(option)}
                  >
                    {option}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* URLs */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Sources (URLs)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Entrez vos URLs, une par ligne..."
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                className="min-h-[150px] resize-none border-gray-300 focus:border-primary"
              />
              {urlList.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    URLs analysées ({urlList.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {urlList.map((url, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {url}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Instruction */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Décrivez votre besoin en détail..."
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                className="border-gray-300 focus:border-primary"
              />
            </CardContent>
          </Card>

          {/* Bouton de soumission */}
          <div className="text-center">
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !instruction.trim() || selectedOptions.length === 0}
              size="lg"
              className="px-8 py-3 text-lg font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Génération en cours...
                </div>
              ) : (
                "Générer le contenu"
              )}
            </Button>
          </div>

          {/* Résultat généré */}
          {generatedContent && (
            <Card className="shadow-lg border-0 bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-green-800">
                  ✅ Contenu généré avec succès
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-white p-4 rounded-lg border border-green-300 overflow-x-auto">
                  {JSON.stringify(generatedContent, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            L'IA analysera vos URLs, synthétisera le contenu et générera du contenu 
            adapté à vos besoins en respectant votre style et vos objectifs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreationPage;