import Image from "next/image";

const Banner = () => {
  return (
    <div className="dashboard-banner">
      <div className="text-center space-y-6 w-full max-w-4xl mx-auto px-4">
        <div className="text-3xl font-bold lg:text-4xl flex flex-col sm:flex-row items-center justify-center gap-4">
          <Image
            src="/favicon.ico"
            alt="favicon"
            width={100}
            height={100}
            className="size-16 animate-bounce"
          />
          Bienvenue sur votre tableau de bord
        </div>
      </div>
    </div>
  )
}

export default Banner