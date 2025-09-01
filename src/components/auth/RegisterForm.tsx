"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRegister } from "@/src/hooks/useRegister";

export const RegisterForm: React.FC = () => {
  const { register, handleSubmit, onSubmit, formState: { errors }, isLoading } = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
            <span className="text-secondary-foreground font-bold text-lg">👤</span>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Create Account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Join us today and start managing your contacts
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">👤</span>
                <Input
                  type="text"
                  placeholder="Full Name"
                  {...register("name")}
                  className={`pl-10 h-12 ${errors.name ? "border-destructive" : ""}`}
                />
              </div>
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">✉</span>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className={`pl-10 h-12 ${errors.email ? "border-destructive" : ""}`}
                />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">🔒</span>
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  className={`pl-10 h-12 ${errors.password ? "border-destructive" : ""}`}
                />
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white" 
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-medium hover:text-blue-700">Sign in here</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};