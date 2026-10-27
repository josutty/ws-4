# after giving username and password i was not able to login
Asked by: user for none
## Answer
The mock handler accepts `DLR-1002` with password `REDACTED`, but `SignInForm` only awaits the login mutation and does not navigate or update the session after success. The configured dealer home route is `/dealer/home`, so remaining on `/login` is an application wiring issue rather than an invalid credential issue.
## Sources
- mocks/handlers/identity.ts — accepted mock credentials
- src/features/authenticate/ui/SignInForm.tsx § onSubmit — mutation is awaited without navigation/session dispatch
- src/app/router.tsx — dealer home route is `/dealer/home`
## Remaining uncertainty
none
