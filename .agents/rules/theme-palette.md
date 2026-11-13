# Portfolio Theme — Video-Derived Crimson Palette

This project's colour palette was extracted from the hero intro video (`public/videos/intro.mp4`) via K-Means clustering. **Always use these exact colours.** Never introduce teal, green, blue, or any hue outside the red/warm-neutral spectrum below.

## Mandatory Colour Tokens

Use the CSS custom properties defined in `src/app/globals.css` under `@theme`. Reference them via `var(--color-*)` in CSS or Tailwind utility classes.

### Backgrounds (dark, warm near-blacks)
| Token | Value | Use |
|-------|-------|-----|
| `--color-bg-base` | `#1a0e11` | Page/section base |
| `--color-bg-deep` | `#120a0c` | Deepest background, hero |
| `--color-bg-card` | `#231518` | Card/panel surfaces |
| `--color-bg-card-hover` | `#2e1a1e` | Card hover states |
| `--color-bg-elevated` | `#2a181c` | Elevated surfaces, modals |

### Accent Reds (primary brand colours)
| Token | Value | Use |
|-------|-------|-----|
| `--color-accent` | `#d4252c` | Primary accent / CTA |
| `--color-accent-dark` | `#a11019` | Dark accent / pressed state |
| `--color-accent-deeper` | `#7c0810` | Deepest red for subtle tints |
| `--color-accent-bright` | `#d70f18` | Vivid highlights |
| `--color-accent-vivid` | `#e14746` | Hover / lighter accent |
| `--color-accent-glow` | `rgba(212, 37, 44, 0.45)` | Glow / shadow effects |
| `--color-accent-subtle` | `rgba(212, 37, 44, 0.12)` | Subtle tinted backgrounds |

### Warm Neutrals
| Token | Value | Use |
|-------|-------|-----|
| `--color-muted` | `#784b4e` | Dusty rose — borders, dividers |
| `--color-peach` | `#e39b7e` | Warm peach — highlights, tags |

### Typography
| Token | Value | Use |
|-------|-------|-----|
| `--color-text-primary` | `#eee8e7` | Headings, body text |
| `--color-text-secondary` | `#beb4be` | Sub-text, nav links |
| `--color-text-muted` | `#987d87` | Captions, labels, footers |
| `--color-text-on-accent` | `#120a0c` | Dark text on red buttons |

### Borders
| Token | Value | Use |
|-------|-------|-----|
| `--color-border` | `rgba(238, 232, 231, 0.10)` | Default borders |
| `--color-border-hover` | `rgba(212, 37, 44, 0.40)` | Hover/focus borders |

## Rules

1. **Never use colours outside this palette.** All new sections, components, cards, modals, and pages must draw from these tokens.
2. **No teal, green, or blue** — the video contains zero cool-tone hues. Avoid `#22c7a9`, `#008080`, or any similar colours.
3. **Use CSS variables** (`var(--color-*)`) or Tailwind utilities (`bg-accent`, `text-text-primary`, etc.) — never hardcode hex values.
4. **Preserve video colours** — never apply CSS filters, tints, or overlays on `<video>` elements that alter the original footage.
5. **Maintain WCAG AA contrast** — `--color-text-primary` on `--color-bg-deep` is 16.3:1 (AAA). Keep all text/background pairs above 4.5:1.
