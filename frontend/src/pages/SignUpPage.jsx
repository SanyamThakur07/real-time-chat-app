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
    <Card className="w-full min-w-[400px]">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          Create your account
        </CardTitle>
        <CardDescription className="font-medium">
          Sign up for a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp}>
          <FieldGroup className="gap-3">
            <Field className="gap-1">
              <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
              <div className="relative">
                <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="fieldgroup-name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="Jordan Lee"
                  className="pl-10"
                  disabled={isSigningUp}
                />
              </div>
            </Field>
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
                  disabled={isSigningUp}
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
                  disabled={isSigningUp}
                />
              </div>
            </Field>
            <Field orientation="horizontal">
              <Button className="w-full" type="submit" disabled={isSigningUp}>
                {isSigningUp ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing up...
                  </>
                ) : (
                  "Create your account"
                )}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-start pt-0">
        <p className="text-sm font-medium text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
