/**
 * Viral Features Utility
 * 
 * Lightweight utilities for shareable content generation.
 * No heavy external dependencies - uses native Canvas and DOM APIs.
 */

// ============================================
// Fake Compatibility Score Generator
// ============================================

/**
 * Generate a fake but convincing compatibility score.
 * Always returns 92-99% for viral appeal.
 */
export function generateViralScore(): number {
  // Weighted towards higher numbers for better virality
  const weights = [
    { score: 99, weight: 15 },
    { score: 98, weight: 20 },
    { score: 97, weight: 20 },
    { score: 96, weight: 15 },
    { score: 95, weight: 12 },
    { score: 94, weight: 8 },
    { score: 93, weight: 6 },
    { score: 92, weight: 4 },
  ];

  const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
  let random = Math.random() * totalWeight;

  for (const { score, weight } of weights) {
    random -= weight;
    if (random <= 0) return score;
  }

  return 97; // Default fallback
}

/**
 * Generate a decimal score for extra authenticity.
 * Example: 97.3%, 98.7%
 */
export function generateViralScoreWithDecimal(): number {
  const base = generateViralScore();
  const decimal = Math.floor(Math.random() * 10) / 10;
  return base + decimal;
}

/**
 * Format score with mystical descriptors.
 */
export function getScoreDescriptor(score: number): string {
  if (score >= 98) return "Divine Union";
  if (score >= 96) return "Celestial Bond";
  if (score >= 94) return "Cosmic Harmony";
  if (score >= 92) return "Stellar Match";
  return "Blessed Connection";
}

// ============================================
// Share URL Generator
// ============================================

export interface ShareData {
  person1: string;
  person2: string;
  score: number;
  zodiac1: string;
  zodiac2: string;
}

/**
 * Generate shareable text for social media.
 */
export function generateShareText(data: ShareData): string {
  const emoji = data.score >= 97 ? "💫" : data.score >= 95 ? "✨" : "🌟";
  return `${emoji} ${data.person1} & ${data.person2} are a ${data.score.toFixed(1)}% Cosmic Match! ${data.zodiac1} × ${data.zodiac2} ${emoji}

Discover your celestial compatibility:`;
}

/**
 * Generate share URLs for different platforms.
 */
export function generateShareURLs(
  data: ShareData,
  baseUrl: string
): {
  whatsapp: string;
  twitter: string;
  facebook: string;
  copy: string;
} {
  const text = generateShareText(data);
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(baseUrl);

  return {
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    copy: `${text}\n${baseUrl}`,
  };
}

// ============================================
// Canvas-based Match Card Generator
// ============================================

export interface MatchCardData {
  person1Name: string;
  person2Name: string;
  person1Zodiac: string;
  person2Zodiac: string;
  person1Symbol: string;
  person2Symbol: string;
  score: number;
  descriptor: string;
}

/**
 * Generate a shareable match card image using Canvas.
 * Returns a data URL that can be shared or downloaded.
 */
