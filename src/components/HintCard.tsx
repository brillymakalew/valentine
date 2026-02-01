"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Lightbulb } from "lucide-react";

interface HintCardProps {
    hint: string;
    index: number;
}

export function HintCard({ hint, index }: HintCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="relative w-full h-16 perspective-[1000px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
            <motion.div
                className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-500"
                animate={{ rotateX: isFlipped ? 180 : 0 }}
            >
                {/* Front */}
                <div className="absolute inset-0 [backface-visibility:hidden] bg-white/50 backdrop-blur-sm rounded-xl border border-white/60 shadow-sm flex items-center justify-center gap-2 text-val-rose font-medium">
                    <Lightbulb size={18} />
                    <span>Tap for Hint {index + 1}</span>
                </div>

                {/* Back */}
                <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-xl border-2 border-val-peach shadow-md flex items-center justify-center text-gray-700 p-2 text-sm text-center [transform:rotateX(180deg)]">
                    {hint}
                </div>
            </motion.div>
        </div>
    );
}
