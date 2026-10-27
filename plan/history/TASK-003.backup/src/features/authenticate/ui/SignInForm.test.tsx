import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@mocks/node';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { SignInForm } from './SignInForm';

const successResponse = () => HttpResponse.json({ ok: true });

describe('SignInForm', () => {
  it('renders the exact labels in the required order', () => {
    renderWithProviders(<SignInForm />);

    expect(
      screen.getAllByRole('heading').map((heading: HTMLElement) => heading.textContent),
    ).toEqual(['Sign in']);
    expect(
      screen.getAllByRole('button').map((button: HTMLElement) => button.textContent),
    ).toEqual(['Sign in', 'Forgot password?', 'Sign in with VECVNet SSO']);
    expect(screen.getByLabelText('Dealer code or email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('wires required fields, autocomplete, and accessible validation messages', async () => {
    const { user } = renderWithProviders(<SignInForm />);
    const dealerCode = screen.getByLabelText('Dealer code or email');
    const password = screen.getByLabelText('Password');

    expect(dealerCode).toBeRequired();
    expect(password).toBeRequired();
    expect(dealerCode).toHaveAttribute('autocomplete', 'username');
    expect(password).toHaveAttribute('autocomplete', 'current-password');

    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(dealerCode).toHaveAttribute('aria-invalid', 'true');
    expect(password).toHaveAttribute('aria-invalid', 'true');
    expect(dealerCode).toHaveAccessibleDescription('Dealer code or email is required');
    expect(password).toHaveAccessibleDescription('Password is required');
  });

  it('keeps submit disabled while the form is submitting', async () => {
    let resolveLogin: (() => void) | undefined;
    server.use(
      http.post(/.*/, () =>
        new Promise((resolve) => {
          resolveLogin = () => resolve(successResponse());
        }),
      ),
    );
    const { user } = renderWithProviders(<SignInForm />);

    await user.type(screen.getByLabelText('Dealer code or email'), 'dealer@example.com');
    await user.type(screen.getByLabelText('Password'), 'correct-password');
    const submit = screen.getByRole('button', { name: 'Sign in' });
    await user.click(submit);

    expect(submit).toBeDisabled();
    resolveLogin?.();
  });

  it('logs in with dealer code or email and password', async () => {
    const requests: Request[] = [];
    server.use(
      http.post(/.*/, async ({ request }) => {
        requests.push(request);
        return successResponse();
      }),
    );
    const { user } = renderWithProviders(<SignInForm />);

    await user.type(screen.getByLabelText('Dealer code or email'), 'dealer@example.com');
    await user.type(screen.getByLabelText('Password'), 'correct-password');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(requests).toHaveLength(1);
  });

  it('starts VECVNet SSO sign-in', async () => {
    let called = false;
    server.use(
      http.post(/.*/, () => {
        called = true;
        return successResponse();
      }),
    );
    const { user } = renderWithProviders(<SignInForm />);

    await user.click(screen.getByRole('button', { name: 'Sign in with VECVNet SSO' }));

    expect(called).toBe(true);
  });

  it('requests a password reset and shows confirmation', async () => {
    server.use(http.post(/.*/, () => successResponse()));
    const { user } = renderWithProviders(<SignInForm />);

    await user.type(screen.getByLabelText('Dealer code or email'), 'dealer@example.com');
    await user.click(screen.getByRole('button', { name: 'Forgot password?' }));

    expect(await screen.findByRole('status')).toHaveTextContent('Password reset email sent');
  });

  it('shows a request error and retries successfully', async () => {
    server.use(http.post(/.*/, () => HttpResponse.json(null, { status: 500 })));
    const { user } = renderWithProviders(<SignInForm />);

    await user.type(screen.getByLabelText('Dealer code or email'), 'dealer@example.com');
    await user.type(screen.getByLabelText('Password'), 'wrong-password');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    const alert = await screen.findByRole('alert');
    expect(within(alert).getByText('Something went wrong')).toBeInTheDocument();

    server.resetHandlers();
    server.use(http.post(/.*/, () => successResponse()));
    await user.click(within(alert).getByRole('button', { name: 'Retry' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
