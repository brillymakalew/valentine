"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PhotoFrameProps {
    src: string;
    alt: string;
}

export function PhotoFrame({ src, alt }: PhotoFrameProps) {
    return (
        <div className="relative w-64 h-80 mx-auto transform rotate-[-2deg]">
            {/* Tape/Sticker */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-val-pink/80 opacity-80 z-20 rotate-1 shadow-sm" />

            {/* Frame */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative w-full h-full bg-white p-3 pb-12 shadow-xl rounded-sm rotate-2 border border-gray-100"
            >
                <div className="relative w-full h-full bg-gray-100 overflow-hidden shadow-inner">
                    {/* Placeholder or Image */}
                    {src ? (
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                            <span className="text-4xl">📸</span>
                        </div>
                    )}
                </div>

                {/* Caption Area (Handwritten style simulated) */}
                <div className="absolute bottom-4 left-0 w-full text-center font-handwriting text-gray-500 text-sm">
                    Us 💖
                </div>
            </motion.div>

            {/* Decorations */}
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -bottom-2 -right-2 text-3xl z-30"
            >
                ✨
            </motion.div>
            <div className="absolute -top-2 -left-2 text-3xl z-30 transform -rotate-12">
                💌
            </div>
        </div>
    );
}