export async function generateMatchCardImage(
  data: MatchCardData
): Promise<string> {
  // Create canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  // Mobile-optimized dimensions (Instagram story ratio)
  const width = 1080;
  const height = 1920;
  canvas.width = width;
  canvas.height = height;

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#0a0a1a");
  gradient.addColorStop(0.5, "#1a1a3a");
  gradient.addColorStop(1, "#0a0a1a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add starfield effect
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 2;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Cosmic glow in center
  const centerGlow = ctx.createRadialGradient(
    width / 2, height / 2, 0,
    width / 2, height / 2, 400
  );
  centerGlow.addColorStop(0, "rgba(139, 92, 246, 0.3)");
  centerGlow.addColorStop(0.5, "rgba(217, 70, 239, 0.1)");
  centerGlow.addColorStop(1, "transparent");
  ctx.fillStyle = centerGlow;
  ctx.fillRect(0, 0, width, height);

  // Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 48px 'Space Grotesk', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("COSMIC MATCH", width / 2, 200);

  // Zodiac symbols (large)
  ctx.font = "180px serif";
  ctx.fillText(data.person1Symbol, width / 2 - 200, height / 2 - 100);
  ctx.fillText(data.person2Symbol, width / 2 + 200, height / 2 - 100);

  // Heart/connection symbol
  ctx.font = "80px serif";
  ctx.fillStyle = "#d946ef";
  ctx.fillText("💫", width / 2, height / 2 - 100);

  // Names
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 56px 'Space Grotesk', sans-serif";
  ctx.fillText(data.person1Name, width / 2 - 200, height / 2 + 50);
  ctx.fillText("&", width / 2, height / 2 + 50);
  ctx.fillText(data.person2Name, width / 2 + 200, height / 2 + 50);

  // Zodiac names
  ctx.font = "36px 'Space Grotesk', sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.fillText(data.person1Zodiac, width / 2 - 200, height / 2 + 110);
  ctx.fillText(data.person2Zodiac, width / 2 + 200, height / 2 + 110);

  // Score circle
  const scoreY = height / 2 + 300;
  
  // Outer glow
  const scoreGlow = ctx.createRadialGradient(
    width / 2, scoreY, 80,
    width / 2, scoreY, 150
  );
  scoreGlow.addColorStop(0, "rgba(139, 92, 246, 0.4)");
  scoreGlow.addColorStop(1, "transparent");
  ctx.fillStyle = scoreGlow;
  ctx.beginPath();
  ctx.arc(width / 2, scoreY, 150, 0, Math.PI * 2);
  ctx.fill();

  // Score circle background
  ctx.beginPath();
  ctx.arc(width / 2, scoreY, 120, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(139, 92, 246, 0.2)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Score text
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 72px 'Space Grotesk', sans-serif";
  ctx.fillText(`${data.score.toFixed(1)}%`, width / 2, scoreY + 25);

  // Descriptor
  ctx.font = "bold 40px 'Space Grotesk', sans-serif";
  ctx.fillStyle = "#d946ef";
  ctx.fillText(data.descriptor, width / 2, scoreY + 200);

  // Decorative line
  ctx.strokeStyle = "rgba(139, 92, 246, 0.5)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 200, scoreY + 250);
  ctx.lineTo(width / 2 + 200, scoreY + 250);
  ctx.stroke();

  // Sanskrit-style decorative text
  ctx.font = "32px serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.fillText("॥ शुभ विवाह ॥", width / 2, scoreY + 320);
  ctx.fillText("Auspicious Union", width / 2, scoreY + 370);

  // Branding
  ctx.font = "28px 'Space Grotesk', sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillText("AstroMatchMaking", width / 2, height - 100);

  // Return as data URL
  return canvas.toDataURL("image/png", 0.9);
}

/**
 * Generate a square match card for Instagram feed.
 */
export async function generateSquareMatchCard(
  data: MatchCardData
): Promise<string> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  // Square dimensions for Instagram feed
  const size = 1080;
  canvas.width = size;
  canvas.height = size;

  // Background
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size
  );
  gradient.addColorStop(0, "#1a1a3a");
  gradient.addColorStop(1, "#0a0a1a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Stars
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Central glow
  const glow = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, 300);
  glow.addColorStop(0, "rgba(217, 70, 239, 0.2)");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  // Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 42px 'Space Grotesk', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("COSMIC MATCH", size / 2, 120);

  // Zodiac symbols
  ctx.font = "140px serif";
  ctx.fillText(data.person1Symbol, size / 2 - 180, size / 2 - 60);
  ctx.fillText(data.person2Symbol, size / 2 + 180, size / 2 - 60);

  // Connection
  ctx.font = "60px serif";
  ctx.fillStyle = "#d946ef";
  ctx.fillText("✧", size / 2, size / 2 - 60);

  // Names
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 48px 'Space Grotesk', sans-serif";
  ctx.fillText(`${data.person1Name} & ${data.person2Name}`, size / 2, size / 2 + 60);

  // Score
  ctx.font = "bold 96px 'Space Grotesk', sans-serif";
  ctx.fillStyle = "#d946ef";
  ctx.fillText(`${data.score.toFixed(1)}%`, size / 2, size / 2 + 200);

  // Descriptor
  ctx.font = "36px 'Space Grotesk', sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.fillText(data.descriptor, size / 2, size / 2 + 270);

  // Branding
  ctx.font = "24px 'Space Grotesk', sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.fillText("AstroMatchMaking", size / 2, size - 60);

  return canvas.toDataURL("image/png", 0.9);
}

// ============================================
// PDF Certificate Generator (Canvas-based)
// ============================================

/**
 * Generate a downloadable PDF-style certificate using Canvas.
 * Uses Canvas to create a high-quality image that mimics a PDF certificate.
 */
