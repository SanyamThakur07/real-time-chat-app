import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Lock, Mail, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const handleSignUp = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-[400px] border-slate-200 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-slate-900">
            Create account
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Enter your details to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <FieldGroup className="gap-4">
              <Field className="gap-1.5">
                <FieldLabel htmlFor="fieldgroup-name" className="text-sm font-medium text-slate-700">
                  Name
                </FieldLabel>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="fieldgroup-name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Enter your name"
                    className="h-10 border-slate-200 pl-10 text-sm placeholder:text-slate-400 focus:border-slate-400 focus:ring-slate-400"
                    disabled={isSigningUp}
                  />
                </div>
              </Field>
              <Field className="gap-1.5">
                <FieldLabel htmlFor="fieldgroup-email" className="text-sm font-medium text-slate-700">
                  Email
                </FieldLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="fieldgroup-email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    type="email"
                    placeholder="Enter your email"
                    className="h-10 border-slate-200 pl-10 text-sm placeholder:text-slate-400 focus:border-slate-400 focus:ring-slate-400"
                    disabled={isSigningUp}
                  />
                </div>
              </Field>
              <Field className="gap-1.5">
                <FieldLabel htmlFor="fieldgroup-password" className="text-sm font-medium text-slate-700">
                  Password
                </FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="fieldgroup-password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    type="password"
                    placeholder="Create a password"
                    className="h-10 border-slate-200 pl-10 text-sm placeholder:text-slate-400 focus:border-slate-400 focus:ring-slate-400"
                    disabled={isSigningUp}
                  />
                </div>
              </Field>
              <Field orientation="horizontal" className="pt-2">
                <Button 
                  className="h-10 w-full bg-slate-900 text-sm font-medium hover:bg-slate-800" 
                  type="submit" 
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-slate-900 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
