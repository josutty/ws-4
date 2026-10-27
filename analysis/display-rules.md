# Display rules

| Rule | Where | Evidence | Meaning known? |
|---|---|---|---|
| Empty numeric reference or summary value displays `–` | IndentWorkbook, IndentRollup | `num(v)=>v||'–'`; design spec table Empty shown as `—` | yes |
| No matching filter result displays `No lines match these filters` and a clear-filter action | IndentWorkbook | `#gEmpty`, source lines 653–659 | yes |
| Stock age 60–90 days is warning-colored; 90–180 days warning-colored; over 180 days critical-colored | IndentWorkbook, StockOnHandCard, FertDetailDrawer | source lines 331–332, 925–930, 1380–1388, 1619–1625 | yes |
| Demand segment uses Runner=success, Repeater=warning, Stranger=critical | IndentWorkbook, DemandMixCard, FertDetailDrawer | `SEGNAME`/`SEGCOL`, source lines 825–826 | yes |
| `Not submitted`/`In progress` use warning; `Not started` uses critical; `Submitted` uses success | IndentProgressCard, VerticalStatusCard, AppTopBar | design spec decorated elements; source lines 1341–1353 | yes |
| Indent vs monthly run-rate is success only within ±15%; positive out-of-range is warning and negative out-of-range is critical | IndentDemandSignalCard | source lines 1367–1378 | threshold explicit |
| Last-cycle delta is success only within ±10%; outside range is warning | IndentDemandSignalCard | source lines 1374–1378 | threshold explicit |
| Indent accuracy bias is `Within ±10%` success; otherwise labels as consistently over/under and warning | IndentAccuracyCard, IndentAccuracyReport | source lines 1402–1409 and 1425–1434 | threshold explicit |
| Accuracy percentage color: ≥90 success, ≥80 warning, otherwise critical | IndentAccuracyReport | source line 1427 | threshold explicit |
| A row with no entered quantities has a warning left marker; an added FERT has a purple left marker and `ADDED` tag | IndentWorkbook | source lines 308–309, 1215–1222 | yes |
| The visible/filtered total row is accent-tinted and label changes between `Visible view total` and `Filtered view total` | IndentWorkbook | source lines 310–313, 1237–1241 | yes |
| Submitted indent quantities are disabled/read-only | IndentWorkbook | source lines 1192–1197 | yes |
| Applied filter chips are accent-tinted; active sort chip is neutral | WorkbookToolbar | source lines 269–273, 1252–1263 | yes |
| Month/quantity totals use monospaced tabular numerals | App summary, workbook, rollup, dialogs | CSS `.big`, table cells and `.v`; source lines 144, 176–180, 304–305 | yes |
| Difference is `+` prefixed when positive and warning-colored when negative | FertDetailDrawer, SubmitIndentDialog, IndentRollup | source lines 1501–1504, 1637–1641, 1712–1713 | yes |
| Filtered submit warning says the full vertical indent—not only displayed rows—will be sent | SubmitIndentDialog | source lines 1701–1705 | yes |
| Missing lines submit as zero | SubmitIndentDialog | source line 1705 | yes |
