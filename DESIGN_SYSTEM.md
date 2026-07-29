# Master OS Premium UI System

## Overview

Master OS features a complete professional, enterprise-grade UI system inspired by top-tier SaaS platforms (Linear, Stripe, Vercel). The design system emphasizes simplicity, sophistication, and maximum usability.

## Design Philosophy

- **Premium First**: Every element is crafted for a $5k+/month SaaS platform
- **Restraint**: Beautiful simplicity without unnecessary decoration
- **Construction-Relevant**: Color palette reflects roofing/construction industry
- **Accessible**: WCAG AA compliant, keyboard navigable, semantic HTML
- **Performance**: Optimized animations, efficient CSS, minimal JavaScript

## Color Palette

### Primary Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-teal-600` | `#0d9488` | Primary CTA, brand accent |
| `--color-teal-500` | `#14b8a6` | Hover states, interactive |
| `--color-teal-400` | `#2dd4bf` | Light text, links |

**Why Teal?** Sophisticated, professional, and relevant to construction/roofing (modern materials, precision). Unlike default blue (overused), it stands apart.

### Accent Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-blue-600` | `#2563eb` | Secondary information |
| `--color-amber-500` | `#d97706` | Warnings, status indicators |
| `--color-slate-*` | Various | Neutrals, backgrounds |

### Semantic

| Token | Color | Usage |
|-------|-------|-------|
| Success | `#10b981` | Positive states, confirmations |
| Warning | `#f59e0b` | Caution, attention needed |
| Danger | `#ef4444` | Errors, destructive actions |

## Typography Scale

### Heading Hierarchy

```
h1: 3rem (48px) - Page titles
h2: 2.25rem (36px) - Section headers
h3: 1.75rem (28px) - Subsections
h4: 1.25rem (20px) - Card titles
h5: 1.125rem (18px) - UI labels
h6: 1rem (16px) - Small titles
```

### Font Stack

```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
--font-display: (same as sans for system consistency)
--font-mono: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
```

**Why system fonts?** They render perfectly on every device, load instantly, and feel native. This is a proven premium design pattern.

## Component Library

### Hero Component

Premium hero section with optional badges, title, subtitle, and CTAs.

```tsx
<Hero
  title="Master Your Roofing Business"
  subtitle="Professional management platform for contractors"
  badges={['Enterprise-Ready', 'Industry-Leading']}
  cta={{ text: 'Get Started', href: '/dashboard', variant: 'primary' }}
  secondaryCTA={{ text: 'Learn More', href: '#features' }}
>
  {/* Optional children */}
</Hero>
```

**Features:**
- Gradient text support
- Badge system (new, popular, etc.)
- Dual CTA pattern
- Trust indicators section
- Responsive typography

### FeaturesGrid Component

Showcase features in a responsive grid (3 or 4 columns).

```tsx
<FeaturesGrid
  title="Powerful Features"
  subtitle="Everything you need"
  features={[
    {
      icon: '📊',
      title: 'Dashboard',
      description: 'Real-time analytics'
    }
  ]}
  columns={4}
/>
```

**Features:**
- Icon wrapper with gradient background
- Smooth hover animations
- Staggered fade-in animation
- Icon scale on hover
- Flexible 3-4 column layout

### CTAGrid Component

Call-to-action card grid for quick access or business links.

```tsx
<CTAGrid
  title="Get Started"
  cards={[
    {
      icon: '📊',
      title: 'View Dashboard',
      description: 'Real-time metrics',
      href: '/dashboard'
    }
  ]}
/>
```

**Features:**
- Card hover elevation effect
- Link support (internal & external)
- Icon emoji support
- Staggered animations

### PremiumNavigation Component

Fixed header + sidebar navigation with mobile responsiveness.

**Features:**
- Fixed header with glassmorphism
- Collapsible sidebar (mobile/desktop)
- Active state indicators
- Quick external links
- Logo with brand mark

## Spacing Scale

```
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem (16px) ← Base unit
--space-6: 1.5rem (24px)
--space-8: 2rem (32px)
--space-12: 3rem (48px)
--space-16: 4rem (64px)
--space-20: 5rem (80px)
--space-24: 6rem (96px)
```

**Base unit: 1rem (16px).** All spacing follows multiples of 4px for visual rhythm.

## Border Radius Scale

```
--radius-sm: 0.375rem (6px) - Small elements
--radius-md: 0.5rem (8px) - Input fields, buttons
--radius-lg: 0.75rem (12px) - Cards, modals
--radius-xl: 1rem (16px) - Large cards, hero
--radius-2xl: 1.5rem (24px) - Extra large elements
```

**Design principle:** Subtle roundness, not playful. Matches enterprise SaaS (Linear, Stripe).

## Shadow System

```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.3)     (subtle)
--shadow-sm: 0 2px 4px 0 rgba(0, 0, 0, 0.4)     (soft)
--shadow-md: 0 6px 16px 0 rgba(0, 0, 0, 0.5)    (elevated)
--shadow-lg: 0 12px 32px 0 rgba(0, 0, 0, 0.6)   (floating)
--shadow-xl: 0 20px 48px 0 rgba(0, 0, 0, 0.7)   (dramatic)
```

Shadows use consistent blur radius and offset. Applied on hover/active states for depth feedback.

## Button System

### Primary Button
```css
.btn-primary {
  background: linear-gradient(135deg, var(--color-teal-600), var(--color-teal-500));
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
}

.btn-primary:hover {
  box-shadow: 0 8px 24px rgba(13, 148, 136, 0.4);
  transform: translateY(-2px);
}
```

### Secondary Button
Clean card background with border, elevates on hover.

