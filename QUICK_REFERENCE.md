# Master OS Premium UI - Quick Reference

## 🎨 Color System (Copy-Paste Ready)

### Primary Brand Colors
```
Teal 600: #0d9488  ← Main CTA, focus states
Teal 500: #14b8a6  ← Hover states
Teal 400: #2dd4bf  ← Light text, links
```

### Backgrounds
```
Deep Black:   #0a0c0f  ← Main background
Dark Slate:   #0f1117  ← Secondary
Card:         #1c1f26  ← Cards, modals
Hover:        #252d38  ← Hover state
```

### Text Colors
```
Primary:   #f1f5f9  ← Main text
Secondary: #cbd5e1  ← Supporting text
Tertiary:  #94a3b8  ← Muted text
Muted:     #64748b  ← Disabled, very light
```

### Accent Colors
```
Success: #10b981  ← Confirmations
Warning: #f59e0b  ← Cautions
Danger:  #ef4444  ← Errors
Blue:    #3b82f6  ← Secondary accent
```

---

## 🧩 Component Quick Start

### Hero Section
```tsx
<Hero
  title="Your Heading"
  subtitle="Your subtitle text"
  badges={['Badge 1', 'Badge 2']}
  cta={{ text: 'CTA Text', href: '/path' }}
  secondaryCTA={{ text: 'Secondary', href: '/path' }}
/>
```

### Features Grid
```tsx
<FeaturesGrid
  title="Section Title"
  subtitle="Optional subtitle"
  features={[
    { icon: '📊', title: 'Title', description: 'Text' },
    // ...
  ]}
  columns={4}  // or 3
/>
```

### CTA Cards
```tsx
<CTAGrid
  title="Section Title"
  cards={[
    { icon: '📊', title: 'Title', description: 'Text', href: '/path' },
    // ...
  ]}
/>
```

---

## 🎯 Typography Quick Reference

| Element | Size | Weight | Letter-Spacing |
|---------|------|--------|-----------------|
| h1 | 3rem | 700 | -0.02em |
| h2 | 2.25rem | 700 | -0.015em |
| h3 | 1.75rem | 600 | -0.01em |
| h4 | 1.25rem | 600 | 0 |
| p | 1rem | 400 | 0 |
| p.lead | 1.125rem | 400 | 0 |
| p.small | 0.875rem | 400 | 0 |

---

## 📐 Spacing Scale (Use These!)

```
--space-1  = 4px
--space-2  = 8px
--space-3  = 12px
--space-4  = 16px   ← Base unit
--space-6  = 24px
--space-8  = 32px
--space-12 = 48px
--space-16 = 64px
--space-20 = 80px
--space-24 = 96px
```

**Never use arbitrary values.** Always use `var(--space-*)` or Tailwind spacing (p-4, m-6, gap-8, etc.)

---

## 🔘 Button Variants

### Primary Button (Main CTAs)
```tsx
<button className="btn btn-primary">Click Me</button>
<button className="btn btn-primary btn-lg">Large</button>
<button className="btn btn-primary btn-sm">Small</button>
```

### Secondary Button (Alternative)
```tsx
<button className="btn btn-secondary">Secondary</button>
```

### Ghost Button (Minimal)
```tsx
<button className="btn btn-ghost">Ghost</button>
```

### Icon Button
```tsx
<button className="btn btn-icon btn-primary">
  <IconComponent />
</button>
```

---

## 🎴 Card Component

### Basic Card
```tsx
<div className="card">
  <h3>Title</h3>
  <p>Description</p>
</div>
```

### Interactive Card with Icon
```tsx
<div className="card card-feature group">
  <div className="icon-wrapper">📊</div>
  <h3>Title</h3>
  <p>Description</p>
</div>
```

### Clickable Card (Link)
```tsx
<Link href="/path" className="card group cursor-pointer">
  <h3>Title</h3>
  <p>Description</p>
  <span className="group-hover:gap-3">Learn More →</span>
</Link>
```

---

## ✨ Animation Classes

| Class | Usage |
|-------|-------|
| `.animate-fade-in` | Section/element reveal (300ms) |
| `.animate-fade-in-up` | Staggered list items (300ms) |
| `.animate-slide-down` | Dropdown menus (150ms) |
| `.animate-scale-in` | Modal/dialog appears (200ms) |
| `.animate-pulse-subtle` | Loading state (2s loop) |

### Stagger Pattern (Auto-delays)
```tsx
<div className="stagger">
  <div>Item 1 (delay: 0ms)</div>
  <div>Item 2 (delay: 100ms)</div>
  <div>Item 3 (delay: 200ms)</div>
</div>
```

---

## 🎨 Gradient Utilities

### Text Gradient (Teal → Blue)
```tsx
<h1 className="text-gradient">Gradient Text</h1>
```

### Background Gradient
```tsx
<div className="gradient-primary">Content</div>
<div className="gradient-secondary">Content</div>
```

---

## 🏷️ Badge Component

```tsx
<span className="badge badge-primary">✨ New Feature</span>
<span className="badge badge-success">Active</span>
<span className="badge badge-warning">Caution</span>
<span className="badge badge-danger">Deprecated</span>
```

---

## 📱 Responsive Patterns

