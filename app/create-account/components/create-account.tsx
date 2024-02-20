"use client";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const checkCredentials = (email: string, password: string) => {
  return false;
};

export function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (checkCredentials(email, password)) {
        console.log("created account");
        setEmail("");
        setPassword("");
        // navigate to complete account setup
      } else {
        console.log("invalid credentials");
        setError(true);
      }
      console.log("submitted");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription className="pb-4">
            Enter your email below to create your account
          </CardDescription>
          {error && (
            <div
              className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2 text-sm"
              role="alert"
            >
              <p className="font-medium">Error creating an account</p>
              <p>Email needs to be at least 2 characters long</p>
            </div>
          )}
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="relative my-4">
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2">
              <div className="flex justify-center items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-4 bg-white text-xs text-gray-500 uppercase">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline">
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Create Account
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
