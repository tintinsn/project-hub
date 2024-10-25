import { create } from "zustand";

interface useUpdateUserInfoModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUpdateUserInfoModal = create<useUpdateUserInfoModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUpdateUserInfoModal;
