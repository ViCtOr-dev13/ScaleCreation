"use client"
import { Button } from "@/components/ui/button";
import { useState, lazy, Suspense, useEffect } from "react";
import SizeCard from "./SizeCard";
import { designTypes } from "@/type/types";
import { useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useNetworkStatus } from "@/store/useNetworkStatus";

// Import lazy des composants d'édition
const NewsletterEditor = lazy(() => import('@/components/editor/NewsletterEditor'));
const LinkedinEditor = lazy(() => import('@/components/editor/LinkedinEditor'));
const EmailEditor = lazy(() => import('@/components/editor/EmailEditor'));
const GeneratorEditor = lazy(() => import('@/components/editor/GeneratorEditor'));

const editorComponents: { [key: string]: React.ComponentType<any> } = {
  NewsletterEditor,
  LinkedinEditor,
  EmailEditor,
  GeneratorEditor,
};

const Sizes = () => {
  const { isAuthenticated } = useConvexAuth();
  const currentUser = useQuery(api.user.currentUser); // Adaptez selon votre API
  const [selectedEditor, setSelectedEditor] = useState<string | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const {isOnline} = useNetworkStatus();
  if (!isOnline) return null;
  const handleCardClick = (editorName: string) => {
    if (!isAuthenticated) {
      alert("Veuillez vous connecter pour créer un design");
      return;
    }
    
    setShowAnimation(false);
    setSelectedEditor(editorName);
    setAnimationKey(prev => prev + 1);
  };

  useEffect(() => {
    if (selectedEditor) {
      const timer = setTimeout(() => setShowAnimation(true), 50);
      return () => clearTimeout(timer);
    }
  }, [selectedEditor, animationKey]);

  const SelectedEditorComponent = selectedEditor ? editorComponents[selectedEditor] : null;

  return (
    <>
      <div className="sizes-grid">
        {designTypes.map((design, i) => {
          return (
            <Button 
              key={i}
              className="size-btn size-32 group"
              variant="ghost"
              onClick={() => handleCardClick(design.editor)}
            >
              <SizeCard
                name={design.label}
                backgroundColor="09f8b4"
                color={design.bgColor}
                Icon={design.icon}
                height={design.height}
                width={design.width}
              />
            </Button>
          );
        })}
      </div>
      
      {SelectedEditorComponent && currentUser && (
        <div className="mt-8 pt-8 " key={animationKey}>
          <div className="flex justify-center">
            <Suspense fallback={
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="mt-2">Chargement de l'éditeur...</p>
              </div>
            }>
              <div className={showAnimation ? "animate-slide-down" : "opacity-0"}>
                <SelectedEditorComponent userId={currentUser._id} />
              </div>
            </Suspense>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slideDown 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export default Sizes;