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
import { Lock, Mail, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSignUp = (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <Card className="w-full min-w-[400px]">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
        <CardDescription className="font-medium">
          Log in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp}>
          <FieldGroup className="gap-3">
            <Field className="gap-1">
              <FieldLabel className="flex" htmlFor="fieldgroup-email">
                Email
              </FieldLabel>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="fieldgroup-email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  type="email"
                  placeholder="jordan@example.com"
                  className="pl-10"
                  disabled={isLoggingIn}
                />
              </div>
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="fieldgroup-password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  type="password"
                  placeholder="**********"
                  className="pl-10"
                  disabled={isLoggingIn}
                />
              </div>
            </Field>
            <Field orientation="horizontal">
              <Button className="w-full" type="submit" disabled={isLoggingIn}>
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Log in"
                )}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-start pt-0">
        <p className="text-sm font-medium text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
