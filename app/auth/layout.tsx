'use client';

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [randomStyles, setRandomStyles] = useState<
    { opacity: number; height: string; marginTop: string }[]
  >([]);

  useEffect(() => {
    setMounted(true);

    const styles = Array.from({ length: 9 }).map(() => ({
      opacity: Math.random() * 0.3 + 0.1,
      height: `${Math.floor(Math.random() * 40) + 20}%`,
      marginTop: `${Math.floor(Math.random() * 60)}%`,
    }));

    setRandomStyles(styles);
  }, []);

  if (!mounted) {
    // While not mounted, render empty layout (optional)
    return <div className="flex min-h-screen bg-background"></div>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <div className="text-3xl font-bold">Latos</div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full ml-1 mt-1"></div>
            </div>
            <ThemeToggle />
          </div>
          {children}
        </div>
      </div>

      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-indigo-600/90 dark:bg-indigo-900/90 semi-transparent">
          <div className="h-full w-full auth-illustration"></div>
          <div className="absolute inset-0 grid grid-cols-3 gap-4 p-8">
            {randomStyles.map((style, i) => (
              <div
                key={i}
                className="border border-yellow-400/30 rounded-lg"
                style={style}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
