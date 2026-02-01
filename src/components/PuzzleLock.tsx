"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Delete } from "lucide-react";
import { HintCard } from "./HintCard";

interface PuzzleLockProps {
    onUnlock: () => void;
    correctCode?: string;
    hints: string[];
}

export function PuzzleLock({ onUnlock, correctCode = "1234", hints }: PuzzleLockProps) {
    const [input, setInput] = useState("");
    const [shake, setShake] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);

    const handlePress = (num: string) => {
        if (input.length < 4 && !isUnlocked) {
            setInput((prev) => prev + num);
        }
    };

    const handleBackspace = () => {
        if (!isUnlocked) {
            setInput((prev) => prev.slice(0, -1));
        }
    };

    useEffect(() => {
        if (input.length === 4) {
            if (input === correctCode) {
                setIsUnlocked(true);
                setTimeout(onUnlock, 1500); // Wait for unlock animation
            } else {
                setShake(true);
                setTimeout(() => {
                    setShake(false);
                    setInput("");
                }, 500);
            }
        }
    }, [input, correctCode, onUnlock]);

    return (
        <div className="flex flex-col items-center w-full max-w-xs md:max-w-md gap-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-val-rose">Unlock My Heart</h2>
                <p className="text-sm text-gray-600">Enter the secret code</p>
            </div>

            {/* Lock Display */}
            <motion.div
                animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                className="bg-white rounded-3xl p-6 shadow-xl w-full border-4 border-val-pink/30 flex flex-col items-center gap-4 relative overflow-hidden"
            >
                <AnimatePresence mode="wait">
                    {isUnlocked ? (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 1, rotate: [0, -10, 10, 0] }}
                            className="text-green-500"
                        >
                            <Unlock size={48} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="lock"
                            initial={{ scale: 1 }}
                            className="text-val-rose"
                        >
                            <Lock size={48} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex gap-3 mt-2">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`w-12 h-14 rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-200 ${input[i]
                                ? "bg-val-pink text-white border-val-rose"
                                : "bg-gray-100 text-gray-300 border-gray-200"
                                } border-2`}
                        >
                            {input[i] || "•"}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Hints */}
            <div className="w-full space-y-2">
                {hints.map((hint, i) => (
                    <HintCard key={i} hint={hint} index={i} />
                ))}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-4 w-full mt-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                        key={num}
                        onClick={() => handlePress(num.toString())}
                        className="h-16 rounded-2xl bg-white shadow-sm border border-val-peach/50 text-2xl font-semibold text-gray-700 hover:bg-val-peach/20 active:scale-95 transition-all"
                    >
                        {num}
                    </button>
                ))}
                <div /> {/* Empty slot */}
                <button
                    onClick={() => handlePress("0")}
                    className="h-16 rounded-2xl bg-white shadow-sm border border-val-peach/50 text-2xl font-semibold text-gray-700 hover:bg-val-peach/20 active:scale-95 transition-all"
                >
                    0
                </button>
                <button
                    onClick={handleBackspace}
                    className="h-16 rounded-2xl bg-white/50 shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-400 active:scale-95 transition-all"
                >
                    <Delete size={24} />
                </button>
            </div>
        </div>
    );
}
