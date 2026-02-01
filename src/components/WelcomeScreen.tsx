"use client";

import { motion } from "framer-motion";

interface WelcomeScreenProps {
    onStart: () => void;
    name?: string;
    photoUrl?: string;
}

export function WelcomeScreen({ onStart, name = "Dian Firstiana", photoUrl }: WelcomeScreenProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full py-12 w-full gap-8 relative overflow-hidden">
            {/* Floating Hearts Background - z-0 to stay behind */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * 400 - 200,
                            y: Math.random() * 800 - 400,
                            scale: 0,
                            opacity: 0
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            scale: [0.5, 1, 0],
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                        className="absolute left-1/2 top-1/2 text-val-pink/40 text-2xl"
                    >
                        ❤️
                    </motion.div>
                ))}
            </div>

            {/* Content Card - z-10 to stay relative on top */}
            <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-lg px-6">

                {/* Photo */}
                <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="relative"
                >
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                        <img
                            src={photoUrl || "/placeholder.jpg"}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>

                {/* Text Group */}
                <div className="text-center space-y-2">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg font-medium text-val-rose/80"
                    >
                        Hi, {name} 👋
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-val-rose to-purple-500 bg-clip-text text-transparent leading-tight drop-shadow-sm"
                    >
                        Small game. <br />
                        <span className="text-val-rose">Big question.</span>
                    </motion.h1>
                </div>

                {/* Button */}
                <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: 0.5 }}
                    onClick={onStart}
                    className="mt-4 px-12 py-4 bg-white text-val-rose text-xl font-bold rounded-full shadow-lg border-2 border-val-pink/30 hover:shadow-xl hover:border-val-rose transition-all w-full max-w-xs md:max-w-sm"
                >
                    Start
                </motion.button>
            </div>

            <div className="absolute bottom-4 text-xs text-black/10">
                Made with love by Brilly
            </div>
        </div>
    );
}
