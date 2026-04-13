"use client"

import { useState, useEffect } from "react"

interface User {
  name: string
  email: string
  role: "admin" | "manager" | "sales"
  avatar?: string
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (e) {
        console.error("Failed to parse user data", e)
      }
    }
    setLoading(false)
  }, [])

  return { user, loading }
}
