import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export type ThemeMode = "light" | "dark" | "system"

export interface ThemeStore {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  actualTheme: "light" | "dark"
  setActualTheme: (theme: "light" | "dark") => void
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: "system",
      actualTheme: "light",
      setMode: (mode) => set({ mode }),
      setActualTheme: (theme) => set({ actualTheme: theme }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useThemeStore
