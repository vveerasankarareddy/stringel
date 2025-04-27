import type React from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="border border-yellow-400/30 rounded-lg"
                style={{
                  opacity: Math.random() * 0.3 + 0.1,
                  height: `${Math.floor(Math.random() * 40) + 20}%`,
                  marginTop: `${Math.floor(Math.random() * 60)}%`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