export async function generateMatchCertificate(
  data: MatchCardData & {
    date: string;
    certificateId: string;
  }
): Promise<string> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  // A4-ish landscape ratio
  const width = 1754;
  const height = 1240;
  canvas.width = width;
  canvas.height = height;

  // Parchment-style background
  const bgGradient = ctx.createLinearGradient(0, 0, width, height);
  bgGradient.addColorStop(0, "#1a1a2e");
  bgGradient.addColorStop(0.5, "#16213e");
  bgGradient.addColorStop(1, "#1a1a2e");
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  // Decorative border
  ctx.strokeStyle = "rgba(139, 92, 246, 0.5)";
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  // Inner border
  ctx.strokeStyle = "rgba(217, 70, 239, 0.3)";
  ctx.lineWidth = 2;
  ctx.strokeRect(60, 60, width - 120, height - 120);

  // Corner decorations
  const corners = [
    [80, 80], [width - 80, 80], 
    [80, height - 80], [width - 80, height - 80]
  ];
  ctx.fillStyle = "#d946ef";
  corners.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Header Sanskrit text
  ctx.font = "36px serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.textAlign = "center";
  ctx.fillText("॥ श्री गणेशाय नमः ॥", width / 2, 130);

  // Title
  ctx.font = "bold 64px 'Space Grotesk', serif";
  ctx.fillStyle = "#d946ef";
  ctx.fillText("Certificate of Cosmic Union", width / 2, 220);

  // Decorative line
  ctx.strokeStyle = "rgba(139, 92, 246, 0.6)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 300, 250);
  ctx.lineTo(width / 2 + 300, 250);
  ctx.stroke();

  // Main text
  ctx.font = "32px 'Space Grotesk', sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("This is to certify that", width / 2, 340);

  // Names
  ctx.font = "bold 56px 'Space Grotesk', sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`${data.person1Name}  ${data.person1Symbol}`, width / 2, 430);
  ctx.font = "36px serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("&", width / 2, 490);
  ctx.font = "bold 56px 'Space Grotesk', sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`${data.person2Symbol}  ${data.person2Name}`, width / 2, 560);

  // Compatibility statement
  ctx.font = "32px 'Space Grotesk', sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.fillText("have been cosmically evaluated and found to possess a", width / 2, 650);

  // Score
  ctx.font = "bold 72px 'Space Grotesk', sans-serif";
  ctx.fillStyle = "#d946ef";
  ctx.fillText(`${data.score.toFixed(1)}%`, width / 2, 750);

  // Descriptor
  ctx.font = "italic 40px 'Space Grotesk', sans-serif";
  ctx.fillStyle = "#8b5cf6";
  ctx.fillText(data.descriptor, width / 2, 820);

  // Blessing
  ctx.font = "28px 'Space Grotesk', sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.fillText("May the stars forever illuminate your shared path.", width / 2, 900);

  // Footer info
  ctx.font = "24px 'Space Grotesk', sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillText(`Certified on: ${data.date}`, width / 2 - 250, 1050);
  ctx.fillText(`Certificate ID: ${data.certificateId}`, width / 2 + 250, 1050);

  // Seal
  ctx.beginPath();
  ctx.arc(width / 2, 1000, 50, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(139, 92, 246, 0.2)";
  ctx.fill();
  ctx.strokeStyle = "#8b5cf6";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.font = "bold 24px serif";
  ctx.fillStyle = "#d946ef";
  ctx.fillText("✧", width / 2, 1010);

  // Sanskrit footer
  ctx.font = "28px serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.fillText("॥ शुभं भवतु ॥", width / 2, 1150);

  return canvas.toDataURL("image/png", 0.95);
}

// ============================================
// Download Utilities
// ============================================

/**
 * Download an image from a data URL.
 */
export function downloadImage(dataUrl: string, filename: string): void {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Share image using Web Share API (mobile-friendly).
 */
export async function shareImage(
  dataUrl: string,
  title: string,
  text: string
): Promise<boolean> {
  // Check if Web Share API is available
  if (!navigator.share || !navigator.canShare) {
    return false;
  }

  try {
    // Convert data URL to blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], "cosmic-match.png", { type: "image/png" });

    // Check if we can share files
    if (navigator.canShare({ files: [file] })) {
      await navigator.share({
        title,
        text,
        files: [file],
      });
      return true;
    }
  } catch (error) {
    console.log("Share failed:", error);
  }

  return false;
}

/**
 * Generate a unique certificate ID.
 */
export function generateCertificateId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const segments = [4, 4, 4];
  return segments
    .map(len => 
      Array.from({ length: len }, () => 
        chars[Math.floor(Math.random() * chars.length)]
      ).join("")
    )
    .join("-");
}

export default {
  generateViralScore,
  generateViralScoreWithDecimal,
  getScoreDescriptor,
  generateShareText,
  generateShareURLs,
  generateMatchCardImage,
  generateSquareMatchCard,
  generateMatchCertificate,
  downloadImage,
  shareImage,
  generateCertificateId,
};
