"use client"

import { IconButton, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import { Brightness4, Brightness7, SettingsBrightness } from "@mui/icons-material"
import { useState } from "react"
import useThemeStore, { ThemeMode } from "@/store/useThemeStore"

export const ThemeToggle = () => {
  const { mode, setMode } = useThemeStore()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleThemeChange = (newMode: ThemeMode) => {
    setMode(newMode)
    handleClose()
  }

  const getCurrentIcon = () => {
    if (mode === "dark") return <Brightness4 />
    if (mode === "light") return <Brightness7 />
    return <SettingsBrightness />
  }

  return (
    <>
      <Tooltip title="테마 설정">
        <IconButton onClick={handleClick} color="inherit">
          {getCurrentIcon()}
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => handleThemeChange("light")}
          selected={mode === "light"}
        >
          <ListItemIcon>
            <Brightness7 />
          </ListItemIcon>
          <ListItemText>라이트 모드</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeChange("dark")}
          selected={mode === "dark"}
        >
          <ListItemIcon>
            <Brightness4 />
          </ListItemIcon>
          <ListItemText>다크 모드</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeChange("system")}
          selected={mode === "system"}
        >
          <ListItemIcon>
            <SettingsBrightness />
          </ListItemIcon>
          <ListItemText>시스템 설정</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
