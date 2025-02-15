import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface UserStore {
  userName: string | null
  setUserName: (name: string | null) => void
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userName: null,
      setUserName: (name) => set({ userName: name }),
    }),
    {
      name: "user-storage", // 로컬 스토리지에 저장될 키 이름
      storage: createJSONStorage(() => localStorage), // 저장소로 localStorage 사용
    }
  )
)

export default useUserStore
