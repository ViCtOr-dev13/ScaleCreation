"use client";

import ToolsSection from "../global/ToolsSection";
import { useCurrentUser } from "@/fetch/useCurrentUser";
import { useLoginModal } from "@/store/useLoginModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Custom hook simplifié
const usePendingRedirect = () => {
  const setPending = () => sessionStorage.setItem('pendingRedirect', 'true');
  const getPending = () => sessionStorage.getItem('pendingRedirect') === 'true';
  const clearPending = () => sessionStorage.removeItem('pendingRedirect');
  
  return { setPending, getPending, clearPending };
};

const Tools = () => {
  const data = useCurrentUser();
  const { openLoginModal, isLoginModalOpen } = useLoginModal();
  const router = useRouter();
  const { setPending, getPending, clearPending } = usePendingRedirect();

  // Redirection automatique après connexion
  useEffect(() => {
    if (getPending() && data && !isLoginModalOpen) {
      clearPending();
      router.push("/dashboard");
    }
  }, [data, isLoginModalOpen, router]);

  const handleClick = () => {
    if (data) {
      router.push("/dashboard");
    } else {
      setPending();
      openLoginModal(true);
    }
  }

  const sections = [
    {
      Title: (
      <>
        Générez votre newsletter<br/>
        en quelques clics
      </>
    ),
      Description: "Tenez votre clientèle informée grâce à une newsletter professionnelle. Partez d'une simple idée, importez vos documents et pages web, et notre IA s'occupe de synthétiser et rédiger le contenu le plus pertinent.",
      VideoPath: "/videos/Newletters_tools.mp4"
    },
    {
        Title: (
      <>
        Publiez des posts LinkedIn<br/>
        qui engagent
      </>
    ),
      Description: "Développez votre influence et captivez votre audience avec des posts sur-mesure. Notre IA puise dans vos sources pour générer des contenus pertinents qui stimulent les interactions et renforcent votre présence.",
      VideoPath: "/videos/linlkedin.mp4"
    },
    {
        Title: (
      <>
        Lancez des campagnes e-mail<br/>
        qui convertissent
      </>
    ),
      Description: "Automatisez votre communication. Transformez vos sources en campagnes e-mail claires et efficaces. L'IA rédige le contenu adapté à chaque étape du parcours client, vous permettant de vous concentrer sur la stratégie.",
      VideoPath: "/videos/emailing.mp4"
    }
  ];

  return (
    <div className="flex flex-col justify-center items-center space-y-10">
      <section className="text-center">
        <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold leading-tight">
          <span className="hero-text">Commencer maintenant</span>
        </h1>
      </section>
      
      <div className="mt-6 xl:w-120 sm:w-100 h-1 mx-auto bg-black rounded-full"></div>

      {sections.map((section, index) => (
        <ToolsSection
          key={index}
          Title={section.Title}
          Description={section.Description}
          VideoPath={section.VideoPath}
          onButtonClick={handleClick}
          reverse={index % 2 !== 0} // Alternance automatique
        />
      ))}
    </div>
  );
};

export default Tools;