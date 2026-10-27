# Raw design tokens

Sources: `inputs/ux/dealer.html` CSS and `analysis/design-spec/dealer-login.md` / `analysis/design-spec/dealer-app.md`.

## Colors

| Semantic name | Light raw value | Dark raw value | Where used |
|---|---|---|---|
| surface | `#FFFFFF` | `#141D25` | cards, forms, rail, grid, dialogs |
| surface-muted | `#F8FAFB` | `#19242D` | headers, disabled inputs, total rows |
| canvas | `#F4F6F8` | `#0C1319` | app page and grid background |
| fg | `#16222C` | `#E2EAF0` | principal text |
| fg-muted | `#42576A` | `#AEC0CE` | secondary text |
| muted | `#6B7C8A` | `#8296A6` | captions, labels |
| border | `#DCE3E9` | `#26343F` | controls, card and grid rules |
| border-strong | `#B9D7EA` | `#20455C` | accent/dashed borders |
| primary | `#0E6BA8` | `#4FA3D6` | primary button, focus, accents |
| primary-hover | `#0A5686` | `#79BCE5` | primary button hover |
| primary-muted | `#E6F1F8` | `#122A3A` | selected controls and edit band |
| primary-fg | `#FFFFFF` | `#FFFFFF` | text on primary |
| success | `#1F7A45` | `#5FBA84` | success labels/values |
| success-muted | `#E7F2EB` | `#132720` | success pill |
| warning | `#A65D00` | `#D9A05B` | warning labels/stock |
| warning-muted | `#FBEFE0` | `#2A2015` | warning pill/notice |
| danger | `#B3261E` | `#E08A84` | errors, critical status/stock |
| danger-muted | `#FBE9E7` | `#2C1917` | danger pill |
| add | `#6B3FA0` | `#A487D0` | added-FERT controls/tag |
| add-muted | `#F0EAF8` | `#211B2E` | added-FERT notice/tag |
| app-bar | `#10202D` | `#080F14` | top navigation |
| app-bar-fg | `#C7D6E2` | `#9FB4C4` | top navigation inactive text |
| focus | `#0E6BA8` | `#4FA3D6` | 2px visible outline and 3px soft focus ring |
| unmapped: stock-90-180 | `#D97706` | derive | stock aging bar only; proposal `warning-strong` |
| unmapped: top-bar-warning | `#F0B770` | derive | countdown text |
| unmapped: top-bar-role | `#8FADC4` | derive | account role text |

## Gradients and backgrounds

| Token proposal | Exact value | Where used |
|---|---|---|
| `gradient-login` | `linear-gradient(150deg, #0B1822 0%, #12293A 55%, #0E3A4A 100%)` | `#login`; design spec calls it a gradient, not a flat page color |

## Typography

| Semantic name | Raw value | Where used |
|---|---|---|
| font-sans | `'IBM Plex Sans', system-ui, -apple-system, Segoe UI, sans-serif` | all UI text |
| font-mono | `'IBM Plex Mono', ui-monospace, Menlo, monospace` | quantities, codes, dates/counts |
| heading-1 | `24px / 1.45 / 600`, letter-spacing `-0.4px` | `Good afternoon, Sharma Motors` |
| heading-2 | `19px / 1.45 / 600` | `Sign in` |
| heading-3 | `15.5–17px / 1.3 / 600` | drawer and modal titles |
| body | `13.5px / 1.45 / 400` | default body |
| body-sm | `12.5–13px / 1.45 / 400–500` | cards, controls |
| caption | `10–11.5px / 1.45 / 400–700` | labels, badges, metadata |
| numeric-display | `27px / 1 / 600`, mono, tabular numerals | principal card values |

## Spacing, geometry and elevation

| Token proposal | Raw values | Where used |
|---|---|---|
| spacing rhythm | `4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 18, 20, 24, 26, 32, 40, 56px` | gaps, padding, layout |
| radius-control | `4–5px` | inputs, buttons, selects |
| radius-card | `7–10px` | cards, popovers, dialogs |
| radius-pill | `13px`, `16px`, `50%` | tokens, user chip, avatar |
| shadow-card | `0 1px 2px rgba(16,32,45,.06), 0 2px 8px rgba(16,32,45,.06)` | cards |
| shadow-overlay | `0 12px 40px rgba(16,32,45,.22)` | drawer, dialogs, popovers |
| control heights | `24, 26, 27, 30, 32, 34, 38px` | compact controls through login controls |
| grid row height | `40px`, compact `31px`; rollup measured `38px` | workbook and rollup |

## Breakpoints and motion

| Token | Raw value | Effect |
|---|---|---|
| breakpoint-phone | `max-width: 760px` | lead/full cards become one column |
| breakpoint-tablet | `max-width: 900px` | filter rail overlays; toolbar status/search compress |
| motion-reduced | `prefers-reduced-motion: reduce` | all transitions disabled |

## Contrast concerns

- The generated design specs measure several muted labels at 4:1–4.4:1 (for example app subtitle and login subtitle), below WCAG AA for normal text; preserve measured values and surface these at Gate 1.
