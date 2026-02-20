"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { editMyInfo } from "@/actions/customer.actions"
import { toast } from "sonner"

interface Customer {
  id: string
  name: string
  email: string
  emailVerified: boolean
  createdAt: string
  role: string
  userStatus: string
}

export function CustomerProfileCard({ user }: { user: Customer }) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = async() => {
    // console.log("Saved Name:", name)
    // console.log("Saved Email:", email)
    setIsEditing(false)
    try {
      const toastId = toast.loading("Profile Updating...")
      await editMyInfo({name, email})
      toast.success("Updating Profile Successful",{id : toastId})
    } catch (error) {
      toast.error("Internal Server Error")
    }
  }

  return (
    <Card className="max-w-sm mx-auto shadow-lg rounded-2xl border">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold">
          {isEditing ? (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          ) : (
            name
          )}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {isEditing ? (
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          ) : (
            email
          )}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-medium">Role</span>
          <Badge className="uppercase">{user.role}</Badge>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">Status</span>
          <Badge variant={user.userStatus === "APPROVED" ? "default" : "destructive"}>
            {user.userStatus}
          </Badge>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">Email Verified</span>
          <Badge variant={user.emailVerified ? "default" : "destructive"}>
            {user.emailVerified ? "Verified" : "Not Verified"}
          </Badge>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">Joined</span>
          <span className="text-sm text-muted-foreground">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="mt-4 text-center">
          {isEditing ? (
            <Button onClick={handleSave}>Save</Button>
          ) : (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
