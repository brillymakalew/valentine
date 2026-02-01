"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScreenLayout } from "@/components/ScreenLayout";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { PuzzleLock } from "@/components/PuzzleLock";
import { RewardScreen } from "@/components/RewardScreen";
import { AskScreen } from "@/components/AskScreen";
import { SuccessScreen } from "@/components/SuccessScreen";
import { RefusalScreen } from "@/components/RefusalScreen";

type ScreenState = "WELCOME" | "PUZZLE" | "REVEAL" | "ASK" | "YES" | "NO";

interface ConfigData {
  name: string;
  partnerName: string;
  hints: string[];
  correctCode: string;
  photoUrl: string;
  welcomePhotoUrl?: string;
}

export default function Home() {
  const [screen, setScreen] = useState<ScreenState>("WELCOME");
  const [config, setConfig] = useState<ConfigData | null>(null);

  useEffect(() => {
    // Check localStorage for state (optional)
    // const savedState = localStorage.getItem("valentine_state");
    // if (savedState) setScreen(savedState as ScreenState);

    // Fetch dynamic config
    fetch("/api/admin")
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((err) => {
        console.error("Failed to load config", err);
        // Fallback defaults
        setConfig({
          name: "Dian Firstiana",
          partnerName: "Brilly",
          hints: ["The month we met (02)", "Your favorite number (07)"],
          correctCode: "1234",
          photoUrl: ""
        });
      });
  }, []);

  const handleStateChange = (newState: ScreenState) => {
    setScreen(newState);
    // localStorage.setItem("valentine_state", newState);
  };

  if (!config) return <div className="min-h-screen flex items-center justify-center text-rose-300">Loading...</div>;

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-0 md:p-4 bg-val-bg">
      <ScreenLayout>
        <AnimatePresence mode="wait">
          {screen === "WELCOME" && (
            <motion.div key="welcome" className="w-full h-full" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <WelcomeScreen
                onStart={() => handleStateChange("PUZZLE")}
                name={config.name}
                photoUrl={config.welcomePhotoUrl || "/dian.png"}
              />
            </motion.div>
          )}

          {screen === "PUZZLE" && (
            <motion.div
              key="puzzle"
              className="w-full h-full flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
            >
              <PuzzleLock
                onUnlock={() => handleStateChange("REVEAL")}
                hints={config.hints}
                correctCode={config.correctCode}
              />
            </motion.div>
          )}

          {screen === "REVEAL" && (
            <motion.div
              key="reveal"
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <RewardScreen onOpen={() => handleStateChange("ASK")} />
            </motion.div>
          )}

          {screen === "ASK" && (
            <motion.div
              key="ask"
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AskScreen
                onYes={() => handleStateChange("YES")}
                onNo={() => handleStateChange("NO")}
                photoUrl={config.photoUrl}
              />
            </motion.div>
          )}

          {screen === "YES" && (
            <motion.div
              key="yes"
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <SuccessScreen onReplay={() => handleStateChange("WELCOME")} />
            </motion.div>
          )}

          {screen === "NO" && (
            <motion.div
              key="no"
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <RefusalScreen onReplay={() => handleStateChange("WELCOME")} />
            </motion.div>
          )}
        </AnimatePresence>
      </ScreenLayout>
    </main>
  );
}
