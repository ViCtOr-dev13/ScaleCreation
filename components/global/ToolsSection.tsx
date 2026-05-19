import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ToolsSectionProps {
  Title: string | React.ReactNode;
  Description: string;
  VideoPath: string;
  onButtonClick?: () => void;
  reverse?: boolean;
}

const ToolsSection = ({
  Title,
  Description,
  VideoPath,
  onButtonClick,
  reverse = false
}: ToolsSectionProps) => {
  
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <section className={cn(
      "mt-30 flex flex-col sm:flex-row xl:gap-16 sm:gap-0 lg:px-4 py-8 xl:px-10",
      reverse ? "sm:flex-row-reverse" : ""
    )}>
      {/* Section vidéo */}
      <div className="flex-1 w-full lg:w-1/2 flex items-center justify-center">
        <video 
          src={VideoPath} 
          autoPlay 
          loop 
          muted 
          className="rounded-lg shadow-lg w-full max-w-md"
        />
      </div>

      {/* Section texte et bouton */}
      <div className="text-center flex-1 xl:w-3/4 lg:w-1/2 flex flex-col sm:ml-2 xl:ml-10">
        <h1 className="text-2xl lg:text-3xl xl:text-3xl font-bold leading-tight">
            
          {Title}
        </h1>
        <div className="xl:mx-40 lg:mx-20 sm:mx-10">
          <p className="mt-6 mb-8 text-base lg:text-lg leading-relaxed">
            {Description}
          </p>
        </div>
        <div className="justify-end align-bottom mt-4">
          <Button size={"lg"} onClick={handleClick}>
            Commencer
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;