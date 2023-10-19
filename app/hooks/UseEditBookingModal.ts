import { create } from "zustand";

interface EditBookingModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditBookingModal = create<EditBookingModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditBookingModal;
