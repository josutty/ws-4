# Design system

Semantic tokens are the only approved source of color. Raw measured values live in
`src/shared/ui/theme/tokens.css`; components must use the classes in this document.

## Design values

| Token | Light | Dark |
|---|---|---|
| surface / surface-muted | `255 255 255` / `248 250 251` | `20 29 37` / `25 36 45` |
| canvas | `244 246 248` | `12 19 25` |
| fg / fg-muted / muted | `22 34 44` / `66 87 106` / `107 124 138` | `226 234 240` / `174 192 206` / `130 150 166` |
| border / border-strong / border-muted | `220 227 233` / `185 215 234` / `234 239 243` | `38 52 63` / `32 69 92` / `52 70 82` |
| primary / primary-hover / primary-fg / primary-soft | `14 107 168` / `10 86 134` / `255 255 255` / `230 241 248` | `79 163 214` / `121 188 229` / `20 29 37` / `18 42 58` |
| danger / danger-fg / danger-soft | `179 38 30` / `255 255 255` / `251 233 231` | `224 138 132` / `20 29 37` / `44 25 23` |
| success / success-fg / success-soft | `31 122 69` / `255 255 255` / `231 242 235` | `95 186 132` / `20 29 37` / `19 39 32` |
| warning / warning-fg / warning-soft / warning-strong | `166 93 0` / `255 255 255` / `251 239 224` / `217 119 6` | `217 160 91` / `20 29 37` / `42 32 21` / `217 160 91` |
| add / add-soft / accent / brand | `107 63 160` / `240 234 248` / `14 107 168` / `95 176 222` | `164 135 208` / `33 27 46` / `79 163 214` / `121 188 229` |
| inverse / inverse-muted / inverse-subtle | `16 32 45` / `199 214 226` / `183 205 221` | `8 15 20` / `159 180 196` / `159 180 196` |
| top-bar-warning / top-bar-role / focus | `240 183 112` / `143 173 196` / `14 107 168` | `217 160 91` / `159 180 196` / `79 163 214` |
| `gradient-login` | `linear-gradient(150deg, #0B1822 0%, #12293A 55%, #0E3A4A 100%)` | shared |
| font / geometry | IBM Plex Sans; IBM Plex Mono; 5px control; 9px card; pill; measured shadows | dark shadow variants |

## Token table

| Token | Class | Use it for | Don't use it for |
|---|---|---|---|
| `surface` | `bg-surface` | cards, forms, rail, grid, dialogs | page canvas |
| `surface-muted` | `bg-surface-muted` | headers, disabled inputs, total rows | primary actions |
| `canvas` | `bg-canvas` | application page and grid background | login page gradient |
| `fg` | `text-fg` | principal text | secondary metadata |
| `fg-muted` | `text-fg-muted` | secondary text and control labels | faint captions |
| `muted` | `text-muted` | captions and measured labels | headings |
| `border` | `border-border` | dividers and card rules | focus or form emphasis |
| `border-strong` | `border-border-strong` | accent and dashed borders | normal dividers |
| `border-muted` | `border-border-muted` | measured faint rules | controls or focus |
| `primary` / `primary-fg` | `bg-primary text-primary-fg` | primary actions and links | status-only decoration |
| `primary-hover` | `hover:bg-primary-hover` | primary action hover | static backgrounds |
| `primary-soft` | `bg-primary-soft` | selected controls and edit bands | page canvas |
| `danger` / `danger-fg` / `danger-soft` | `bg-danger text-danger-fg` / `bg-danger-soft` | errors and critical status | warnings |
| `success` / `success-fg` / `success-soft` | `bg-success text-success-fg` / `bg-success-soft` | success statuses and pills | neutral labels |
| `warning` / `warning-fg` / `warning-soft` | `bg-warning text-warning-fg` / `bg-warning-soft` | stock and attention statuses | destructive actions |
| `warning-strong` | `text-warning-strong` | stock aging bars | normal warning text |
| `add` / `add-soft` | `bg-add text-add` / `bg-add-soft` | added-FERT controls and tags | general accent |
| `accent` | `text-accent` | links and codes | body text |
| `brand` | `text-brand` | VECV plan brand mark | body text |
| `inverse` / `inverse-muted` | `bg-inverse text-inverse-muted` | top navigation and inverse chrome | regular cards |
| `inverse-subtle` | `text-inverse-subtle` | inverse chrome metadata | light-surface text |
| `top-bar-warning` | `text-top-bar-warning` | countdown text in top bar | warning status pills |
| `top-bar-role` | `text-top-bar-role` | account role in top bar | regular metadata |
| `focus` | `ring-focus` | keyboard focus ring | decorative outlines |
| `gradient-page` | `bg-page` | page gradient when specified | flat canvas |
| `gradient-login` | `bg-login` | login page background | application page |

