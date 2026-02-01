"use client";

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

interface RefusalScreenProps {
    onReplay: () => void;
}

export function RefusalScreen({ onReplay }: RefusalScreenProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full py-8 text-center gap-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-6xl grayscale opacity-70"
            >
                🤍
            </motion.div>

            <motion.h1
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-gray-400"
            >
                No pressure at all.
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 px-8 leading-relaxed"
            >
                Thanks for being honest. <br />
                I still think you're awesome!
            </motion.p>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={onReplay}
                className="mt-12 px-6 py-2 bg-gray-100 text-gray-500 rounded-full text-sm hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
                <RotateCcw size={14} /> Start over
            </motion.button>
        </div>
    );
}
