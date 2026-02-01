"use client";

import { motion } from "framer-motion";
import { MailOpen } from "lucide-react";

interface RewardScreenProps {
    onOpen: () => void;
}

export function RewardScreen({ onOpen }: RewardScreenProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-8 py-12">
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 12 }}
                className="w-32 h-32 bg-val-pink rounded-full flex items-center justify-center text-white shadow-lg"
            >
                <MailOpen size={64} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center space-y-2"
            >
                <h2 className="text-3xl font-bold text-val-rose">You Unlocked It!</h2>
                <p className="text-gray-600">There's a message waiting for you.</p>
            </motion.div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpen}
                className="px-8 py-3 bg-val-rose text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all mt-8"
            >
                Open the Letter
            </motion.button>
        </div>
    );
}
