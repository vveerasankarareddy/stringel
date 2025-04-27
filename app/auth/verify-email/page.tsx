"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("pendingEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      router.push("/auth/signup");
    }
  }, [router]);

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

  const handleVerify = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const deviceInfo = await getDeviceInfo();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: verificationCode,
          deviceInfo,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        localStorage.removeItem("pendingEmail");
        setTimeout(() => {
          router.push("/home");
        }, 1500);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Verification email resent. Please check your inbox.");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Confirm your email</h1>
        <p className="text-muted-foreground">
          We've sent a verification code to <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Please check your inbox and enter the verification code below to complete your registration.
        </p>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-500">{success}</p>}

        <form onSubmit={handleVerify} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />

          <div className="flex flex-col space-y-2">
            <Button
              type="submit"
              className="bg-[#18181B] hover:bg-[#27272A] text-white"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify my email"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-gray-300 dark:border-gray-700"
              onClick={handleResendVerification}
              disabled={isLoading}
            >
              Resend verification email
            </Button>
          </div>
        </form>
      </div>

      <div className="text-center text-sm">
        <Link href="/auth/login" className="font-medium text-primary hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  );
}