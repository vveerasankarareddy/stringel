"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    let browser = "Unknown";
    let os = navigator.platform || "Unknown";
    let deviceType = "desktop";

    if (userAgent.includes("Chrome")) browser = "Chrome";
    else if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Safari")) browser = "Safari";
    else if (userAgent.includes("Edge")) browser = "Edge";

    if (/iPad|Tablet|Android/i.test(userAgent)) deviceType = "tablet";
    else if (/Mobile/i.test(userAgent)) deviceType = "mobile";

    if (os.includes("Win")) os = "Windows";
    else if (os.includes("Mac")) os = "MacOS";
    else if (os.includes("Linux")) os = "Linux";

    return {
      deviceName: `Device-${browser}-${os}`,
      browser: userAgent,
      os: os,
      deviceType: deviceType,
      location: {
        country: "India",
      },
      lastLogin: new Date().toISOString(),
    };
  };

  useEffect(() => {
    const pendingEmail = localStorage.getItem("pendingEmail");
    if (pendingEmail) {
      setEmail(pendingEmail);
    } else {
      router.push("/auth/register");
    }
  }, [router]);

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const deviceInfo = getDeviceInfo();
      console.log('Verify - Sending deviceInfo:', deviceInfo);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          code,
          deviceInfo,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        localStorage.removeItem("pendingEmail");
        setTimeout(() => router.push("/home"), 2000);
      } else {
        setError(data.message || "Failed to verify email. Please try again.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`Network error: ${errorMessage}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Verification email resent. Please check your inbox.");
      } else {
        setError(data.message || "Failed to resend verification email. Please try again.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`Network error: ${errorMessage}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Verify your email</h1>
        <p className="text-muted-foreground">
          We sent a verification code to <span className="font-medium">{email}</span>
        </p>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-500">{success}</p>}

      <form onSubmit={handleVerify} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#18181B] hover:bg-[#27272A] text-white"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify email"}
        </Button>
      </form>

      <div className="text-center text-sm">
        Didn't receive the code?{" "}
        <button
          onClick={handleResend}
          className="font-medium text-primary hover:underline"
          disabled={isLoading}
        >
          Resend code
        </button>
      </div>

      <div className="text-center text-sm">
        <Link href="/auth/register" className="font-medium text-primary hover:underline">
          Back to signup
        </Link>
      </div>
    </div>
  );
}