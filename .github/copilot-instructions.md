# AI Copilot Instructions for ai-workflow-builder

## Project Overview

This is a **Next.js 16** application using React 19 with TypeScript. The project is a minimal starter intended for building workflow-related UI components. Architecture centers on Next.js App Router (server-first) with CSS-in-JS styling via Tailwind CSS v4.

### Key Technologies
- **Framework**: Next.js 16.1.5 with App Router (`app/` directory)
- **UI Library**: React 19.2.3 (functional components, hooks)
- **Styling**: Tailwind CSS v4 + PostCSS v4
- **Component Library**: Configured for shadcn/ui components (via `components.json`)
- **Type Safety**: TypeScript 5 with strict mode enabled
- **Code Quality**: Biome 2.3.13 (formatter + linter), ESLint 9
- **Icon Library**: Lucide React for SVG icons

## Architecture & File Structure

```
app/                    # Next.js App Router (page.tsx, layout.tsx)
  ├── layout.tsx        # Root layout with font setup (Geist fonts)
  ├── page.tsx          # Home page example (uses cn() utility)
  ├── globals.css       # Global Tailwind styles
lib/
  ├── utils.ts          # Shared utilities (cn = class composition)
public/                 # Static assets
components.json         # shadcn/ui configuration (aliases: @/components, @/ui, @/lib)
biome.json             # Code formatting & linting rules
tsconfig.json          # Strict TypeScript settings, path alias @/*
next.config.ts         # Next.js configuration (empty, ready for customization)
```

## Critical Conventions & Patterns

### 1. **Class Composition with `cn()` Utility**
Use the `cn()` function from [lib/utils.ts](lib/utils.ts) for all className assignments. It combines `clsx` and `tailwind-merge` to prevent conflicting Tailwind classes.

**Pattern**:
```tsx
import { cn } from "@/lib/utils";

export function MyComponent({ isActive }: { isActive: boolean }) {
  return (
    <div className={cn(
      "base-classes", 
      isActive && "conditional-classes"
    )}>
      Content
    </div>
  );
}
```

### 2. **Path Aliases**
All imports use the `@/` prefix (configured in `tsconfig.json`):
- `@/components` → `components/` (for shadcn/ui components)
- `@/lib` → `lib/` (utilities)
- `@/hooks` → `hooks/` (React hooks, directory doesn't exist yet)

### 3. **Formatting & Linting**
- **Formatter**: Biome (configured in `biome.json`) with tab indentation, double quotes
- **ESLint**: Next.js-recommended ruleset (`eslint-config-next`)
- **Commands**:
  - `npm run lint` → Run ESLint
  - `npm run dev` → Start dev server with hot reload
  - `npm run build` → Production build
  - `npm run start` → Serve production build
- **Auto-fix**: Biome organizes imports on save (configured in `assist` section)

### 4. **React 19 Considerations**
- Use functional components exclusively
- Hooks (useState, useEffect, etc.) are standard—no class components
- React 19's improved performance for server components in App Router

### 5. **Next.js App Router (Server-First)**
- [app/layout.tsx](app/layout.tsx) is the root layout—wraps all pages
- [app/page.tsx](app/page.tsx) is the homepage
- Create new pages as `app/[route]/page.tsx`
- Use `'use client'` directive only for interactive components

## Workflow Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (http://localhost:3000) with hot reload |
| `npm run lint` | Run ESLint checks |
| `npm run build` | Create optimized production build |
| `npm run start` | Serve production build locally |

## Key Dependencies & Their Roles

| Package | Role | Version |
|---------|------|---------|
| `lucide-react` | Icon component library | ^0.563 |
| `clsx` | Conditional className builder | ^2.1 |
| `tailwind-merge` | Merge Tailwind classes safely | ^3.4 |
| `class-variance-authority` | Typed component variant system | ^0.7.1 |
| `@tailwindcss/postcss` | Modern Tailwind CSS processing | ^4 |

## When Adding Features

1. **New Components**: Use shadcn/ui patterns; store in `components/` with path alias `@/components`
2. **New Utilities**: Add to `lib/` and export from `lib/utils.ts` or create domain-specific files
3. **Styling**: Always use Tailwind utility classes + `cn()` for composition
4. **Type Definitions**: Leverage TypeScript strict mode; avoid `any` types

## Integration Points

- **shadcn/ui** is pre-configured but no components added yet—use CLI to scaffold: `npx shadcn-ui@latest add [component]`
- **Next.js Font Optimization**: Geist font is auto-loaded in [app/layout.tsx](app/layout.tsx)
- **Tailwind CSS v4**: Configured via `@tailwindcss/postcss` plugin; no `tailwind.config.js` needed unless customization required
