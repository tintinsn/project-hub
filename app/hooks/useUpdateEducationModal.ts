import { Education } from "@/types";
import { create } from "zustand";

interface UpdateEducationModalStore {
  isOpen: boolean;
  currentEducation: Education | null;
  onOpen: (education: Education) => void;
  onClose: () => void;
}

const useUpdateEducationModal = create<UpdateEducationModalStore>((set) => ({
  isOpen: false,
  currentEducation: null,
  onOpen: (education) => set({ isOpen: true, currentEducation: education }),
  onClose: () => set({ isOpen: false, currentEducation: null }),
}));

export default useUpdateEducationModal;
