import { HoverCard, HoverCardContent, HoverCardPortal, HoverCardTrigger } from "@radix-ui/react-hover-card";

const HovercardGlobal = ({
    trigger,
    content,
    side ,
    use,
}: {
    trigger: React.ReactNode;
    content: React.ReactNode;
    side?: "left" | "top" | "right" | "bottom";
    use?: "sidebar"
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        {trigger}
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent
          side={side}
          sideOffset={5}
          forceMount
          className="z-[50] relative w-[330px]  bg-white dark:bg-zinc-900
          border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg p-4 "
        >
          {content}
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  )
}
export default HovercardGlobal
