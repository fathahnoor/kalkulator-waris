---
name: Ethical Heritage Interface
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#414942'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#727971'
  outline-variant: '#c1c9bf'
  surface-tint: '#3d6748'
  primary: '#3d6748'
  on-primary: '#ffffff'
  primary-container: '#7daa86'
  on-primary-container: '#133e23'
  inverse-primary: '#a3d2ab'
  secondary: '#605e58'
  on-secondary: '#ffffff'
  secondary-container: '#e6e2da'
  on-secondary-container: '#66645e'
  tertiary: '#4b626d'
  on-tertiary: '#ffffff'
  tertiary-container: '#8ba3af'
  on-tertiary-container: '#223943'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#beeec6'
  primary-fixed-dim: '#a3d2ab'
  on-primary-fixed: '#00210d'
  on-primary-fixed-variant: '#254f32'
  secondary-fixed: '#e6e2da'
  secondary-fixed-dim: '#c9c6bf'
  on-secondary-fixed: '#1c1c17'
  on-secondary-fixed-variant: '#484741'
  tertiary-fixed: '#cee6f3'
  tertiary-fixed-dim: '#b2cad7'
  on-tertiary-fixed: '#051e28'
  on-tertiary-fixed-variant: '#334a54'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  element-gap: 16px
  section-margin: 48px
---

## Brand & Style

This design system is built on a **Claymorphic** foundation, merging the tactile, playful nature of 3D-inspired soft UI with the serious, authoritative nature of inheritance law. The goal is to transform a complex, often daunting legal process into an accessible, "plush" digital experience that feels friendly and supportive.

The aesthetic prioritizes **Softness and Tactility**. Elements should look inflated, as if they are made of matte clay or soft plastic. This approach reduces the "coldness" of mathematical calculations, making the user feel cared for. The target audience includes individuals and legal professionals seeking a modern, user-friendly tool that respects tradition while embracing contemporary interaction design.

## Colors

The palette uses a **Matte Pastel** approach to ground the Claymorphic effects. 

- **Primary (Sage Green):** Representing growth, life, and Islamic heritage. Used for main actions and successful calculation states.
- **Secondary (Cream):** The base "clay" color for the background, providing a warm, non-clinical environment.
- **Tertiary (Muted Slate):** Used for secondary heir categories or optional inputs to provide visual distinction without clashing.
- **Neutral:** A deep charcoal, used sparingly for high-legibility text to ensure the "soft" interface remains accessible for older users.

All colors should be applied with a matte finish—avoid high-gloss highlights. Use inner shadows to create the "inflated" depth characteristic of the style.

## Typography

**Plus Jakarta Sans** is the sole typeface for this design system. Its soft curves and modern geometry perfectly complement the Claymorphic shapes.

- **Headlines:** Use Bold or ExtraBold weights to maintain a strong presence against the thick, shadowed UI elements.
- **Body:** Medium weight is preferred for general text to ensure it doesn't get "lost" in the high-depth background.
- **Numbers:** For the final inheritance values, use the `display` style to celebrate the clarity of the result.

## Layout & Spacing

The layout follows a **Fluid Grid** model with generous margins to allow the "inflated" components room to breathe. 

- **Desktop:** A centered 8-column layout (max-width 900px) keeps the focus on the step-by-step calculation flow.
- **Mobile:** Single column with full-width cards. Padding should increase slightly (24px) to ensure shadows do not clip at the screen edges.
- **Rhythm:** Use an 8px base unit. Because Claymorphism relies on large shadows, elements require more "negative space" than flat designs to prevent visual clutter.

## Elevation & Depth

This design system uses a specialized **Claymorphism** stack to create depth:

1.  **Outer Shadows:** Use large, highly diffused shadows (e.g., `box-shadow: 12px 12px 24px rgba(0,0,0,0.05), -12px -12px 24px rgba(255,255,255,0.8)`). This creates the "floating" effect.
2.  **Inner Shadows:** Use two inner shadows to simulate 3D volume. A light inner shadow on the top-left and a darker, tinted inner shadow on the bottom-right (e.g., `inset 6px 6px 12px rgba(255,255,255,0.4), inset -6px -6px 12px rgba(0,0,0,0.05)`).
3.  **Matte Finish:** Avoid sharp gradients. Backgrounds should be solid or very subtle radial gradients to maintain the "clay" feel.

## Shapes

The shape language is **Ultra-Rounded**. 

- **Cards and Containers:** Use `rounded-xl` (1.5rem / 24px) to emphasize the soft, plush nature.
- **Interactive Elements:** Buttons and inputs should be **Pill-shaped** whenever possible to maximize the clay aesthetic.
- **Inputs:** Use thick borders (2px) or no borders at all, relying entirely on the inner-shadow depth to define the field.

## Components

### Buttons
Primary buttons use the Sage Green palette with a strong pill shape. On hover, the inner shadows should "compress" slightly to give a tactile, squishy feedback.

### Cards
All inputs are housed in large, white or light-cream cards. These cards are the primary vehicle for the Claymorphic effect, featuring the most pronounced outer and inner shadows.

### Result Displays
Use "Plush Doughnut" charts for visual inheritance breakdowns. Each segment of the chart should have its own internal depth, looking like individual pieces of clay fitted together.

### Input Fields (Quantities)
Steppers (plus/minus buttons) for heir counts should be large, circular "beads" that are easy to tap.

### Selection Chips
Heir categories (e.g., "Primary Heirs", "Extended Family") should use pill-shaped chips that toggle between a "pressed" state (inner shadow only) and a "floating" state (outer shadow).