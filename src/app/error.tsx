"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-md"
            >
                {/* Error icon */}
                <div className="text-6xl mb-6">🌙</div>

                <h2 className="font-display text-2xl font-bold text-white mb-4">
                    Something went wrong
                </h2>

                <p className="text-white/60 mb-8">
                    The stars seem to be misaligned. Don&apos;t worry, we&apos;re working on realigning them.
                </p>

                <motion.button
                    onClick={reset}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-500 transition-colors"
                >
                    Try Again
                </motion.button>
            </motion.div>
        </div>
    );
}
