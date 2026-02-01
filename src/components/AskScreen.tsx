"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PhotoFrame } from "./PhotoFrame";
import { useState } from "react";
import { X, Calculator } from "lucide-react";

interface AskScreenProps {
    onYes: () => void;
    onNo: () => void;
    photoUrl?: string;
}

export function AskScreen({ onYes, onNo, photoUrl = "" }: AskScreenProps) {
    const [showMath, setShowMath] = useState(false);
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState("");

    const handleVerify = () => {
        if (!answer) {
            setError("Please solve the equation.");
            return;
        }
        setError("Incorrect answer. Please try again.");
        setAnswer("");
    };

    return (
        <div className="flex flex-col items-center h-full pt-8 pb-4 relative">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-8"
            >
                <PhotoFrame src={photoUrl} alt="Us together" />
            </motion.div>

            <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-4xl font-bold text-val-rose text-center mb-12 leading-tight"
            >
                Will you be my <br />
                <span className="text-val-rose mix-blend-multiply">Valentine?</span>
            </motion.h1>

            <div className="flex flex-col gap-4 w-full max-w-xs md:max-w-md mt-auto">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onYes}
                    className="w-full py-4 bg-val-rose text-white font-bold text-xl rounded-2xl shadow-lg border-b-4 border-pink-700 active:border-b-0 active:translate-y-1 transition-all"
                >
                    Yes 💘
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowMath(true)}
                    className="w-full py-3 bg-white text-gray-400 font-medium text-sm rounded-xl hover:bg-gray-50 transition-colors"
                >
                    Not this year 🤍
                </motion.button>

                <p className="text-center text-gray-300 text-xs mt-2">No pressure, promise!</p>
            </div>

            {/* Impossible Math Challenge Modal */}
            <AnimatePresence>
                {showMath && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowMath(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative z-10 overflow-hidden"
                        >
                            <button
                                onClick={() => setShowMath(false)}
                                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex flex-col items-center gap-4 text-center">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-2">
                                    <Calculator size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Security Check 🔒</h3>
                                <p className="text-sm text-gray-600">
                                    To decline this offer, please solve this simple equation to verify you are human:
                                </p>

                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 w-full font-mono text-sm overflow-x-auto">
                                    <p className="whitespace-nowrap">
                                        ∫₀^∞ ( (ln(x)²)/(1+x²) ) dx + <br />
                                        ∑_{"{n=1}"}^∞ ( (-1)ⁿ / (2n+1)! ) * π³ = ?
                                    </p>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Enter solution"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none transition-all"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                />

                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-500 text-xs font-medium"
                                    >
                                        {error}
                                    </motion.p>
                                )}

                                <div className="grid grid-cols-2 gap-3 w-full mt-2">
                                    <button
                                        onClick={() => setShowMath(false)}
                                        className="py-3 px-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                    >
                                        I give up
                                    </button>
                                    <button
                                        onClick={handleVerify}
                                        className="py-3 px-4 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
                                    >
                                        Verify
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
