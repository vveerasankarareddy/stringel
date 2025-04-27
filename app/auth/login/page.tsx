"use client";

import type React from "react";
import { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getDeviceInfo = async () => {
    const browserInfo = navigator.userAgent;
    let location = { country: "Unknown" };

    // Fetch geolocation (only country)
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      location = { country: data.country_name || "Unknown" };
    } catch (err) {
      console.error("Failed to fetch location:", err);
    }

    // Generate a simple device name based on browser
    const deviceName = browserInfo.split('(')[1]?.split(')')[0] || "Unknown Device";

    return {
      deviceName,
      browser: browserInfo,
      os: navigator.platform,
      deviceType: /Mobi|Android|iPhone|iPad/.test(browserInfo) ? 'mobile' : 'desktop',
      location,
      lastLogin: new Date(),
    };
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const deviceInfo = await getDeviceInfo();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          deviceInfo,
          rememberMe,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/home");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} login not implemented in this demo`);
  };

  return (
    <div className="space-y-6 max-w-md">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Welcome to Latos</h1>
        <p className="text-muted-foreground">Create the ultimate learning experience</p>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="space-y-4">
        <button
          onClick={() => handleSocialLogin("Google")}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded-md py-2.5 px-4 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-[#18181B]"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" className="mr-2">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Log in with Google
        </button>

        <button
          onClick={() => handleSocialLogin("Microsoft")}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded-md py-2.5 px-4 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-[#18181B]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-2">
            <path
              fill="#00A4EF"
              d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"
            />
          </svg>
          Log in with Microsoft
        </button>

        <button
          onClick={() => handleSocialLogin("GitHub")}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded-md py-2.5 px-4 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-[#18181B]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-2">
            <path
              fill="#24292e"
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
          Log in with GitHub
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <Link href="/auth/forgot-password" className="text-sm font-medium text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#18181B] hover:bg-[#27272A] text-white"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </div>

      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link href="/auth/signup" className="font-medium text-primary hover:underline">
          Sign Up Now
        </Link>
      </div>
    </div>
  );
}