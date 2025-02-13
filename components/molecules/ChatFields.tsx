import { useWebSocket } from "@/hooks/useWebSocket"
import useChatMessageStore from "@/store/useChatMessageStore"
import useUserStore from "@/store/useUserStore"
import { Box, Button, TextField, Typography } from "@mui/material"

export default function ChatFields() {
  const { message, setMessage } = useChatMessageStore()
  const { userName } = useUserStore()
  const { sendMessage } = useWebSocket()
  if (!userName) {
    return (
      <Box>
        <Typography variant="h5">로그인을 수행해주세요!</Typography>
      </Box>
    )
  }
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="메시지를 입력하세요..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <Button variant="contained" color="primary" onClick={sendMessage}>
        전송
      </Button>
    </Box>
  )
}
