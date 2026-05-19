"use client";
import HomeVideo from "@/components/home/video";
import Demo from "@/videos/demo.mp4";
import Tools from "@/components/home/Tools";
import ForWho from "./ForWho";


const Content = () => {

  return (
    <div className="w-full">

      {/* Section du titre principal */}
      <section className=" ml-20 ">
        <h1 className="text-3xl lg:text-4xl xl:text-4xl  font-bold leading-tight">
          Créez du <span className="hero-text">contenu unique</span> en quelques secondes
        </h1>
      </section>

      {/* Section horizontale texte / vidéo */}
      <section className="mt-4 flex flex-col sm:flex-row xl:gap-8 sm:gap-0 lg:px-4 py-8 xl:px-10">
        
        {/* Texte à gauche */}
        <div className="flex-1 w-2/3 lg:w-1/2 flex flex-col sm:ml-2 xl:ml-10">
        <div className="justify-start">
          <p className="mb-4 mt-6 text-base xl:text-lg sm:text-xs leading-relaxed ">
            Alimentez votre IA avec <span className="font-bold">les pages web </span> qui définissent votre entreprise.<br/>
            Elle s'en imprègne pour <span className="font-bold">générer un contenu</span> parfaitement aligné <br/>
            avec votre identité et vos objectifs. Libérez-vous des tâches <br/>
            chronophages et <span className="font-bold">créez plus vite que jamais</span>.
            </p>
        </div>
        <div className="justify-end">
            <p className="mb-4 mt-6 text-base xl:text-lg sm:text-xs leading-relaxed ">
            Choisissez votre canal : <span className="font-bold">Newsletter, Post LinkedIn ou Campagne e-mail.</span> <br/>
            Soumettez une instruction détaillée. Notre IA agit comme un <span className="font-bold">assistant de création de contenu </span> : 
            elle recherche, synthétise et rédige pour vous. Vous recevez un premier rendu, <br/>
            mais <span className="font-bold">vous gardez le contrôle final </span>pour modifier et enrichir.

            </p>

        </div>
        </div>

        {/* Vidéo à droite */}
        <div className="flex-1 w-1/3 lg:w-1/2  flex items-center justify-center ">
          <div className="w-full lg:w-2/3 sm:w-11/12 xl:w-2/3 aspect-video">
            <HomeVideo src={Demo} />
          </div>
        </div>
      
      </section>
      <ForWho/>
      <section className=" text-center mt-30 ">
      <Tools />
      </section>
    

    </div>
  )
}

export default Content;