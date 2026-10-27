# how to login to application..what is username and password
Asked by: user for none
## Answer
Open `/login` and enter dealer code `DLR-1002` as the username and `REDACTED` as the password. These credentials are defined for the mock login handler; the application also offers VECVNet SSO.
## Sources
- mocks/handlers/identity.ts — mock login accepts `DLR-1002` with password `REDACTED`
- analysis/components.md § SignInForm — login labels and SSO action
## Remaining uncertainty
none for the mock environment; production credentials are not specified.
