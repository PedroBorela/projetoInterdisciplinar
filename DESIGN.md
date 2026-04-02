# Design System Document: The Fluid Scholar

## 1. Overview & Creative North Star: "The Digital Curator"
Modern student finance shouldn't feel like a spreadsheet; it should feel like a high-end personal assistant. Our Creative North Star is **"The Digital Curator."** We move away from the rigid, boxy layouts of traditional banking and toward an editorial, fluid experience. 

This design system breaks the "template" look by utilizing **intentional asymmetry** (e.g., staggering card heights), **tonal depth** instead of lines, and a **high-contrast typography scale** that makes data feel like a headline. We treat the interface as a living canvas where information breathes, using glassmorphism to suggest a workspace that is layered, organized, and light.

---

## 2. Colors & Surface Logic
The palette is rooted in a sophisticated Deep Purple, balanced by high-vibrancy "Mint" and "Soft Red" for functional feedback.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section content. Boundaries must be defined solely through background color shifts or tonal transitions.
*   *Bad:* A list with grey lines between items.
*   *Good:* A `surface-container-low` card resting on a `surface` background.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper or frosted glass.
*   **Base:** `surface` (#f9f9fb)
*   **Level 1 (Sections):** `surface-container-low` (#f3f3f5)
*   **Level 2 (Interactive Cards):** `surface-container-lowest` (#ffffff)
*   **Level 3 (Pop-overs/Modals):** `surface-container-high` (#e8e8ea)

### The "Glass & Gradient" Rule
To escape the "flat" look, use `backdrop-blur` (12px–20px) on floating navigation bars or modal headers. Use a subtle linear gradient for primary CTAs: `primary` (#4800b2) to `primary_container` (#6200ee) at a 135° angle. This adds "soul" and a tactile, premium finish.

---

### 3. Typography: Editorial Authority
We pair **Manrope** for expressive headlines with **Inter** for high-utility body text.

| Role | Token | Font | Size | Intent |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Manrope | 3.5rem | Large balance totals / "Hero" moments. |
| **Headline** | `headline-md` | Manrope | 1.75rem | Page titles and monthly summaries. |
| **Title** | `title-md` | Inter | 1.125rem | Card headers and section labels. |
| **Body** | `body-md` | Inter | 0.875rem | General descriptions and transaction names. |
| **Label** | `label-sm` | Inter | 0.6875rem | Metadata (Dates, Categories, Tags). |

*Editorial Tip:* Use `display-lg` for the main balance but pull the tracking (letter-spacing) in by -2% to give it a custom, high-fashion feel.

---

## 4. Elevation & Depth
Hierarchy is achieved through **Tonal Layering** rather than structural shadows.

*   **The Layering Principle:** Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f3f3f5) background. This creates a soft, natural lift without "dirtying" the design with grey shadows.
*   **Ambient Shadows:** Use only for high-priority floating elements (e.g., FABs). Shadows must be extra-diffused: `box-shadow: 0 12px 32px rgba(72, 0, 178, 0.06)`. Note the purple tint in the shadow—never use pure black.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use the `outline_variant` token at **15% opacity**. A solid 100% border is a failure of the system.

---

## 5. Components

### Buttons
*   **Primary:** Gradient (`primary` to `primary_container`), `xl` (1.5rem) rounded corners. Text is `on_primary` (#ffffff).
*   **Secondary:** `surface-container-high` background with `primary` text. No border.
*   **Tertiary:** Transparent background, `primary` text, underlined only on hover.

### Cards & Lists
*   **Rule:** Forbid divider lines.
*   **Structure:** Use `6` (1.5rem) spacing between list items. Use a subtle background shift (`surface-container-low`) on hover to indicate interactivity.
*   **Rounding:** All cards must use `xl` (1.5rem / 24px) corner radius to reinforce the "Friendly" brand personality.

### Input Fields
*   **Style:** `surface-container-lowest` background with a `ghost border`. 
*   **Focus State:** Border becomes 2px solid `primary`. Label shifts to `label-sm` using `primary` color.

### Financial Health Indicator (Contextual Component)
*   Instead of a standard bar chart, use a thick, soft-ended stroke (24px width) with `secondary` for gains and `tertiary` for expenses. This mimics the "Soft Minimalism" ethos.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical padding (e.g., more padding at the top of a container than the bottom) to create an editorial look.
*   **Do** use `secondary_fixed` (#4ffbe6) for "Money In" to make the student feel a sense of reward.
*   **Do** use `tertiary_fixed_dim` (#ffb2bc) for "Money Out" to soften the blow of expenses.

### Don't
*   **Don't** use pure black (#000000) for text. Use `on_surface` (#1a1c1d) to maintain the soft aesthetic.
*   **Don't** use standard `md` (0.75rem) rounding for cards. It looks "Bootstrap-generic." Stick to `xl` (1.5rem).
*   **Don't** use a grid-heavy layout. Let elements overlap slightly or use whitespace (Token `12` or `16`) to separate sections.