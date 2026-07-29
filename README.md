# Master OS - Roofing Project Management Frontend

A comprehensive Next.js frontend for roofing project management with a professional design system and state management.

## Project Structure

```
master-os/
├── app/                    # Next.js app directory
│   ├── login/             # Login page
│   ├── dashboard/         # Dashboard
│   ├── projects/          # Projects management
│   ├── quotes/            # Quote management
│   ├── crew/              # Crew management
│   ├── gallery/           # Project gallery
│   ├── invoicing/         # Invoice management
│   ├── settings/          # App settings
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── Layout.tsx         # Main layout component
│   └── ui.tsx             # Reusable UI components
├── config/
│   └── designTokens.ts    # Design tokens (colors, spacing, etc.)
├── stores/
│   ├── authStore.ts       # Auth state management (Zustand)
│   ├── projectsStore.ts   # Projects state management (Zustand)
│   └── crewStore.ts       # Crew state management (Zustand)
├── types/
│   └── index.ts           # TypeScript interfaces
├── lib/                   # Utility functions
├── tailwind.config.js     # Tailwind configuration
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies

## Features

### Design System
- **Tailwind 4** configuration with custom color palette
- **Color Scheme**:
  - Primary: #0066CC (Blue)
  - Secondary: #FF6B35 (Orange)
  - Accent: #00D99F (Green)
  - Neutral: Comprehensive gray scale
  - Status colors: Success, Warning, Error, Info
- **Design Tokens**: Centralized spacing, typography, shadows, and animations
- **No Hardcoded Colors**: All colors use design tokens

### Components
- **Button**: Multiple variants (primary, secondary, accent, ghost) and sizes
- **Card**: Reusable card container with hover effects
- **Input**: Form input with labels, error messages, and help text
- **Badge**: Status indicators with multiple variants
- **Layout**: Responsive layout with sidebar navigation

### Pages (8 Core Pages)
1. **Login** (`/login`)
   - Email/password form
   - Error handling
   - Demo credentials info

2. **Dashboard** (`/dashboard`)
   - KPI cards (projects, team, revenue)
   - Recent projects list
   - Quick actions panel

3. **Projects** (`/projects`)
   - Project grid with cards
   - Search and filter capabilities
   - Status badges
   - Project details preview

4. **Quotes** (`/quotes`)
   - Quote management table
   - Status filtering
   - Client information
   - Amount tracking

5. **Crew Management** (`/crew`)
   - Team member cards
   - Role and expertise display
   - Status indicators
   - Member profiles

6. **Gallery** (`/gallery`)
   - Project gallery showcase
   - Featured projects
   - Image counts
   - Roof type categorization

7. **Invoicing** (`/invoicing`)
   - Invoice summary statistics
   - Invoice table with status
   - Payment tracking
   - Client information

8. **Settings** (`/settings`)
   - Company information
   - App preferences (theme)
   - Notification settings
   - Danger zone (account deletion)

### State Management (Zustand)
- **AuthStore**: User authentication and session
- **ProjectsStore**: Roofing projects CRUD operations
- **CrewStore**: Crew member management

### TypeScript Interfaces
Complete type definitions for:
- Users and Authentication
- Roofing Projects and Materials
- Quotes
- Crew Management
- Gallery and Media
- Invoicing
- Company Settings
- Dashboard Statistics

## Getting Started

### Installation
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development
```bash
npm run dev
```

Open [http://localhost:3000/login](http://localhost:3000/login) in your browser.

### Build
```bash
npm run build
npm start
```

## Design Token Usage

Use design tokens throughout the application instead of hardcoded colors:

```typescript
import { designTokens } from '@/config/designTokens';

// Using colors
backgroundColor: designTokens.colors.primary;
color: designTokens.colors.neutral[700];

// Using spacing
padding: designTokens.spacing.lg;
gap: designTokens.spacing.md;

// Using typography
fontSize: designTokens.fontSize.lg;
fontWeight: designTokens.fontWeight.bold;

// Using shadows
boxShadow: designTokens.shadow.md;

// Using transitions
transition: `all ${designTokens.transition.normal}`;
```

## Component Usage Examples

### Button
```tsx
<Button variant="primary" size="lg" fullWidth>
  Click Me
</Button>

<Button variant="ghost" isLoading={isLoading}>
  Submit
</Button>
```

### Input
```tsx
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error={error}
  helpText="We'll never share your email"
/>
```

### Card
```tsx
<Card hover style={{ padding: designTokens.spacing.lg }}>
  Card content here
</Card>
```

### Badge
```tsx
<Badge variant="success">Completed</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Cancelled</Badge>
```

## Notes

- All pages are client-side components (`'use client'`)
- State management is mock-based (Zustand stores have TODO comments for API integration)
- Responsive design uses CSS Grid and Flexbox
- Mobile-first responsive design with breakpoints
- Sidebar navigation hides on mobile (use hamburger menu in production)

## Next Steps

1. Integrate with backend API
2. Add API calls in Zustand stores
3. Implement authentication flow
4. Add form validation library (e.g., react-hook-form)
5. Add toast notifications (e.g., react-hot-toast)
6. Implement actual image uploads for gallery
7. Add PDF generation for invoices/quotes
8. Implement real-time updates with WebSockets

## License

Proprietary - Master OS
