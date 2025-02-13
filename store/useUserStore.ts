import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { UserType } from "./types"

const useUserStore = create(
  persist<UserType>(
    (set, get) => ({
      connectionId: "",
      userName: "",
      setConnectionId: (text: string) => set({ connectionId: text }),
      setUserName: (text) => set({ userName: text }),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)

export default useUserStore
