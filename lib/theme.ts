import { createTheme } from "@mui/material/styles"

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb", // blue-600
      light: "#60a5fa", // blue-400
      dark: "#1e40af", // blue-700
    },
    secondary: {
      main: "#7c3aed", // violet-600
      light: "#a78bfa", // violet-400
      dark: "#5b21b6", // violet-700
    },
    background: {
      default: "#ffffff",
      paper: "#f9fafb", // gray-50
    },
    text: {
      primary: "#111827", // gray-900
      secondary: "#6b7280", // gray-500
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h5: {
      fontWeight: 700,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#61afef", // Atom One Dark blue
      light: "#84c1ff",
      dark: "#4d8cd6",
    },
    secondary: {
      main: "#c678dd", // Atom One Dark purple
      light: "#d89fea",
      dark: "#a75ac7",
    },
    background: {
      default: "#282c34", // Atom One Dark main background
      paper: "#21252b", // Atom One Dark darker background
    },
    text: {
      primary: "#abb2bf", // Atom One Dark foreground
      secondary: "#5c6370", // Atom One Dark comment gray
    },
    error: {
      main: "#e06c75", // Atom One Dark red
    },
    warning: {
      main: "#e5c07b", // Atom One Dark yellow
    },
    success: {
      main: "#98c379", // Atom One Dark green
    },
    info: {
      main: "#56b6c2", // Atom One Dark cyan
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h5: {
      fontWeight: 700,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.3)",
          backgroundColor: "#21252b",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.3)",
          backgroundColor: "#21252b",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#21252b",
        },
      },
    },
  },
})
