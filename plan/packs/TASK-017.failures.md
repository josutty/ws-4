# Failures for TASK-017

Fix only these. Touch only the files in the task's Files table.

### design vs build
command: node tools/design-spec.mjs compare "inputs/ux/dealer.html#app" /dealer/indent-workbook --start
  | content | table | columns (order + labels) | W1 · W2 · W3 · W4 · JUL · AUG · SEP · TOTAL · RUN% · STOCK · OFF L3 · RET L3 · Δ VS LAST | LMD · HD · W1 · W2 · W3 · W4 · JUL · AUG · SEP · TOTAL · RUN% · STOCK · OFF L3 · RET L3 · Δ VS LAST |
  | content | table | group headers | SUB-VERTICAL×1 · LINES×1 · YOUR INDENT · JULY 2026×8 · Demand mix ▾×1 · Stock ▸×1 · Off L3 ▸×1 · Ret L3 ▸×1 · Δ vs last ▸×1 | SUB-VERTICAL×1 · LINES×1 · YOUR INDENT · JULY 2026×8 · DEMAND MIX ▾×1 · STOCK ▸×1 · OFF L3 ▸×1 · RET L3 ▸×1 · Δ VS LAST ▸×1 |
  | content | column "W1" | editable input | false | true |
  | content | column "W1" | button in cell | Expand | missing |
  | rule | column "W2" | conditional value colors | rgb(66, 87, 106), rgb(22, 34, 44) | none |
  | content | column "W2" | editable input | false | true |
  | rule | column "W3" | conditional value colors | rgb(66, 87, 106), rgb(22, 34, 44) | none |
  | rule | column "W4" | conditional value colors | rgb(66, 87, 106), rgb(22, 34, 44) | none |
  | rule | column "JUL" | conditional value colors | rgb(66, 87, 106), rgb(22, 34, 44) | none |
  | rule | column "AUG" | conditional value colors | rgb(66, 87, 106), rgb(22, 34, 44) | none |
  | rule | column "SEP" | conditional value colors | rgb(66, 87, 106), rgb(22, 34, 44) | none |
  | rule | column "TOTAL" | conditional value colors | rgb(66, 87, 106), rgb(22, 34, 44) | none |
  | rule | column "RUN%" | conditional value colors | rgb(66, 87, 106), rgb(22, 34, 44) | none |
  | rule | column "STOCK" | conditional value colors | rgb(66, 87, 106), rgb(22, 34, 44) | none |
  | rule | column "OFF L3" | conditional value colors | rgb(66, 87, 106), rgb(22, 34, 44) | none |
  | rule | column "RET L3" | conditional value colors | rgb(66, 87, 106), rgb(22, 34, 44) | none |
  | rule | column "Δ VS LAST" | conditional value colors | rgb(66, 87, 106), rgb(22, 34, 44) | none |
  | content | decorated element | "SM Sharma Motors DLR-1002 · Dealer" | rgba(255, 255, 255, 0.09) | missing |
  | content | decorated element | "SM" | rgb(14, 107, 168) | missing |
  | content | decorated element | "PROTOTYPE CONTROL" | rgb(230, 241, 248) | missing |
  | content | decorated element | "NOT SUBMITTED" | rgb(251, 239, 224) | missing |
  | content | decorated element | "IN PROGRESS" | rgb(251, 239, 224) | missing |
  | content | decorated element | "NOT STARTED" | rgb(251, 233, 231) | missing |
  | content | decorated element | "+186% VS MONTHLY RUN-RATE" | rgb(251, 239, 224) | missing |
  | content | decorated element | "-4%" | rgb(231, 242, 235) | missing |
