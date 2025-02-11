import { create } from "zustand"
import { RoomType } from "./types"

const useRoomStore = create<RoomType>((set) => ({
  roomId: "",
  setRoomId: (text) =>
    set({
      roomId: text,
    }),
}))

export default useRoomStore
