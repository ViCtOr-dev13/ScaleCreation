"use client"
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/useApiMutation';
import { useNetworkStatus } from '@/store/useNetworkStatus';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';

const DesignInput = ({ name, id }: { id?: string; name?: string }) => {
  const [title, setTitle] = useState(name ?? "Sans titre")
  const { mutate, pending } = useApiMutation(api.design.UpdateDesignTitle)
  const { isOnline } = useNetworkStatus()
  
  // Mettre à jour le titre quand le prop name change
  useEffect(() => {
    if (name) {
      setTitle(name)
    }
  }, [name])
  
  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!id || !title.trim()) return;
    
    await mutate({ id, title: title.trim() })
      .then(() => toast.success("Titre du design mis à jour"))
      .catch(() => toast.error("Erreur lors de la mise à jour"))
  };

  const handleBlur = () => {
    if (title.trim() && title !== name) {
      handleSubmit();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-md"> 
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleBlur}
        disabled={pending || !isOnline}
        placeholder="Nom du design"
        className="border-none bg-transparent text-gray-900 dark:text-gray-100 font-medium text-lg focus-visible:ring-0 focus-visible:ring-offset-0 h-10 px-3"
      />
    </form>
  )
}

export default DesignInput