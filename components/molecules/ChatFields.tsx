import useChatMessageStore from "@/store/useChatMessageStore"
import { Box, Button, TextField } from "@mui/material"

export default function ChatFields({ sendMessage }) {
  const { message, setMessage, messages, setMessages } = useChatMessageStore()
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