The additional measured palette tokens are `muted`, `border-muted`, `primary-hover`,
`danger-soft`, `success-soft`, `warning-soft`, `warning-strong`, `add`, `add-soft`,
`brand`, `inverse-subtle`, `top-bar-warning`, and `top-bar-role`. Use their matching
Tailwind classes (`text-muted`, `border-border-muted`, `hover:bg-primary-hover`,
`bg-danger-soft`, `bg-success-soft`, `bg-warning-soft`, `text-warning-strong`,
`bg-add`, `bg-add-soft`, `text-brand`, `text-inverse-subtle`, `text-top-bar-warning`,
and `text-top-bar-role`).

## Type scale

Use `font-sans` for UI text and `font-mono` for quantities, codes, dates and counts.

| Class | Measured use |
|---|---|
| `text-heading-1` | 24px, 600, page headings |
| `text-heading-2` | 19px, 600, card headings |
| `text-heading-3` | 16px, 600, drawer/modal titles |
| `text-body` | 13.5px, body copy |
| `text-body-sm` | 13px, controls and cards |
| `text-caption` | 11px, metadata and badges |
| `text-label` | 13px, field labels |
| `text-overline` | 11px, uppercase group headers |
| `text-micro` | 11px, compact metadata |
| `text-numeric-display` | 27px mono, principal values |

## Spacing rhythm

Use the Tailwind spacing scale; measured layouts use 1px borders with 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 40 and 56px intervals. Mobile-first breakpoints are `sm`, `md`, `lg`, and `xl`; the design compresses at 760px and overlays the filter rail at 900px.

## Radius and shadow

`rounded-control` is 5px for inputs and buttons. `rounded-card` is 9px for cards and dialogs. `rounded-pill` is for chips and user badges. Use `shadow-card` for cards and `shadow-overlay` for drawers, dialogs and popovers.

## Interactive state recipes

- Primary button: `rounded-control bg-primary px-4 py-2 text-body-sm font-medium text-primary-fg hover:bg-primary-hover disabled:opacity-60`
- Secondary button: `rounded-control border border-border bg-surface px-4 py-2 text-body-sm font-medium text-fg-muted hover:bg-surface-muted disabled:opacity-60`
- Danger button: `rounded-control bg-danger px-4 py-2 text-body-sm font-medium text-danger-fg hover:bg-danger/90 disabled:opacity-60`
- Input default: `rounded-control border border-border-strong bg-surface px-3 py-2 text-body-sm text-fg placeholder:text-muted`
- Input invalid: `rounded-control border border-danger bg-surface px-3 py-2 text-body-sm text-fg ring-1 ring-danger`
- Input disabled: `rounded-control border border-border bg-surface-muted px-3 py-2 text-body-sm text-muted disabled:cursor-not-allowed disabled:opacity-60`
- Link: `text-accent underline underline-offset-2 hover:text-primary-hover`
- Card: `rounded-card border border-border bg-surface shadow-card`
- Skeleton: `animate-pulse rounded-control bg-surface-muted`

## Focus and reduced motion

`base.css` applies the visible `ring-2 ring-focus ring-offset-2 ring-offset-surface` focus recipe globally. It also disables animation and transitions under `prefers-reduced-motion: reduce`.

## Dark mode notes

Dark mode is the `dark` class on `<html>`, applied by `applyTheme`. Components use semantic classes only; do not add compensating `dark:` variants. Dark values preserve the measured blue-gray brand palette and use a dark foreground for primary controls to maintain contrast.

## Contrast table

The contrast checker passes 13 text pairs and 1 non-text pair in both themes:

| Theme | Result | Lowest checked ratio |
|---|---|---:|
| Light | PASS | 4.96:1 text; 5.70:1 non-text |
| Dark | PASS | 5.32:1 text; 6.12:1 non-text |

## Contrast concerns

- `muted` measured labels are 4.0–4.4:1 on the light surface in the generated design (app subtitle, login subtitle, progress labels). Preserve the measured value; human review is required.
- `border-strong` measured light value `185 215 234` is intentionally faint for accent/dashed borders and is not used as a universal control border. Human review is required if it is promoted to a control border.

## Adjustments made

- Adjusted for contrast: dark `--color-primary-fg` `255 255 255` → `20 29 37`; the dark primary background is light enough for the dark foreground and this is a derived theme value, not a measured screen value.
