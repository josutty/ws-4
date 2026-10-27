# Requirements questions

| # | Question | Why it matters (library / setup) | Default if unanswered | Answer |
|---|---|---|---|---|
| 1 | Which languages are required, and is right-to-left support needed? | Determines whether i18n and `dir` handling are needed. | English only, no i18n library | |
| 2 | Is VECVNet SSO OIDC, and must the app also support its own email/password API? | Determines OIDC library versus RTK Query authentication endpoints. | VECVNet OIDC plus own API login | |
| 3 | Are there roles or permissions beyond the shown persona switching? | May require auth claims/authorization setup and route guards. | No additional roles; persona switching is mock/demo-only | |
| 4 | Must live purchase orders or other data update in real time? | Determines whether a realtime client/transport is needed beyond RTK Query polling. | No realtime updates; refresh on navigation or explicit retry | |
| 5 | Must the app work offline? | Determines service-worker/cache setup and conflict handling. | Online-only | |
| 6 | Which devices and browsers must be supported? | Affects browser targets, touch behavior, and compatibility testing. | Current desktop Chrome, Edge, Firefox, and Safari; responsive tablet support | |
| 7 | Are file uploads required, and what maximum size/types apply? | Determines whether the native picker remains sufficient or a dropzone/upload package is needed. | No uploads in this scope | |
| 8 | Are export formats limited to CSV, or are Excel/PDF required? | CSV is plain; Excel or designed PDF would add a library. | CSV and Print only | |
| 9 | Is an error-tracking or analytics service required, with what consent rules? | Determines whether Sentry/analytics packages and consent UI are configured. | No third-party tracking; shared logger only | |
| 10 | What is the maximum expected row count in each table? | Determines whether virtualization is needed in addition to TanStack Table. | Fewer than 200 visible rows; no virtual-list library | |
| 11 | What accessibility target is required? | Sets automated/manual acceptance criteria and component configuration. | WCAG 2.2 AA | |
