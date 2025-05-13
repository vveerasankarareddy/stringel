"use client";

import React, { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Enhanced device information collection
  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent || "";
    let deviceType = "desktop"; // Default fallback
    let deviceName = "Browser"; // Default fallback
    
    // Determine device type
    if (/Mobi|Android|iPhone|iPad|iPod/.test(userAgent)) {
      deviceType = /iPad/.test(userAgent) ? "tablet" : "mobile";
    } else if (/Windows/.test(userAgent)) {
      deviceType = "desktop";
    } else if (/Mac/.test(userAgent)) {
      deviceType = "desktop";
    } else if (/Linux/.test(userAgent) && !/Android/.test(userAgent)) {
      deviceType = "desktop";
    }

    // Determine device name (browser identifier)
    if (/Chrome/.test(userAgent) && !/Edg/.test(userAgent)) {
      deviceName = "Chrome";
    } else if (/Firefox/.test(userAgent)) {
      deviceName = "Firefox";
    } else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
      deviceName = "Safari";
    } else if (/Edg/.test(userAgent)) {
      deviceName = "Edge";
    }
    
    // Get additional information to make the fingerprint more unique
    const platform = navigator.platform || "";
    const language = navigator.language || "";
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    
    // Get or create device unique ID
    let deviceUniqueId = localStorage.getItem('device_unique_id');
    if (!deviceUniqueId) {
      deviceUniqueId = generateUniqueId();
      localStorage.setItem('device_unique_id', deviceUniqueId);
    }
    
    return {
      deviceType,
      deviceName,
      userAgent,
      platform,
      language,
      timezone,
      screenResolution,
      deviceUniqueId
    };
  };
  
  // Generate a unique ID for device identification
  const generateUniqueId = () => {
    const array = new Uint32Array(4);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => dec.toString(16).padStart(8, '0')).join('');
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const deviceInfo = getDeviceInfo();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, deviceInfo }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/home");
      } else if (response.status === 202) {
        // Device verification needed
        localStorage.setItem("pendingVerificationUserId", data.userId);
        router.push(`/auth/verify-device?userId=${data.userId}`);
      } else {
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(`Network error: ${err instanceof Error ? err.message : "Unknown error"}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} login not implemented in this demo`);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Log in</h1>
        <p className="text-muted-foreground">Enter your credentials to access your account</p>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="space-y-4">
        <button
          className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded-md py-2.5 px-4 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-[#18181B]"
          onClick={() => handleSocialLogin("Google")}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" className="mr-2">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.20-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.70 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.70 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.60 3.30-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Log in with Google
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
              placeholder="Email address"
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
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="remember" className="text-sm text-gray-900 dark:text-gray-100">
                Remember me
              </label>
            </div>
            <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
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
          Sign up
        </Link>
      </div>
    </div>
  );
}