"use client"
import useChatMessageStore from "@/store/useChatMessageStore"
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"

export default function ChatMessages({ roomId }) {
  const { messages, setMessages } = useChatMessageStore()
  const [lastKey, setLastKey] = useState(null)

  const fetchMessages = async () => {
    let url = `/api/chat/messages?roomId=${roomId}&limit=10`
    if (lastKey) url += `&lastKey=${encodeURIComponent(lastKey)}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    setMessages(data.messages)
    setLastKey(data.lastKey)
  }

  useEffect(() => {
    if (!messages.length) {
      fetchMessages()
    }
  }, [])

  return (
    <List sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
      {messages.map((msg, idx) => (
        <ListItem
          key={idx}
          sx={{
            display: "flex",
            justifyContent: msg.sender === "user1" ? "flex-end" : "flex-start",
          }}
        >
          <Paper
            sx={{
              p: 1,
              bgcolor: msg.sender === "user1" ? "primary.light" : "grey.300",
            }}
          >
            <>
              <ListItemText
                primary={<Typography variant="body1">{msg.message}</Typography>}
                secondary={
                  <Typography variant="caption">{msg.sender}</Typography>
                }
              />
            </>
          </Paper>
        </ListItem>
      ))}
    </List>
  )
}
