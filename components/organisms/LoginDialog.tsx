"use client"
import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton,
  Avatar,
  Box,
  Typography,
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import useUserStore from "@/store/useUserStore"
import api from "@/lib/axios"
import useLoginDialogStore from "@/store/useLoginDialogStore"

interface LoginDialogProps {
  open: boolean
  onClose: () => void
}

const LoginDialog = () => {
  const { isOpen, setIsOpen } = useLoginDialogStore()
  const [userName, setUserName] = useState("")
  const { setUserName: setStoreUserName } = useUserStore()

  const handleLogin = async () => {
    try {
      const response = await api.get("/login", {
        params: { userName },
      })

      if (response.data.success) {
        setStoreUserName(response.data.userName)
        setIsOpen(false)
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error)
    }
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <DialogTitle>로그인</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <TextField
              autoFocus
              margin="dense"
              label="사용자 이름"
              type="text"
              fullWidth
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              sx={{ mt: 1, mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
          <Button onClick={() => setIsOpen(false)} color="primary">
            취소
          </Button>
          <Button
            onClick={handleLogin}
            variant="contained"
            color="primary"
            disabled={!userName.trim()}
          >
            로그인
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default LoginDialog
