export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  createdAt: Date
}

export interface Subscription {
  id: string
  userId: string
  plan: "weekly" | "monthly" | "lifetime"
  status: "active" | "canceled" | "expired"
  startDate: Date
  endDate?: Date
  nextPaymentDate?: Date
  price: number
  stripeSubscriptionId?: string
}

export interface Content {
  id: string
  type: "image" | "video"
  url: string
  thumbnailUrl?: string
  title: string
  description?: string
  isPublic: boolean
  likes: number
  views: number
  scheduledFor?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Payment {
  id: string
  userId: string
  amount: number
  type: "subscription" | "tip"
  status: "pending" | "completed" | "failed"
  stripePaymentId: string
  createdAt: Date
}

export interface AuthResponse {
  user: User
  token: string
}
