"use client"

import { Component, ErrorInfo, ReactNode } from "react"
import { Box, Typography, Button, Alert, AlertTitle } from "@mui/material"
import { ErrorOutline, Refresh } from "@mui/icons-material"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "200px",
            p: 4,
          }}
        >
          <Alert severity="error" sx={{ mb: 3, width: "100%", maxWidth: 500 }}>
            <AlertTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ErrorOutline />
              문제가 발생했습니다
            </AlertTitle>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {this.state.error?.message || "잠시 후 다시 시도해주세요."}
            </Typography>
          </Alert>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={() => this.setState({ hasError: false, error: undefined })}
            sx={{ mt: 2 }}
          >
            다시 시도
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}
