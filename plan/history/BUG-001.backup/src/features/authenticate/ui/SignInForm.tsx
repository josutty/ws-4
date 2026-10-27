import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import {
  useLoginDealerMutation,
  useLoginWithVecvnetSsoMutation,
  useRequestPasswordResetMutation,
} from '../api/authenticateApi';
import { getErrorMessage, type ApiError } from '@shared/api';

const signInSchema = z.object({
  dealerCodeOrEmail: z.string().min(1, { error: 'Dealer code or email is required' }),
  password: z.string().min(1, { error: 'Password is required' }),
});

type SignInValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const [loginDealer, loginDealerState] = useLoginDealerMutation();
  const [loginWithSso, loginWithSsoState] = useLoginWithVecvnetSsoMutation();
  const [requestPasswordReset, resetState] = useRequestPasswordResetMutation();
  const [requestError, setRequestError] = useState<string | null>(null);
  const [resetConfirmation, setResetConfirmation] = useState(false);
  const [lastAction, setLastAction] = useState<'dealer' | 'sso' | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (values: SignInValues) => {
    setLastAction('dealer');
    setRequestError(null);
    setResetConfirmation(false);

    try {
      await loginDealer({ dealerCodeOrEmail: values.dealerCodeOrEmail, password: values.password }).unwrap();
    } catch (error) {
      const rawMessage = getErrorMessage(error as ApiError);
const message = rawMessage === 'Request failed' ? 'Something went wrong' : rawMessage;
setRequestError(message);
      if (message.toLowerCase().includes('dealer') || message.toLowerCase().includes('email')) {
        setError('dealerCodeOrEmail', { type: 'server', message });
      }
    }
  };

  const handleSso = async () => {
    setLastAction('sso');
    setRequestError(null);
    try {
      await loginWithSso({ provider: 'VECVNet' }).unwrap();
    } catch (error) {
      setRequestError(getErrorMessage(error as ApiError));
    }
  };

  const handleReset = async () => {
    const dealerCodeOrEmail = getValues('dealerCodeOrEmail');
    if (!dealerCodeOrEmail) {
      setError('dealerCodeOrEmail', {
        type: 'required',
        message: 'Dealer code or email is required',
      });
      return;
    }

    setRequestError(null);
    try {
      await requestPasswordReset({ dealerCodeOrEmail }).unwrap();
      setResetConfirmation(true);
    } catch (error) {
      setRequestError(getErrorMessage(error as ApiError));
    }
  };

  const retry = () => {
    if (lastAction === 'sso') {
      void handleSso();
      return;
    }
    void handleSubmit(onSubmit)();
  };

  const busy = isSubmitting || loginDealerState.isLoading || loginWithSsoState.isLoading || resetState.isLoading;

  return (
    <section className="mx-auto w-full max-w-[400px] rounded-[9px] bg-surface p-8 text-fg shadow-lg">
      <h1 className="mb-2 text-[19px] font-semibold">Sign in</h1>
      <p className="mb-6 text-[13px] text-muted">Dealer code or work email.</p>
      <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-1 block text-xs font-semibold text-muted" htmlFor="dealer-code-or-email">
            Dealer code or email
          </label>
          <input
            className="h-[38px] w-full rounded-[5px] border border-border bg-surface px-3 text-sm text-fg focus:ring-2 focus:ring-primary"
            id="dealer-code-or-email"
            required
            autoComplete="username"
            aria-invalid={errors.dealerCodeOrEmail ? 'true' : 'false'}
            aria-describedby={errors.dealerCodeOrEmail ? 'dealer-code-or-email-error' : undefined}
            {...register('dealerCodeOrEmail')}
          />
          {errors.dealerCodeOrEmail && (
            <p className="mt-1 text-xs text-danger" id="dealer-code-or-email-error">
              {errors.dealerCodeOrEmail.message}
            </p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-muted" htmlFor="password">
            Password
          </label>
          <input
            className="h-[38px] w-full rounded-[5px] border border-border bg-surface px-3 text-sm text-fg focus:ring-2 focus:ring-primary"
            id="password"
            type="password"
            required
            autoComplete="current-password"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'password-error' : undefined}
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-danger" id="password-error">
              {errors.password.message}
            </p>
          )}
        </div>
        <button className="mx-auto block text-[13px] text-primary underline disabled:opacity-60" disabled={busy} onClick={handleReset} type="button">
          Forgot password?
        </button>
        <button className="h-[38px] w-full rounded-[5px] bg-primary text-sm font-medium text-on-primary disabled:opacity-60" disabled={busy} type="submit">
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        <div className="flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-border" /><span>or</span><span className="h-px flex-1 bg-border" /></div>
        <button className="h-[38px] w-full rounded-[5px] border border-border bg-surface text-[13.5px] font-medium text-muted disabled:opacity-60" disabled={busy} onClick={handleSso} type="button">
          Sign in with VECVNet SSO
        </button>
        {resetConfirmation && <p className="text-center text-sm text-success" role="status">Password reset email sent</p>}
        {requestError && (
          <div className="flex items-center justify-between gap-3 rounded border border-danger p-2 text-sm text-danger" role="alert">
            <span>{requestError}</span>
            <button className="underline" disabled={busy} onClick={retry} type="button">Retry</button>
          </div>
        )}
      </form>
    </section>
  );
}
