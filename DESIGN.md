# DMC Tech — Design System & Engineering Guidelines

This document defines the visual architecture, design tokens, typography rules, layout conventions, and component patterns for the **DMC Tech** website codebase. Any AI assistant or developer building new sections or components MUST adhere strictly to these standards.

---

## 1. Aesthetic Identity & Core Principles

* **Design Style:** NVRMND / Swiss Precision Neo-Brutalism.
* **Core Rule (Zero Radius):** Everything is strictly sharp-edged. No rounded corners (`border-radius: 0 !important` is globally enforced). Do not use Tailwind `rounded-*` classes.
* **Color Contrast:** Industrial monochrome baseline paired with high-voltage accents (Electric Cobalt Blue & Acid Lime in Light Mode; Dark Warm Espresso & Terracotta in Dark Mode).
* **Architectural Grid:** Layouts use clean, visible 1px borders (`border-border-harsh` and `border-border-subtle`) separating cards, columns, and sections like architectural blueprint lines.
* **Tactility & Depth:** Hard 2D shadow offsets (`4px 4px 0px`), low-opacity film grain overlay (`.grain-overlay`), and snappy micro-interactions.

---

## 2. Color Palette & CSS Variables

All color references MUST use CSS variable tokens or registered Tailwind theme utilities (`bg-bg-page`, `text-text-primary`, `text-accent`, etc.).

### Light Mode Tokens (Default)
| CSS Variable | Tailwind Utility | Hex / Value | Purpose |
| :--- | :--- | :--- | :--- |
| `--bg-page` | `bg-bg-page` | `#D9D9D9` | Industrial Concrete Page Background |
| `--bg-card` | `bg-bg-card` | `#E5E5E5` | Card / Surface Background |
| `--bg-dark` | `bg-bg-dark` | `#0000FF` | Primary Dark / Solid Accent Fill |
| `--text-primary` | `text-text-primary` | `#000000` | Primary Headline & Body Text |
| `--text-secondary` | `text-text-secondary` | `#333333` | Subtitles, Paragraph Copy |
| `--text-muted` | `text-text-muted` | `#666666` | Labels, Metadata, Captions |
| `--text-inverse` | `text-text-inverse` | `#FFFFFF` | Text on Accent Fills |
| `--border-subtle` | `border-border-subtle` | `rgba(0, 0, 0, 0.1)` | Light Divider Lines |
| `--border-harsh` | `border-border-harsh` | `#000000` | Solid Structural Borders & Shadows |
| `--accent` | `text-accent` / `bg-accent` | `#0000FF` | Electric Cobalt Blue |
| `--accent-lime` | `bg-accent-lime` | `#CCFF00` | High-Voltage Acid Lime |
| `--dmc-whatsapp` | `bg-dmc-whatsapp` | `#25D366` | WhatsApp Brand Accent |

### Dark Mode Tokens (`.dark` Warm Espresso)
| CSS Variable | Tailwind Utility | Hex / Value | Purpose |
| :--- | :--- | :--- | :--- |
| `--bg-page` | `dark:bg-bg-page` | `#0C0A08` | Deep Espresso Background |
| `--bg-card` | `dark:bg-bg-card` | `#141210` | Dark Surface Background |
| `--bg-dark` | `dark:bg-bg-dark` | `#C4622D` | Terracotta Solid Surface |
| `--text-primary` | `dark:text-text-primary` | `#F0EBE3` | Warm Cream Text |
| `--text-secondary` | `dark:text-text-secondary` | `#9B9189` | Warm Muted Text |
| `--text-muted` | `dark:text-text-muted` | `#4A4440` | Subtle Metadata Text |
| `--border-subtle` | `dark:border-border-subtle` | `rgba(240, 220, 200, 0.07)` | Subtle Warm Dividers |
| `--border-harsh` | `dark:border-border-harsh` | `rgba(240, 220, 200, 0.18)` | Dark Mode Structural Borders |
| `--accent` | `dark:bg-accent` | `#C4622D` | Terracotta Accent |
| `--accent-lime` | `dark:bg-accent-lime` | `#F2E4D0` | Warm Parchment Accent |

---

## 3. Typography System

The design system pairs strict monospaced pixel headers with clean sans-serif body text and optional italicized serif highlights.

### Font Families
1. **Body Font:** Inter (`var(--font-inter)` / `font-sans`)
   - Used for all body copy, descriptions, navigation links, and standard paragraph text.
