import { create } from "zustand"
import { RoomType } from "./types"

const useRoomStore = create<RoomType<string>>((set) => ({
  roomId: "",
  setRoomId: (text: string) =>
    set({
      roomId: text,
    }),
}))

export default useRoomStore
