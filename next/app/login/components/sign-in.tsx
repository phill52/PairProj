"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import Image from "next/image";
import { signIn } from "next-auth/react";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGithub = async () => {
    try {
      setIsLoading(true);
      await signIn("github", { callbackUrl: "/" });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="items-center space-y-3 text-center">
        <Image
          src="/images/pairprojlogo.jpg"
          alt="PairProj Logo"
          width={150}
          height={150}
          className="rounded-lg"
        />
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>Sign in with GitHub to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGithub}
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Signing in..." : "Continue with GitHub"}
        </Button>
      </CardContent>
    </Card>
  );
}