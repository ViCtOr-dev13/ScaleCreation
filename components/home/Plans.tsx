import PlanCard from "@/components/global/PlanCard";

const Plans = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-10">
      <h1 className="text-2xl xl:text-3xl font-bold text-center">
        Choisir en fonction de vos besoins
      </h1>
      <div className="flex flex-col md:flex-row gap-10 items-stretch">
        <PlanCard
          PriceName="Gratuit"
          Description="Parfait pour tester les outils et créer des design simples."
          price="0 euros/mois"
          url = " 1 page web connectée"
          storage="1 GB Storage"
          support="Email Support"
          templates="Access to all Templates"
        />
        <PlanCard
          PriceName="Pro"
          Description="Idéal pour les professionnels et les petites équipes."
          price="9.99 euros/mois"
          url = " 3 pages web connectées"
          storage="10 GB Storage"
          support="Priority Email Support"
          templates="Access to all Templates + Premium Templates"
        />
        <PlanCard
          PriceName="Business"
          Description="Conçu pour les entreprises ayant des besoins avancés."
          price="29.99 euros/mois"
          url = " Pages web connectées illimitées"
          storage="100 GB Storage"
          support="24/7 Phone & Email Support"
          templates="All Pro Features + Business Templates"
        />
      </div>
    </div>
  )
}

export default Plans