2. **Display / Monospace Font:** DotGothic16 (`var(--font-dot)`) & Offbittrial 101 (`.font-pixel`)
   - Used for Section Tags, Headings (`font-display`), Stat Counters, and Brutalist UI Labels.
3. **Serif Accent Font:** Instrument Serif (`var(--font-instrument-serif)` / `font-serif`)
   - Used sparingly for italicized contrast words in headings (e.g., `<span className="font-serif italic font-normal">...</span>`).
4. **Secondary Label Font:** SF Pro Display (`.text-text-secondary`)
   - Used for secondary technical captions.

### Heading Conventions
* All headings use tight letter-spacing: `letter-spacing: -0.05em; font-weight: 500;`.
* Main Page Headers: `text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase`.
* Sub-headings: `text-2xl md:text-4xl font-bold uppercase tracking-tight`.

---

## 4. Component Patterns & Utilities

### 1. Section Tag (`.section-tag`)
Every section begins with a standardized uppercase label badge:
```tsx
<div className="section-tag">SERVICES</div>
```
* **Style:** `bg-accent text-text-inverse font-pixel text-base px-2.5 pt-2 pb-1 mb-5 inline-block uppercase leading-none`.

### 2. Hard Brutalist Shadows
Instead of soft Gaussian drop shadows, use hard offset box shadows:
```tsx
<div className="border border-border-harsh brutalist-shadow bg-bg-card p-6">
  {/* Card content */}
</div>
```
* `.brutalist-shadow`: `box-shadow: 4px 4px 0px var(--border-harsh)`
* `.brutalist-shadow-blue`: `box-shadow: 4px 4px 0px var(--accent)`

### 3. Hover Micro-Interactions
* **Link Underline (`.link-underline`):** Animated line scaling horizontally on hover.
* **Hover Sweep (`.hover-sweep`):** Background fill sweep effect.
* **Interactive Button / Card Elevation:**
  ```tsx
  className="border border-border-harsh px-6 py-3 transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none brutalist-shadow"
  ```

### 4. Grid Divider Pattern
Sections with multiple items or stats should use explicit grid borders:
```tsx
<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
  <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-border-harsh">
    {items.map((item) => (
      <div key={item.id} className="border-r border-b border-border-harsh p-8 bg-bg-card">
        {/* Content */}
      </div>
    ))}
  </div>
</div>
```

---

## 5. Motion Tokens & Easing

Motion in DMC Tech is crisp, fast, and deliberate.

* **Primary Brutalist Ease:** `cubic-bezier(0.16, 1, 0.3, 1)` (Expo-out, snappy settle)
* **Smooth Transition Ease:** `cubic-bezier(0.65, 0, 0.35, 1)`
* **Bounce/Over-shoot Ease:** `cubic-bezier(0.34, 1.56, 0.64, 1)`

### Motion Data Attributes
* `data-premium-motion="reveal"` — Used by SiteMotion for scroll reveal.
* `data-motion-kind="tag" | "heading" | "row"` — Specific animation types.
* `data-premium-interaction="true"` — Applied to interactive buttons.
* `data-premium-card="true"` — Card hover transition.

---

## 6. Layout & Spacing Standards

* **Max Width:** Container standard is `max-w-[1440px] mx-auto`.
* **Section Padding:**
  - Horizontal: `px-6 md:px-12 lg:px-16`
  - Vertical: `py-16 md:py-24 lg:py-32`
* **Grid Layouts:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`
* **Custom Cursor:** Active cursor is hidden on fine pointer devices (`cursor: none !important`), replaced by custom reactive cursor (`CustomCursor.tsx`).

---

## 7. Checklist for Creating New Sections

When prompting or asking an AI to create a new section, check that it follows:
1. [ ] **Uses `.section-tag`** at the top of the section.
2. [ ] **No rounded corners** (`rounded-*` must NOT be used).
3. [ ] **Uses token colors** (`bg-bg-page`, `bg-bg-card`, `text-text-primary`, `text-text-secondary`, `bg-accent`, `bg-accent-lime`, `border-border-harsh`, `border-border-subtle`).
4. [ ] **Container alignment:** Encapsulated in `max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16`.
5. [ ] **Typography hierarchy:** Monospace/Pixel for tags/numbers/stats, Inter for copy, optional Instrument Serif italic for accent words.
6. [ ] **Hard borders & brutalist shadows:** `border border-border-harsh brutalist-shadow`.
7. [ ] **Dark mode compatibility:** All elements support `.dark` variants or CSS variable tokens.
