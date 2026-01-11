import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                {/* Animated cosmic loader */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                    {/* Outer ring */}
                    <div className="absolute inset-0 border-2 border-primary-500/30 rounded-full" />

                    {/* Spinning ring */}
                    <div
                        className="absolute inset-0 border-2 border-transparent border-t-primary-500 rounded-full animate-spin"
                        style={{ animationDuration: "1s" }}
                    />

                    {/* Inner glow */}
                    <div className="absolute inset-4 bg-primary-500/20 rounded-full animate-pulse" />

                    {/* Center star */}
                    <div className="absolute inset-0 flex items-center justify-center text-2xl">
                        ✨
                    </div>
                </div>

                <p className="text-white/60 font-display">
                    Aligning the stars...
                </p>
            </div>
        </div>
    );
}
