# CT839 Design System Reference

## Font
- Family: "Plus Jakarta Sans" (Google Fonts)
- Weights used: 400, 500, 600, 700, 800

## Typography Scale
| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| h1 | 60px | 800 | 1.08 | -1.5px |
| h2 | 48px | 800 | 1.0 | -1.2px |
| h3 | 18px | 700 | 28px | normal |
| body/p | 20px | 400 | 1.625 | normal |
| small | 14px | 600 | normal | normal |

## Colors
| Token | Value | Usage |
|-------|-------|-------|
| --brand-yellow | #f9d900 | Primary accent, CTA buttons |
| --brand-yellow-light | #f9d90015 | Subtle yellow tint |
| --brand-dark | #231f20 | Dark backgrounds, text on light |
| --background | #fafaf8 | Page background |
| --surface | #fff | Card/section backgrounds |
| --surface-warm | #f5f3ef | Alternating section bg |
| --text-primary | #1f2937 | Main text color |
| --text-secondary | #4b5563 | Secondary text |
| --text-muted | #9ca3af | Muted/subtle text |
| --border | #e5e7eb | Standard borders |
| --border-warm | #e8e6e0 | Warm-toned borders |
| Footer bg | #111827 | Dark footer |

## Border Radius
| Token | Value |
|-------|-------|
| --radius | 12px |
| --radius-lg | 16px |
| --radius-xl | 24px |
| pill | 9999px |

## Buttons
### Primary (Yellow)
- bg: #f9d900, color: #231f20
- padding: 16px 32px, border-radius: 24px
- font-weight: 700, font-size: 16px

### Outline (White/Light)
- bg: transparent, color: white
- border: 1.6px solid rgba(255,255,255,0.4)
- padding: 16px 32px, border-radius: 24px
- font-weight: 600

### Nav button (smaller)
- padding: 10px 24px, border-radius: 24px
- font-size: 14.4px

## Section Tags / Pills
- bg: #231f20, color: #f9d900
- padding: 8px 20px, border-radius: 9999px
- font-size: 14px, font-weight: 600

## Cards
- bg: #fafaf8, border: 0.8px solid #e8e6e0
- border-radius: 16px, overflow: hidden

## Section Backgrounds (alternating pattern)
1. Dark/hero (#231f20 or image)
2. White (#fff)
3. Dark accent bar (#231f20)
4. Light (#fafaf8)
5. Warm (#f5f3ef)
6. Light (#fafaf8)
7. White (#fff)
8. Dark CTA (#231f20)

## Footer
- bg: #111827, color: white
- padding: 80px 32px 32px

## Logos
- Dark version: /images/ctrc-logo-full-dark.svg
- Light version: /images/ctrc-logo-full.svg

## Navigation
- bg: rgba(35,31,32,0.95) — dark semi-transparent
- Sticky header
