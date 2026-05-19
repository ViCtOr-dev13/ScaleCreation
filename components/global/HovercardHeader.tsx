const HovercardHeader = ({title, description}: {title: string; description?: string}) => {
  const hasDescription = description && description.trim().length > 0;

  return (
    <div className={`border-b border-zinc-700  dark:border-gray-400 ${hasDescription ? 'space-y-1 h-[50px] mb-2' : 'mb-2'}`}>
      <p className="text-sm">
        {title}
      </p>
      {hasDescription && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

export default HovercardHeader