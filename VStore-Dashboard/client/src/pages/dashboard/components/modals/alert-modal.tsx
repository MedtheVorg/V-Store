import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

type AlertModelProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  title: string;
  description: string;
};

export default function AlertModel({
  isOpen,
  loading,
  onClose,
  onConfirm,
  title,
  description,
}: AlertModelProps) {
  return (
    <Modal
      title={title}
      description={description}
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant={'outline'} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant={'destructive'} onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
}
