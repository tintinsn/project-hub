import { Experience } from "@/types";
import { create } from "zustand";

interface UpdateExperienceModalStore {
  isOpen: boolean;
  currentExperience: Experience | null;
  onOpen: (experience: Experience) => void;
  onClose: () => void;
}

const useUpdateExperienceModal = create<UpdateExperienceModalStore>((set) => ({
  isOpen: false,
  currentExperience: null,
  onOpen: (experience) => set({ isOpen: true, currentExperience: experience }),
  onClose: () => set({ isOpen: false, currentExperience: null }),
}));

export default useUpdateExperienceModal;
