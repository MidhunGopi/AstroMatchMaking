# AstroMatchMaking

> Where the stars align for meaningful connections

A modern Next.js 14 application for astrological matchmaking with beautiful animations and immersive audio experiences.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Audio**: [Howler.js](https://howlerjs.com/)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with fonts and providers
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles and Tailwind
│   └── (routes)/           # Route groups (add as needed)
│
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components (Header, Footer)
│   └── animations/         # Framer Motion animation wrappers
│
├── hooks/                  # Custom React hooks
│   └── useMediaQuery.ts    # Responsive design hook
│
├── lib/                    # Utility functions
│   ├── utils.ts            # Helper functions (cn, debounce, etc.)
│   ├── sounds.ts           # Howler.js sound management
│   └── animations.ts       # Framer Motion variants
│
├── types/                  # TypeScript type definitions
│   └── index.ts            # Shared types
│
├── constants/              # App constants
│   └── index.ts            # Routes, keys, breakpoints
│
└── providers/              # React context providers
    ├── index.tsx           # Combined providers wrapper
    └── SoundProvider.tsx   # Audio context
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Design System

### Colors

The app uses a cosmic-themed color palette:

- **Primary**: Purple gradient (`primary-500` to `primary-900`)
- **Cosmic**: Blue accent (`cosmic-400` to `cosmic-600`)
- **Space**: Dark backgrounds (`space-dark`, `space-deeper`)

### Typography

Three font families are configured:

1. **Inter** (`font-sans`): Body text
2. **Space Grotesk** (`font-display`): Headings
3. **JetBrains Mono** (`font-mono`): Code/technical

### Animations

Pre-built Framer Motion variants in `lib/animations.ts`:

- `fadeIn`, `fadeInUp`, `fadeInDown`
- `scaleIn`, `scaleInBounce`
- `staggerContainer` (for lists)
- `pageTransition` (for route changes)

### Audio

Sound management through `lib/sounds.ts`:

- Automatic initialization on first user interaction
- Respects user's reduced motion preference
- Global mute/unmute controls via `useSound` hook

## Adding Components

### UI Components

Create in `src/components/ui/`:

```tsx
// src/components/ui/Button.tsx
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "btn",
        variant === "primary" && "btn-primary",
        variant === "secondary" && "btn-secondary",
        variant === "ghost" && "btn-ghost",
        className
      )}
      {...props}
    />
  );
}
```

### Animation Wrappers

Create in `src/components/animations/`:

```tsx
// src/components/animations/FadeIn.tsx
"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { ReactNode } from "react";

export function FadeIn({ children }: { children: ReactNode }) {
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
}
```

## Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
# API endpoints
NEXT_PUBLIC_API_URL=https://api.astromatchmaking.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## Contributing

1. Follow the existing folder structure
2. Use TypeScript strict mode
3. Add animations through the centralized variants
4. Manage audio through the SoundProvider

## License

MIT © AstroMatchMaking Team
