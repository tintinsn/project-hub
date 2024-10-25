import { create } from "zustand";
import { Project } from "@/types";

interface UpdateModalStore {
  isOpen: boolean;
  currentProject: Project | null;
  onOpen: (project: Project) => void;
  onClose: () => void;
}

const useUpdateModal = create<UpdateModalStore>((set) => ({
  isOpen: false,
  currentProject: null,
  onOpen: (project) => set({ isOpen: true, currentProject: project }),
  onClose: () => set({ isOpen: false, currentProject: null }),
}));

export default useUpdateModal;