### Mobile-First Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Auto-responsive */}
</div>
```

### Show/Hide by Screen
```tsx
<div className="hidden md:block">Desktop Only</div>
<div className="block md:hidden">Mobile Only</div>
```

### Responsive Padding
```tsx
<section className="px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
```

---

## 🌐 CSS Custom Properties (Reference)

### Colors
```css
var(--color-teal-600)
var(--color-teal-500)
var(--color-blue-600)
var(--color-amber-500)
var(--color-text-primary)
var(--color-bg-elevated)
var(--color-border-default)
```

### Spacing
```css
var(--space-4)
var(--space-6)
var(--space-8)
/* All the way to --space-24 */
```

### Borders & Shadows
```css
var(--radius-lg)
var(--shadow-md)
var(--transition-base)
```

---

## 📋 Accessibility Checklist

- ✅ Use semantic HTML (`<button>`, `<a>`, `<nav>`)
- ✅ Heading hierarchy (h1 → h6, no skips)
- ✅ Link text descriptive (not "click here")
- ✅ Color contrast ≥ 4.5:1
- ✅ Focus indicators visible
- ✅ `aria-label` on icon-only buttons
- ✅ Keyboard navigation tested (Tab, Enter, Escape)

---

## 🚀 Best Practices

1. **Always mobile-first** - Design for mobile, enhance for desktop
2. **Use components** - Hero, FeaturesGrid, CTAGrid for consistency
3. **Token-based values** - Never hardcode spacing/colors
4. **Test contrast** - Verify all text meets WCAG AA
5. **Respect hierarchy** - Don't skip heading levels
6. **Animate purpose** - Not decoration, but guidance
7. **Keep it simple** - Delete before adding
8. **Performance first** - Measure, optimize, measure again
9. **Document changes** - Update DESIGN_SYSTEM.md
10. **Version control** - Commit design changes with code

---

## 🔄 Common Patterns

### Section with Title + Grid
```tsx
<section className="py-20">
  <div className="container mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Title</h2>
      <p className="lead max-w-2xl mx-auto">Subtitle</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Content */}
    </div>
  </div>
</section>
```

### Hero with Trust Metrics
```tsx
<section className="py-20">
  <h1>Main Heading</h1>
  <p className="lead">Subtitle</p>
  <div className="mt-16 pt-12 border-t border-color-border-default">
    <div className="grid grid-cols-3 gap-8">
      {metrics.map(m => (
        <div key={m}>
          <div className="text-3xl font-bold">{m.value}</div>
          <div className="text-sm text-color-text-tertiary">{m.label}</div>
        </div>
      ))}
    </div>
  </div>
</section>
```

### Form Input Pattern
```tsx
<input
  type="text"
  placeholder="Your placeholder..."
  className="w-full border border-color-border-default 
             rounded-lg bg-color-bg-tertiary px-4 py-3
             text-color-text-primary focus:outline-none 
             focus:border-color-teal-500"
/>
```

---

## 📚 File Reference

| File | Purpose |
|------|---------|
| `app/globals.css` | All design tokens & component styles |
| `components/Premium/Hero.tsx` | Hero section component |
| `components/Premium/FeaturesGrid.tsx` | Feature showcase component |
| `components/Premium/CTAGrid.tsx` | CTA card grid component |
| `components/Premium/Navigation.tsx` | Header + sidebar navigation |
| `app/page.tsx` | Landing page (uses all components) |
| `DESIGN_SYSTEM.md` | Comprehensive design documentation |

---

## 🎯 Development Workflow

1. **Start with mobile (375px)**
2. **Use component system** - Hero, Grid, CTA, Navigation
3. **Apply spacing scale** - Use `--space-*` variables
4. **Test contrast** - Verify text colors meet WCAG AA
5. **Add animations** - Fade-in for reveals, transitions for interactions
6. **Responsive breakpoints** - Test at 768px (tablet) and 1024px (desktop)
7. **Performance check** - Keep LCP under 2.5s, FID under 100ms
8. **Accessibility audit** - Tab through, test keyboard navigation
9. **Cross-browser test** - Chrome, Firefox, Safari, Edge
10. **Update documentation** - Note any new patterns or tokens

---

## 💡 Pro Tips

- Use `.group` on card containers for coordinated hover effects
- Stagger animations with `.stagger` + `animation-delay`
- Always use gradient for text with `.text-gradient`
- Icon wrappers get `.icon-wrapper` for consistent styling
- Use `group-hover:*` for nested hover effects
- Lead text uses `p.lead` for larger, emphasize text
- Small text uses `p.small` for deemphasized content
- Avoid hardcoding colors—always use CSS variables
- Test dark mode by inspecting computed styles

---

## ✅ Checklist Before Shipping

- [ ] Build passes (`npm run build`)
- [ ] No console errors or warnings
- [ ] All links work
- [ ] Mobile responsive (test at 375px)
- [ ] Tablet layout correct (768px)
- [ ] Desktop layout polished (1024px)
- [ ] Color contrast verified (WCAG AA)
- [ ] Keyboard navigation works
- [ ] Animations smooth (60fps)
- [ ] Load time < 2.5s
- [ ] Page tested in 2+ browsers
- [ ] Documentation updated

---

**Last Updated:** July 29, 2026 | **Version:** 1.0.0 | **Status:** ✅ Production Ready
