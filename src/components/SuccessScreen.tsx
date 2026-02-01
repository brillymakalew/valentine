"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowRight, RotateCcw, Heart as HeartIcon, Cat } from "lucide-react";

interface SuccessScreenProps {
    onReplay: () => void;
}

interface FloatingElement {
    id: number;
    x: number;
    y: number;
    scale: number;
    color: string;
    type: 'heart' | 'cat';
}

export function SuccessScreen({ onReplay }: SuccessScreenProps) {
    const [showOptions, setShowOptions] = useState(false);
    const [elements, setElements] = useState<FloatingElement[]>([]);
    const [poppedCount, setPoppedCount] = useState(0);

    useEffect(() => {
        // Trigger confetti on mount
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ffafd6', '#ffcba4', '#ff4d94']
            });
            confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ffafd6', '#ffcba4', '#ff4d94']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();

        setTimeout(() => setShowOptions(true), 2000);

        // Generate initial floating elements (hearts + cats)
        const initialElements = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 90 + 5, // 5-95%
            y: Math.random() * 80 + 10, // 10-90%
            scale: Math.random() * 0.5 + 0.8,
            color: ['#ffafd6', '#fb7185', '#db2777'][Math.floor(Math.random() * 3)],
            type: Math.random() > 0.6 ? 'cat' : 'heart' as 'heart' | 'cat' // 40% cats
        }));
        setElements(initialElements);

    }, []);

    const popElement = (id: number) => {
        setElements(prev => prev.filter(el => el.id !== id));
        setPoppedCount(prev => prev + 1);

        // Trigger small confetti burst at cursor/touch location? 
        // For simplicity, just count for now.
    };

    return (
        <div className="relative z-[2000] flex flex-col items-center justify-center h-full py-8 text-center gap-6 w-full md:max-w-3xl mx-auto overflow-hidden">
            {/* White card backdrop for better visibility */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md rounded-3xl -z-10 shadow-2xl" />

            {/* Score Counter */}
            <div className="absolute top-4 right-4 bg-white/50 backdrop-blur-sm border border-val-pink/20 rounded-full px-4 py-1 text-sm font-bold text-val-rose shadow-sm animate-in fade-in z-[60]">
                Popped: {poppedCount} 💖
            </div>

            {/* Floating Elements Layer - z-50 to be on top of everything for popping */}
            <div className="absolute inset-0 z-50 overflow-hidden pointer-events-none">
                <AnimatePresence>
                    {elements.map((el) => (
                        <motion.div
                            key={el.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: el.scale,
                                opacity: 1,
                                y: [0, -20, 0],
                                x: [0, 10, -10, 0]
                            }}
                            exit={{ scale: 1.5, opacity: 0 }}
                            transition={{
                                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                x: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                            }}
                            style={{
                                left: `${el.x}%`,
                                top: `${el.y}%`,
                                color: el.color
                            }}
                            className="absolute cursor-pointer pointer-events-auto filter drop-shadow-md hover:scale-125 transition-transform p-2"
                            onClick={() => popElement(el.id)}
                            whileTap={{ scale: 1.5, opacity: 0 }} // Pop effect
                        >
                            {el.type === 'cat' ? (
                                <Cat size={40} fill="currentColor" strokeWidth={1.5} />
                            ) : (
                                <HeartIcon size={40} fill="currentColor" strokeWidth={0} />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="text-8xl filter drop-shadow-md z-10"
            >
                💖
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-val-rose drop-shadow-sm z-10 px-4"
            >
                Thank you for being my Valentine, Meng 💖
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-xs text-val-rose/60 font-medium z-10 animate-pulse"
            >
                (Psst... popup the hearts!)
            </motion.p>

            {showOptions && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full space-y-4 mt-4 px-4 z-10"
                >
                    <p className="font-semibold text-val-rose text-lg">Pick our date vibe:</p>

                    {["Sushi Date 🍣", "Cozy Movie Night 🍿", "Adventure Time 🎢"].map((option, i) => (
                        <motion.button
                            key={option}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-4 bg-white border-2 border-val-pink/50 text-gray-700 rounded-xl font-bold shadow-md hover:bg-val-pink hover:text-white transition-colors flex items-center justify-between px-6 group"
                            onClick={() => window.open(`https://wa.me/6287886026613?text=I%20pick%20${encodeURIComponent(option)}%20for%20our%20date!%20💖`, '_blank')}
                        >
                            {option}
                            <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.button>
                    ))}
                </motion.div>
            )}

            <button onClick={onReplay} className="mt-8 text-gray-400 text-sm flex items-center gap-1 hover:text-rose-500 transition-colors font-medium  px-4 py-2 rounded-full z-10">
                <RotateCcw size={14} /> Replay
            </button>
        </div>
    );
}
