# AstroMatchMaking - Project Instructions

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Audio**: Howler.js

## Project Architecture

### Folder Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   └── (routes)/           # Route groups
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components (Header, Footer, etc.)
│   └── animations/         # Framer Motion animation wrappers
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and configurations
│   ├── utils.ts            # Helper functions
│   ├── sounds.ts           # Howler.js sound management
│   └── animations.ts       # Framer Motion variants
├── types/                  # TypeScript type definitions
├── constants/              # App constants and configurations
└── providers/              # React context providers
```

## Development Guidelines

### Animations
- Use Framer Motion for all UI animations
- Define reusable animation variants in `lib/animations.ts`
- Wrap animated components in dedicated animation components

### Audio
- Manage all sounds through `lib/sounds.ts`
- Use Howler.js for audio playback
- Preload sounds for better UX

### Styling
- Use Tailwind CSS utility classes
- Define custom theme extensions in `tailwind.config.ts`
- Use CSS variables for theming

### TypeScript
- Strict mode enabled
- Define all types in `types/` directory
- Use proper typing for all components and functions

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