### Ghost Button
Transparent with border, minimal visual weight until interaction.

### Size Variants
- `btn-sm`: Compact, for toolbars
- `btn` (default): Standard, for most CTAs
- `btn-lg`: Large, for hero sections

## Animation System

### Keyframes

**fadeInUp:** Used for section reveals and staggered lists.
```css
from {
  opacity: 0;
  transform: translateY(24px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
```

**scaleIn:** Used for modal-like reveals.
**slideDown:** Used for dropdowns and menus.
**pulse:** Used for loading states.

### Transition Durations

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)  (micro-interactions)
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1)  (standard)
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1)  (dramatic)
```

**Easing:** All use `cubic-bezier(0.4, 0, 0.2, 1)` for consistent, professional feel.

### Stagger Pattern

Components use `.stagger` class for sequential animations:
```css
.stagger > *:nth-child(1) { animation-delay: 0ms; }
.stagger > *:nth-child(2) { animation-delay: 100ms; }
.stagger > *:nth-child(3) { animation-delay: 200ms; }
/* ... up to 6 items */
```

## Card System

Premium cards with:
- Subtle background gradient
- Soft border
- Backdrop blur
- Smooth hover transition (background shift, shadow elevation, slight lift)
- Icon animation support

### Usage

```tsx
<div className="card">
  {/* Content */}
</div>

<a href="/..." className="card cursor-pointer group">
  <div className="icon-wrapper">📊</div>
  <h3>Title</h3>
  <p>Description</p>
  <div className="group-hover:gap-3">Link Text →</div>
</a>
```

## Badge System

Compact label for status, feature tags, or highlights.

```tsx
<span className="badge badge-primary">✨ Enterprise-Ready</span>
```

**Variants:**
- `badge-primary`: Brand color (teal)
- `badge-success`: Green confirmation
- `badge-warning`: Amber attention
- `badge-danger`: Red destructive

## Responsive Design

### Breakpoints (Tailwind standard)

```
sm: 640px   - Mobile landscape
md: 768px   - Tablet
lg: 1024px  - Desktop
xl: 1280px  - Wide desktop
2xl: 1536px - Ultra-wide
```

### Mobile-First Approach

All components are designed mobile-first, with progressive enhancement at larger breakpoints.

### Navigation

- Mobile: Hamburger menu + sidebar (off-canvas)
- Desktop: Fixed sidebar + header

## Accessibility

- Semantic HTML (`<button>`, `<a>`, `<nav>`, `<section>`)
- WCAG AA color contrast (all text ≥ 4.5:1)
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators on all interactive elements
- `aria-label` on icon-only buttons
- `role` attributes where necessary

## Performance

- CSS custom properties instead of Tailwind for critical values
- No unused CSS (Tailwind purges unused classes)
- Minimal JavaScript (mostly Next.js frameworks)
- Optimized animations (GPU acceleration via `transform`)
- SVG icons (minimal file size)
- Lazy-loaded images on dashboard pages

## Usage Examples

### Landing Page with Hero + Features

```tsx
import { Hero, FeaturesGrid } from '@/components/Premium';

export default function Home() {
  return (
    <>
      <Hero
        title="Main Heading"
        subtitle="Supporting text"
        cta={{ text: 'Start', href: '/app' }}
      />
      <FeaturesGrid
        title="Features"
        features={[...]}
      />
    </>
  );
}
```

### Custom Card Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <div key={item.id} className="card group">
      <h3 className="text-lg font-bold">{item.title}</h3>
      <p className="text-sm text-color-text-tertiary">{item.desc}</p>
    </div>
  ))}
</div>
```

## CSS Custom Properties Reference

All tokens available as CSS variables in `:root`:

```css
/* Colors */
var(--color-teal-600)
var(--color-blue-500)
var(--color-text-primary)
var(--color-bg-elevated)
var(--color-border-default)

/* Spacing */
var(--space-4)  /* 1rem */
var(--space-8)  /* 2rem */

/* Borders */
var(--radius-lg)  /* 0.75rem */

/* Shadows */
var(--shadow-md)

/* Typography */
var(--font-sans)
var(--font-mono)

/* Transitions */
var(--transition-base)  /* 200ms cubic-bezier(...) */
```

## Tailwind CSS Configuration

Master OS uses **Tailwind CSS 4** with custom color extensions:

```tailwind.config.ts
extend: {
  colors: {
    teal: { 600: '#0d9488', 500: '#14b8a6', ... }
    slate: { 900: '#0f1117', ... }
  }
}
```

All color tokens are CSS custom properties, not Tailwind utilities, for consistency.

## Best Practices

1. **Use components**: Hero, FeaturesGrid, CTAGrid for consistency
2. **Spacing**: Always use `--space-*` variables (never hardcode px)
3. **Colors**: Use CSS custom properties (`var(--color-*)`)
4. **Animations**: Prefer `.animate-fade-in` over custom keyframes
5. **Responsive**: Mobile-first design, test at 375px minimum
6. **Contrast**: Always check color combinations for WCAG AA
7. **Buttons**: Use `.btn-primary` for main CTAs, `.btn-secondary` for others
8. **Cards**: Add `.group` for hover effects on entire card
9. **Icons**: Use emoji for simple cases, SVG for complex graphics
10. **Typography**: Respect heading hierarchy, never skip levels

## Future Enhancements

- Dark/light mode toggle (CSS variable swap)
- Theme customization API
- Storybook component library
- Design token generation from Figma
- Internationalization (RTL support)
- Advanced data visualization components
- Form builder component suite

---

**Last Updated:** 2026-07-29
**Version:** 1.0.0
**Status:** Production-Ready
