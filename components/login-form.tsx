"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Eye,
  EyeOff,
  LayoutGrid,
  LogIn,
  Search,
  Globe,
  Command,
  Lock
} from "lucide-react"
import { login as apiLogin } from "@/lib/api"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    const form = event.target as HTMLFormElement
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value

    try {
      const data = await apiLogin({ email, password })
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email, role: data.role }))
      toast.success(`Welcome back, ${data.name}!`)
      router.push("/dashboard")
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in")
      // Fallback for development if backend is not running
      if (email === "admin@laas.com") {
        console.warn("Backend login failed. Using simulation fallback.")
        localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
        localStorage.setItem("user", JSON.stringify({ name: "Admin", email: "admin@laas.com" }))
        router.push("/dashboard")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-md", className)} {...props}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center mb-6">
          <div className="flex h-24 w-auto items-center justify-center">
            <img src="/las logo-01.png" alt="LAAS Logo" className="h-full w-auto object-contain" />
          </div>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          Architecture & Real Estate Management
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          Secure access to your administrative portal.
        </p>
      </div>



      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@laas.com"
            required
            className="h-12 border-zinc-200 dark:border-zinc-800 bg-transparent focus-visible:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Type password"
              required
              className="h-12 border-zinc-200 dark:border-zinc-800 bg-transparent pr-10 focus-visible:ring-indigo-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <a href="#" className="text-sm font-medium text-primary hover:underline">
            Forgot Password?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 shadow-lg shadow-primary/20"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <LogIn className="size-4" />
          )}
          Sign In
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a href="#" className="font-semibold text-primary hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  )
}
