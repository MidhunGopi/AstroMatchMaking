"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  generateMatchCardImage,
  generateSquareMatchCard,
  generateMatchCertificate,
  downloadImage,
  shareImage,
  generateShareURLs,
  generateCertificateId,
  getScoreDescriptor,
  MatchCardData,
} from "@/lib/viralFeatures";
import { ZODIAC_SYMBOLS, ZodiacSign } from "@/lib/matchmaking";

// ============================================
// Types
// ============================================

interface ShareableMatchCardProps {
  person1Name: string;
  person2Name: string;
  person1Zodiac: ZodiacSign;
  person2Zodiac: ZodiacSign;
  score: number;
  baseUrl?: string;
}

// ============================================
// Share Button Component
// ============================================

function ShareButton({
  icon,
  label,
  onClick,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl ${color} text-white font-medium transition-all`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </motion.button>
  );
}

// ============================================
// Main Shareable Match Card Component
// ============================================

export function ShareableMatchCard({
  person1Name,
  person2Name,
  person1Zodiac,
  person2Zodiac,
  score,
  baseUrl = typeof window !== "undefined" ? window.location.origin : "",
}: ShareableMatchCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<"story" | "square" | "certificate">("story");

  const cardData: MatchCardData = {
    person1Name,
    person2Name,
    person1Zodiac,
    person2Zodiac,
    person1Symbol: ZODIAC_SYMBOLS[person1Zodiac],
    person2Symbol: ZODIAC_SYMBOLS[person2Zodiac],
    score,
    descriptor: getScoreDescriptor(score),
  };

  const shareData = {
    person1: person1Name,
    person2: person2Name,
    score,
    zodiac1: ZODIAC_SYMBOLS[person1Zodiac],
    zodiac2: ZODIAC_SYMBOLS[person2Zodiac],
  };

  const shareUrls = generateShareURLs(shareData, baseUrl);

  // Generate preview image
  const generatePreview = useCallback(async (type: typeof activeTab) => {
    setIsGenerating(true);
    try {
      let imageUrl: string;
      
      if (type === "story") {
        imageUrl = await generateMatchCardImage(cardData);
      } else if (type === "square") {
        imageUrl = await generateSquareMatchCard(cardData);
      } else {
        imageUrl = await generateMatchCertificate({
          ...cardData,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          certificateId: generateCertificateId(),
        });
      }
      
      setPreviewImage(imageUrl);
    } catch (error) {
      console.error("Failed to generate image:", error);
    }
    setIsGenerating(false);
  }, [cardData]);

  // Handle download
  const handleDownload = useCallback(() => {
    if (!previewImage) return;
    
    const filename = activeTab === "certificate" 
      ? `cosmic-certificate-${person1Name}-${person2Name}.png`
      : `cosmic-match-${person1Name}-${person2Name}.png`;
    
    downloadImage(previewImage, filename);
  }, [previewImage, activeTab, person1Name, person2Name]);

  // Handle native share
  const handleNativeShare = useCallback(async () => {
    if (!previewImage) return;
    
    const shared = await shareImage(
      previewImage,
      "Cosmic Match Result",
      `${person1Name} & ${person2Name} - ${score.toFixed(1)}% Compatibility!`
    );
    
    if (!shared) {
      // Fallback to share menu
      setShowShareMenu(true);
    }
  }, [previewImage, person1Name, person2Name, score]);

  // Copy to clipboard
  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrls.copy);
      // Could show a toast here
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = shareUrls.copy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  }, [shareUrls.copy]);

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Tab selector */}
      <div className="flex gap-2 mb-4">
        {(["story", "square", "certificate"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setPreviewImage(null);
            }}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-primary-600 text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {tab === "story" && "📱 Story"}
            {tab === "square" && "📷 Square"}
            {tab === "certificate" && "📜 Certificate"}
          </button>
        ))}
      </div>

      {/* Preview area */}
      <motion.div
        className="relative aspect-[9/16] sm:aspect-auto sm:h-[400px] rounded-2xl overflow-hidden bg-space-darker border border-white/10"
        layout
      >
        {previewImage ? (
          <motion.img
            src={previewImage}
            alt="Match Card Preview"
            className="w-full h-full object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="text-6xl mb-4">
              {ZODIAC_SYMBOLS[person1Zodiac]} 💫 {ZODIAC_SYMBOLS[person2Zodiac]}
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-2">
              {person1Name} & {person2Name}
            </h3>
            <p className="text-3xl font-bold text-primary-400 mb-2">
              {score.toFixed(1)}%
            </p>
            <p className="text-white/60 text-sm mb-6">
              {getScoreDescriptor(score)}
            </p>
            <motion.button
              onClick={() => generatePreview(activeTab)}
              disabled={isGenerating}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-cosmic-600 text-white font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    ✨
                  </motion.span>
                  Generating...
                </span>
              ) : (
                `Generate ${activeTab === "certificate" ? "Certificate" : "Image"}`
              )}
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Action buttons */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-4 space-y-3"
          >
            {/* Primary actions */}
            <div className="flex gap-2">
              <motion.button
                onClick={handleDownload}
                className="flex-1 py-3 rounded-xl bg-primary-600 text-white font-medium flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </motion.button>
              
              <motion.button
                onClick={handleNativeShare}
                className="flex-1 py-3 rounded-xl bg-cosmic-600 text-white font-medium flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </motion.button>
            </div>

            {/* Social share buttons */}
            <div className="flex gap-2 justify-center">
              <ShareButton
                icon={<span>📱</span>}
                label="WhatsApp"
                onClick={() => window.open(shareUrls.whatsapp, "_blank")}
                color="bg-green-600 hover:bg-green-700"
              />
              <ShareButton
                icon={<span>🐦</span>}
                label="Twitter"
                onClick={() => window.open(shareUrls.twitter, "_blank")}
                color="bg-sky-500 hover:bg-sky-600"
              />
              <ShareButton
                icon={<span>📘</span>}
                label="Facebook"
                onClick={() => window.open(shareUrls.facebook, "_blank")}
                color="bg-blue-600 hover:bg-blue-700"
              />
              <ShareButton
                icon={<span>📋</span>}
                label="Copy"
                onClick={handleCopyLink}
                color="bg-white/10 hover:bg-white/20"
              />
            </div>

            {/* Regenerate button */}
            <button
              onClick={() => generatePreview(activeTab)}
              className="w-full py-2 text-sm text-white/50 hover:text-white/80 transition-colors"
            >
              🔄 Regenerate
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ShareableMatchCard;
