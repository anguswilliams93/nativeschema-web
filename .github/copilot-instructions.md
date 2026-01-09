# Copilot Instructions for Zerobi Web

## Project Overview
Next.js 16 marketing site for Zerobi, built with App Router, TypeScript, and Tailwind CSS v4. Single-page application with scroll-based sections showcasing data analytics and AI consulting services.

**This codebase serves as a template for building similar marketing sites** - components are modular and reusable, making it easy to replicate designs by swapping content while preserving animations and styling patterns.

## Architecture & Structure

### Component Organization
- `app/`: Next.js App Router - `page.tsx` composes all sections, `layout.tsx` handles metadata & theme
- `components/`: All UI components (sections, modals, animations, utilities)
- `components/ui/`: shadcn/ui components (button, card, carousel, chart)
- `lib/`: Utilities - only `utils.ts` with `cn()` helper for class merging

### Client Components Pattern
**All components use `'use client'`** - this is an interactive, animation-heavy site with no SSR requirements. Every component in `/components` starts with this directive due to Motion.dev animations, state management, or browser APIs.

## Key Technologies & Patterns

### Animation System (Motion.dev)
Uses `motion/react` (NOT Framer Motion) throughout:

```tsx
// Standard pattern: AnimatedSection wrapper for scroll-triggered animations
<AnimatedSection direction="up" delay={0.2}>
  <YourContent />
</AnimatedSection>

// Staggered list animations
<StaggerContainer staggerDelay={0.15}>
  <StaggerItem>Item 1</StaggerItem>
  <StaggerItem>Item 2</StaggerItem>
</StaggerContainer>
```

**Key animation components:**
- `AnimatedSection` - Scroll-triggered fade-in with directional slide (up/down/left/right)
- `StaggerContainer` + `StaggerItem` - Sequential reveal of list items
- `ServiceModal` - Uses `AnimatePresence` for modal enter/exit transitions

### Styling Approach
- **Tailwind CSS v4** with `@import "tailwindcss"` syntax in `globals.css`
- Custom CSS variables for theming (light/dark) using `oklch()` color space
- `cn()` utility for merging Tailwind classes: `cn(baseClass, conditionalClass)`
- Custom dark mode variant: `@custom-variant dark (&:is(.dark *))`

### Theme Management
Custom theme provider (not next-themes) at `components/theme-provider.tsx`:
- Supports `light | dark | system` with localStorage persistence
- `suppressHydrationWarning` on `<html>` tag required due to theme script in `<head>`
- Theme script prevents flash by running before React hydration

### Path Aliases
All imports use `@/` prefix via TypeScript paths:
```tsx
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
```

## Component Conventions

### UI Component Library: shadcn/ui
**ALWAYS use shadcn/ui components for UI elements.** This project uses shadcn/ui as the primary component library.

**When to use shadcn/ui:**
- Buttons, inputs, forms → Use shadcn/ui components
- Cards, dialogs, modals → Use shadcn/ui components
- Navigation, tabs, dropdowns → Use shadcn/ui components
- Data tables, charts → Use shadcn/ui + Recharts integration
- Any standard UI element → Check shadcn/ui first

**Adding new shadcn/ui components:**
```bash
npx shadcn@latest add <component-name>
```

**Available shadcn/ui components in this project:**
- Located in `components/ui/`
- Already configured: button, card, carousel, chart
- Import pattern: `import { Button } from '@/components/ui/button'`

