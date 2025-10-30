// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Blog Post Types
export interface BlogPost {
  title: string
  link: string
}

export interface BlogPostsResponse {
  posts: BlogPost[]
}

// Chat Types
export interface ChatMessage {
  roomId: string
  sender: string
  message: string
  timestamp: number
}

export interface SendMessageRequest {
  roomId: string
  sender: string
  message: string
}

export interface SendMessageResponse extends ApiResponse {
  message: string
}

export interface GetMessagesResponse extends ApiResponse<ChatMessage[]> {
  data: ChatMessage[]
}

// Login Types
export interface LoginRequest {
  userName: string
}

export interface LoginResponse extends ApiResponse {
  userName: string
}

// Error Response
export interface ErrorResponse {
  error: string
  status?: number
}
