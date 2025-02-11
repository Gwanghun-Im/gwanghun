import { create } from "zustand"

const useUserStore = create((set) => ({
  connectionId: "",
  userName: "",
  setConnectionId: (text) => set({ connectionId: text }),
  setUserName: (text) => set({ userName: text }),
}))

export default useUserStore
