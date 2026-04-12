"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function SettingsPage() {
  const handleSave = () => {
    toast.success("Settings saved", {
      description: "Your profile has been updated successfully."
    })
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="shadow-sm border-zinc-200/50 dark:border-zinc-800/50">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              This information will be displayed publicly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Admin User" className="max-w-md" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" defaultValue="admin@raadsan.com" className="max-w-md" />
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/30 px-6 py-4">
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card className="shadow-sm border-zinc-200/50 dark:border-zinc-800/50">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password to keep your account secure.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" title="Current Password" placeholder="••••••••" className="max-w-md" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" title="New Password" placeholder="••••••••" className="max-w-md" />
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/30 px-6 py-4">
            <Button variant="outline">Update Password</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
