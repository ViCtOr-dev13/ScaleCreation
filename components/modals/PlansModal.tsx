import { Dialog, DialogContent,DialogTitle } from "../ui/dialog";
import Plans from "@/components/home/Plans";
import { usePlansModal } from "@/store/usePlansModal";

const PlansModal = () => {
    const {isPlansModalOpen, openPlansModal} = usePlansModal();
    if (isPlansModalOpen) {
        return (
        <Dialog onOpenChange={openPlansModal} open={isPlansModalOpen}>
    <DialogContent className="sm:max-w-5xl overflow-y-auto border-none">
        <DialogTitle></DialogTitle>
        <Plans />
        </DialogContent>
        </Dialog>
  );
    }
  
}

export default PlansModal
