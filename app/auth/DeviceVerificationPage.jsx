"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function DeviceVerificationPage() {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [countdown, setCountdown] = useState(300); // 5 minutes countdown

  useEffect(() => {
    // Get userId from URL or local storage
    const params = new URLSearchParams(window.location.search);
    const uid = params.get("userId") || localStorage.getItem("pendingVerificationUserId");
    
    if (uid) {
      setUserId(uid);
      localStorage.setItem("pendingVerificationUserId", uid);
    } else {
      // If no userId, redirect to login
      router.push("/auth/login");
    }
    
    // Set up countdown timer
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [router]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleVerify = async (e) => {
    e.preventDefault();
    
    if (!verificationCode.trim()) {
      setError("Please enter the verification code");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-device`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId,
          verificationToken: verificationCode,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Clear the pending verification state
        localStorage.removeItem("pendingVerificationUserId");
        // Redirect to home page
        router.push("/home");
      } else {
        setError(data.error || "Verification failed. Please try again.");
      }
    } catch (err) {
      console.error("Verification request failed:", err);
      setError(`Network error: ${err instanceof Error ? err.message : "Unknown error"}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResendCode = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Reset countdown
        setCountdown(300);
        alert("A new verification code has been sent to your email");
      } else {
        setError(data.error || "Failed to send verification code. Please try again.");
      }
    } catch (err) {
      console.error("Resend verification code failed:", err);
      setError(`Network error: ${err instanceof Error ? err.message : "Unknown error"}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    // Clear all auth-related storage
    localStorage.removeItem("pendingVerificationUserId");
    
    // Clear cookies (would typically be done via API call)
    document.cookie = "sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "csrfToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Redirect to login
    router.push("/auth/login");
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Verify Your Device</h1>
        <p className="text-muted-foreground">
          We've sent a verification code to your email. Please enter the code below to verify this device.
        </p>
      </div>
      
      {error && <p className="text-sm text-red-500">{error}</p>}
      
      <form onSubmit={handleVerify} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </div>
        
        <Button
          type="submit"
          className="w-full bg-[#18181B] hover:bg-[#27272A] text-white"
          disabled={isLoading || countdown === 0}
        >
          {isLoading ? "Verifying..." : "Verify Device"}
        </Button>
      </form>
      
      <div className="flex justify-between items-center">
        <button
          onClick={handleResendCode}
          disabled={isLoading || countdown > 0}
          className="text-sm text-primary hover:underline disabled:text-gray-400 disabled:no-underline"
        >
          {countdown > 0 ? `Resend code in ${formatTime(countdown)}` : "Resend code"}
        </button>
        
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:underline"
        >
          Cancel & Log out
        </button>
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-8">
        <p>For security reasons, we verify new devices to protect your account.</p>
        <p>If you didn't request this login, please ignore this page and contact support.</p>
      </div>
    </div>
  );
}