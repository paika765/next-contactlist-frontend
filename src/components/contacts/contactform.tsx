"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useContacts } from "@/src/hooks/useContacts"
import { Controller } from "react-hook-form"
import { User, Phone, MapPin, Edit3, Trash2, Plus, Users, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

const ContactForm: React.FC = () => {
  const { contacts, addForm, onAdd, onUpdate, onDelete, isLoading, error } = useContacts()
  const router = useRouter()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [logoutLoading, setLogoutLoading] = useState(false)

  const handleEdit = (contact: any) => {
    setEditingId(contact.id)
    addForm.reset(contact)
  }

  const resetForm = () => {
    setEditingId(null)
    addForm.reset()
  }

  const handleSubmit = (data: any) => {
    if (editingId) {
      onUpdate(editingId, data)
    } else {
      onAdd(data)
    }
    resetForm()
  }

  // Logout function
  const handleLogout = async () => {
    setLogoutLoading(true)
    try {
      // Clear any auth tokens from localStorage
      localStorage.removeItem("authToken")
      localStorage.removeItem("userData")
      
      // Clear any session storage items if needed
      sessionStorage.removeItem("authToken")
      
      // Alternatively, you might want to call an API endpoint to logout
      // await fetch('/api/auth/logout', { method: 'POST' })
      
      // Redirect to login page
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setLogoutLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2 relative">
          <Button
            onClick={handleLogout}
            variant="destructive"
            size="sm"
            className="absolute top-0 right-0 flex items-center gap-2 bg-red-600 hover:bg-red-700"
            disabled={logoutLoading || isLoading}
          >
            <LogOut className="h-4 w-4" />
            {logoutLoading ? "Logging out..." : "Logout"}
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Contact Manager</h1>
          <p className="text-muted-foreground text-lg">Organize and manage your contacts efficiently</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertDescription>{error instanceof Error ? error.message : String(error)}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Add/Edit Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    {editingId ? <Edit3 className="h-5 w-5 text-blue-600" /> : <Plus className="h-5 w-5 text-blue-600" />}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{editingId ? "Edit Contact" : "Add New Contact"}</CardTitle>
                    <CardDescription className="text-sm">
                      {editingId ? "Update contact information" : "Fill in the details to add a new contact"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={addForm.handleSubmit(handleSubmit)} className="space-y-5">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </label>
                    <Controller
                      name="username"
                      control={addForm.control}
                      render={({ field, fieldState }) => (
                        <>
                          <Input
                            {...field}
                            placeholder="Enter full name"
                            className={`h-11 ${
                              fieldState.error
                                ? "border-destructive focus-visible:ring-destructive"
                                : "focus-visible:ring-primary"
                            }`}
                            disabled={isLoading}
                          />
                          {fieldState.error && (
                            <p className="text-sm text-destructive font-medium">{fieldState.error.message}</p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </label>
                    <Controller
                      name="phone"
                      control={addForm.control}
                      render={({ field, fieldState }) => (
                        <>
                          <Input
                            {...field}
                            placeholder="Enter phone number"
                            className={`h-11 ${
                              fieldState.error
                                ? "border-destructive focus-visible:ring-destructive"
                                : "focus-visible:ring-primary"
                            }`}
                            disabled={isLoading}
                          />
                          {fieldState.error && (
                            <p className="text-sm text-destructive font-medium">{fieldState.error.message}</p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  {/* Address Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Address <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <Controller
                      name="address"
                      control={addForm.control}
                      render={({ field, fieldState }) => (
                        <>
                          <Input
                            {...field}
                            placeholder="Enter address"
                            className={`h-11 ${
                              fieldState.error
                                ? "border-destructive focus-visible:ring-destructive"
                                : "focus-visible:ring-primary"
                            }`}
                            disabled={isLoading}
                          />
                          {fieldState.error && (
                            <p className="text-sm text-destructive font-medium">{fieldState.error.message}</p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      type="submit" 
                      className="flex-1 h-11 font-medium bg-blue-600 hover:bg-blue-700" 
                      disabled={isLoading || logoutLoading}
                    >
                      {editingId ? "Update Contact" : "Add Contact"}
                    </Button>
                    {editingId && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        disabled={isLoading || logoutLoading}
                        className="h-11 px-6 bg-transparent"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contacts List */}
          <div className="lg:col-span-3">
            <Card className="border-2 border-border/50 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Your Contacts</CardTitle>
                      <CardDescription>
                        {contacts.length} contact{contacts.length !== 1 ? "s" : ""} total
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {contacts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {isLoading ? "Loading contacts..." : "No contacts yet"}
                    </h3>
                    {!isLoading && (
                      <p className="text-muted-foreground">Add your first contact using the form on the left</p>
                    )}
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {contacts.map((contact) => (
                      <Card
                        key={contact.id}
                        className="border border-border hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                      >
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <h3 className="font-semibold text-lg text-foreground group-hover:text-blue-600 transition-colors">
                                {contact.username}
                              </h3>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Phone className="h-4 w-4" />
                                  <span className="text-sm">{contact.phone}</span>
                                </div>
                                {contact.address && (
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span className="text-sm">{contact.address}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(contact)}
                                disabled={isLoading || logoutLoading}
                                className="h-9 w-9 p-0 bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800 border-blue-200"
                              >
                                <Edit3 className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onDelete(contact.id)}
                                disabled={isLoading || logoutLoading}
                                className="h-9 w-9 p-0 bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 border-red-200"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm