# Failures for TASK-016

Fix only these. Touch only the files in the task's Files table.

### design vs build
command: node tools/design-spec.mjs compare "inputs/ux/dealer.html#app" /dealer/home --start
  | content | table | missing | present | absent |
  | content | decorated element | "SM Sharma Motors DLR-1002 · Dealer" | rgba(255, 255, 255, 0.09) | missing |
  | content | decorated element | "SM" | rgb(14, 107, 168) | missing |
  | content | decorated element | "PROTOTYPE CONTROL" | rgb(230, 241, 248) | missing |
  | content | decorated element | "NOT SUBMITTED" | rgb(251, 239, 224) | missing |
  | content | decorated element | "IN PROGRESS" | rgb(251, 239, 224) | missing |
  | content | decorated element | "NOT STARTED" | rgb(251, 233, 231) | missing |
  | content | decorated element | "+186% VS MONTHLY RUN-RATE" | rgb(251, 239, 224) | missing |
  | content | decorated element | "-4%" | rgb(231, 242, 235) | missing |
  | content | decorated element | "WITHIN ±10%" | rgb(231, 242, 235) | missing |
  | content | decorated element | "1" | rgb(230, 241, 248) | missing |
  | content | decorated element | "1" | rgb(230, 241, 248) | missing |
  | content | decorated element | "LMD×" | rgb(230, 241, 248) | missing |
  | layout | page | card / panel | rgb(255, 255, 255), radius 8px, 1376px | missing (no distinct panel) |
  | content | text | "VECV" | present | missing |
  | content | text | "plan" | present | missing |
  | content | text | "Closes in" | present | missing |
  | content | text | "—" | present | missing |
  | content | text | "Status:" | present | missing |
  | content | text | "Not submitted" | present | missing |
  | content | text | "SM" | present | missing |
  | content | text | "Sharma Motors" | present | missing |
  | content | text | "Prototype control" | present | missing |
  | content | text | "Viewing as" | present | missing |
  | content | text | "Persona switching lives here, not in the product chrome" | present | missing |
