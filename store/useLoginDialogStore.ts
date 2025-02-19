import { create } from "zustand"

interface LoginDialogStore {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onLogin: ((userName: string) => void) | null
  setOnLogin: (callback: ((userName: string) => void) | null) => void
}

const useLoginDialogStore = create<LoginDialogStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  onLogin: null,
  setOnLogin: (callback) => set({ onLogin: callback }),
}))

export default useLoginDialogStore
