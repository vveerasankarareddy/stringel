"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MainLayout } from "@/components/layouts/main-layout";

export default function HomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [botsCount, setBotsCount] = useState(0);
  const [channelsCount, setChannelsCount] = useState(0);
  const [aiSpend, setAiSpend] = useState(0);
  const [botsLimit, setBotsLimit] = useState(10);
  const [channelsLimit, setChannelsLimit] = useState(5);
  const [aiBudget, setAiBudget] = useState(100);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/home`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error(`Failed to load data: ${res.status}`);
        const { data } = await res.json();

        setUserName(data.name || "User");
        setBotsCount(data.botsCount || 0);
        setChannelsCount(data.channelsCount || 0);
        setAiSpend(data.aiSpend || 0);

        if (data.botsLimit) setBotsLimit(data.botsLimit);
        if (data.channelsLimit) setChannelsLimit(data.channelsLimit);
        if (data.aiBudget) setAiBudget(data.aiBudget);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
      }
    };

    fetchData();
  }, [router]);

  const botsRemaining = Math.max(botsLimit - botsCount, 0);
  const channelsRemaining = Math.max(channelsLimit - channelsCount, 0);
  const aiRemaining = Math.max(aiBudget - aiSpend, 0);

  const calcPercent = (remaining: number, limit: number) =>
    limit > 0 ? Math.min((remaining / limit) * 100, 100) : 0;

  return (
    <MainLayout>
      <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2">
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => router.push("/auth/login")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <path d="M9 3v18" />
            </svg>
          </button>
          <span className="text-white">Home</span>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-start mb-8 bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] p-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-md"></div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                Welcome, {userName}!
              </h1>
              <p className="text-gray-400 text-sm">
                Let's build something amazing today
              </p>
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* Channels */}
          <div className="p-6 bg-[#1e1e1e] rounded-lg border border-[#2a2a2a]">
            <h3 className="text-lg font-medium text-gray-400 mb-2">
              Channels
            </h3>
            <p className="text-2xl font-bold text-white mb-4">
              {channelsCount}/{channelsLimit}
            </p>
            <div className="w-full h-2 bg-[#2a2a2a] rounded">
              <div
                className="h-2 bg-green-500 rounded"
                style={{
                  width: `${calcPercent(
                    channelsRemaining,
                    channelsLimit
                  )}%`,
                }}
              />
            </div>
            <p className="text-gray-400 text-sm mt-1">
              {channelsRemaining} remaining
            </p>
          </div>

          {/* Bots */}
          <div className="p-6 bg-[#1e1e1e] rounded-lg border border-[#2a2a2a]">
            <h3 className="text-lg font-medium text-gray-400 mb-2">
              Bots
            </h3>
            <p className="text-2xl font-bold text-white mb-4">
              {botsCount}/{botsLimit}
            </p>
            <div className="w-full h-2 bg-[#2a2a2a] rounded">
              <div
                className="h-2 bg-blue-500 rounded"
                style={{
                  width: `${calcPercent(botsRemaining, botsLimit)}%`,
                }}
              />
            </div>
            <p className="text-gray-400 text-sm mt-1">
              {botsRemaining} remaining
            </p>
          </div>

          {/* AI Spend */}
          <div className="p-6 bg-[#1e1e1e] rounded-lg border border-[#2a2a2a]">
            <h3 className="text-lg font-medium text-gray-400 mb-2">
              AI Budget
            </h3>
            <p className="text-2xl font-bold text-white mb-4">
              ${aiSpend.toFixed(2)}/{aiBudget.toFixed(2)}
            </p>
            <div className="w-full h-2 bg-[#2a2a2a] rounded">
              <div
                className="h-2 bg-purple-500 rounded"
                style={{ width: `${calcPercent(aiRemaining, aiBudget)}%` }}
              />
            </div>
            <p className="text-gray-400 text-sm mt-1">
              ${aiRemaining.toFixed(2)} remaining
            </p>
          </div>
        </div>

        {(botsCount === 0 && channelsCount === 0) ? (
          <div className="bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] p-8 flex flex-col items-center justify-center">
            <h2 className="text-xl font-medium text-white mb-2">
              Get Started with Stringel
            </h2>
            <p className="text-sm text-gray-400 text-center mb-6">
              Create a bot or connect a channel to start building your AI agent
            </p>
            <div className="flex gap-4">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                onClick={() => router.push("/bot/create")}
              >
                <Plus className="w-4 h-4" /> Create Bot
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                onClick={() => router.push("/channels/connect")}
              >
                <Plus className="w-4 h-4" /> Connect Channel
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] p-8">
            <h2 className="text-xl font-medium text-white mb-4">
              Your Dashboard
            </h2>
            <p className="text-gray-400 mb-6">
              Continue building with {botsCount} bot(s) and {channelsCount} channel(s).
            </p>
            <div className="flex gap-4">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                onClick={() => router.push("/bot/create")}
              >
                <Plus className="w-4 h-4" /> Create Another Bot
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                onClick={() => router.push("/channels/connect")}
              >
                <Plus className="w-4 h-4" /> Connect Another Channel
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
