import { SignInForm } from '@features/authenticate';

export function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-[linear-gradient(150deg,rgb(11,24,34),rgb(18,41,58),rgb(14,58,74))] px-4 py-8">
      <header className="mb-8 w-full max-w-[400px]">
        <p className="flex items-center justify-start text-[23px] font-bold text-white"><span>VECV</span><span className="text-sky-300">plan</span></p>
        <div className="flex items-center text-[11.5px] text-slate-300">
          <div className="w-1/2 text-left"><span>S&amp;OP-1A</span> <span className="font-semibold text-white">Jul 2026</span></div>
          <p className="text-right">· Indent closes <span className="font-semibold text-white">15 Jul, 23:59 IST</span></p>
        </div>
      </header>
      <SignInForm />
      <p className="mt-5 text-center text-[11.5px] text-muted">Trouble signing in? Contact Sales Planning support</p>
      <p className="mt-6 text-center text-[11px] text-slate-300">Prototype · your role and verticals come from your account</p>
    </main>
  );
}