**DO NOT create custom implementations** of components that shadcn/ui provides. Always check the [shadcn/ui documentation](https://ui.shadcn.com/) before building new UI elements.

### Section Structure Pattern
Each major section follows this template:
```tsx
'use client'

export function MySection() {
  return (
    <section id="section-id" className="py-20 px-4">
      <AnimatedSection>
        <h2 className="text-3xl font-bold">Title</h2>
        {/* Content */}
      </AnimatedSection>
    </section>
  )
}
```

### Modal Pattern
See `service-modal.tsx` for reference:
- `AnimatePresence` for mount/unmount animations
- Escape key handling with `useEffect` cleanup
- Body scroll lock when open: `document.body.style.overflow = 'hidden'`
- Backdrop blur overlay + centered flexbox positioning

## Development Workflow

### Commands
```bash
npm run dev    # Start dev server (localhost:3000)
npm run build  # Production build
npm run lint   # ESLint check
```

### Adding Components
Use shadcn/ui CLI for new UI components (configured in `components.json`):
```bash
npx shadcn@latest add <component-name>
```

### Font Loading
JetBrains Mono loaded via `next/font/google` in `layout.tsx`, applied through CSS variable `--font-jetbrains-mono`

## Critical Notes

### Video Handling
`hero-section.tsx` has complex video autoplay logic with fallbacks:
- Manual `.play()` call required for Safari
- 3-second fallback timeout if video fails
- Multiple event listeners with cleanup (`canplaythrough`, timeouts)
- Always set `muted`, `playsInline`, `preload="auto"` for autoplay

### Type Safety
- Strict TypeScript enabled (`strict: true`)
- React 19 types: Use `React.ReactNode` for children, not `ReactNode`
- Motion.dev types: Import from `motion/react`, not `framer-motion`

### No Server Components
This project intentionally uses client-only rendering for all components. Do not add `'use server'` directives or attempt RSC patterns.

## Building Similar Designs from Website Data

### Workflow for Replicating Website Designs
When fetching data from a target website to build a similar design:

1. **Analyze Section Structure**
   - Identify distinct sections (hero, services, features, pricing, contact, etc.)
   - Map each section to existing components or create new ones following section patterns
   - Use `page.tsx` composition pattern to arrange sections in order

2. **Extract Content & Assets**
   - Pull text content, headings, descriptions from target site
   - Download or reference images, videos (use `public/` directory)
   - Note color schemes, fonts, spacing patterns

3. **Adapt Existing Components**
   - Start with similar section (e.g., `hero-section.tsx` for hero designs)
   - Replace content while preserving animation wrappers (`AnimatedSection`, `StaggerContainer`)
   - Maintain the `'use client'` directive and import structure

4. **Preserve Animation Patterns**
   ```tsx
   // Keep animation structure, change content
   <AnimatedSection direction="up" delay={0.1}>
     <h1>{extractedHeading}</h1>
     <p>{extractedDescription}</p>
   </AnimatedSection>
   ```

5. **Style Adaptation**
   - Use existing Tailwind classes as starting point
   - Modify colors via CSS variables in `globals.css` (keep `oklch()` format)
   - Adjust spacing/sizing with Tailwind utilities
   - Reference `cn()` utility for conditional classes

### Section Templates for Common Patterns

**Hero Section Pattern** (`hero-section.tsx` reference):
- Video/image background with overlay
- Centered content with typewriter effect
- Logo + heading + CTA buttons
- Loading state with fallback

**Feature/Service Grid** (`services-section.tsx` reference):
- Grid layout with responsive columns (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Card-based components with hover effects
- Modal for detailed views
- Staggered entrance animations

**Contact Forms** (`contact-section.tsx` reference):
- Form with validation patterns
- Cloudflare Turnstile integration available
- Submit button states and feedback

**Data Visualization** (`analytics-section.tsx` reference):
- Recharts library for charts/graphs
- Custom chart colors from CSS variables
- AnimatedSection wrapping for scroll-reveal

### Content Replacement Checklist
- [ ] Update `app/layout.tsx` metadata (title, description, keywords, favicons)
- [ ] Replace hero content and video/image assets
- [ ] Modify section headings, descriptions, feature lists
- [ ] Update service/product cards with new content
- [ ] Replace contact information and form endpoints
- [ ] Change logo in `zerobi-logo.tsx` or create new logo component
- [ ] Adjust color scheme in `app/globals.css` CSS variables
- [ ] Update font if needed (currently JetBrains Mono in `layout.tsx`)

### Key Files to Modify for New Designs
1. `app/page.tsx` - Section composition and order
2. `app/layout.tsx` - Metadata, fonts, theme setup
3. `app/globals.css` - Color scheme, custom variables
4. `components/*-section.tsx` - Individual section content
5. `public/` - Images, videos, icons, fonts
