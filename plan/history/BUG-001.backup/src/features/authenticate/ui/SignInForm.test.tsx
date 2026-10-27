import { expect, describe, it, vi } from 'vitest';
import { HttpResponse, http } from 'msw';
import { renderWithProviders, screen, waitFor } from '@test/test-utils';
import { server } from '@mocks/node';
import { SignInForm } from './SignInForm';

describe('SignInForm', () => {
  it('renders the design labels in their exact order', () => {
    renderWithProviders(<SignInForm />);

    expect([
      screen.getByRole('heading', { name: 'Sign in' }).textContent,
      screen.getByLabelText<HTMLInputElement>('Dealer code or email').labels?.[0]?.textContent,
      screen.getByLabelText<HTMLInputElement>('Password').labels?.[0]?.textContent,
      ...screen.getAllByRole('button').map((button) => button.textContent),
    ]).toEqual([
      'Sign in',
      'Dealer code or email',
      'Password',
      'Forgot password?',
      'Sign in',
      'Sign in with VECVNet SSO',
    ]);
  });

  it('wires required autocomplete and aria attributes to the fields', () => {
    renderWithProviders(<SignInForm />);

    expect(screen.getByLabelText('Dealer code or email')).toHaveAttribute('required');
    expect(screen.getByLabelText('Dealer code or email')).toHaveAttribute('autocomplete', 'username');
    expect(screen.getByLabelText('Dealer code or email')).toHaveAttribute('aria-invalid', 'false');
    expect(screen.getByLabelText('Password')).toHaveAttribute('required');
    expect(screen.getByLabelText('Password')).toHaveAttribute('autocomplete', 'current-password');
    expect(screen.getByLabelText('Password')).toHaveAttribute('aria-invalid', 'false');
  });

  it('shows exact linked validation messages for invalid submission', async () => {
    const { user } = renderWithProviders(<SignInForm />);

    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(screen.getByLabelText('Dealer code or email')).toHaveAccessibleDescription(
      'Dealer code or email is required',
    );
    expect(screen.getByLabelText('Password')).toHaveAccessibleDescription('Password is required');
    expect(screen.getByLabelText('Dealer code or email')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Password')).toHaveAttribute('aria-invalid', 'true');
  });

  it('disables submit while a dealer login is submitting', async () => {
    let finishRequest: (() => void) | undefined;
    const requestPending = new Promise<void>((resolve) => {
      finishRequest = resolve;
    });
    server.use(
      http.post('*', async () => {
        await requestPending;
        return HttpResponse.json({});
      }),
    );
    const { user } = renderWithProviders(<SignInForm />);

    await user.type(screen.getByLabelText('Dealer code or email'), 'dealer-1');
    await user.type(screen.getByLabelText('Password'), 'correct-password');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(screen.getByRole('button', { name: 'Signing in…' })).toBeDisabled();
    finishRequest?.();
  });

  it('submits dealer credentials through the login mutation', async () => {
    const requestBody = vi.fn();
    server.use(
      http.post('*', async ({ request }) => {
        requestBody(await request.json());
        return HttpResponse.json({});
      }),
    );
    const { user } = renderWithProviders(<SignInForm />);

    await user.type(screen.getByLabelText('Dealer code or email'), 'dealer-1');
    await user.type(screen.getByLabelText('Password'), 'correct-password');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(requestBody).toHaveBeenCalledWith({
        dealerCodeOrEmail: 'dealer-1',
        password: 'correct-password',
      });
    });
  });

  it('submits the VECVNet SSO mutation', async () => {
    const requestBody = vi.fn();
    server.use(
      http.post('*', async ({ request }) => {
        requestBody(await request.json());
        return HttpResponse.json({});
      }),
    );
    const { user } = renderWithProviders(<SignInForm />);

    await user.click(screen.getByRole('button', { name: 'Sign in with VECVNet SSO' }));

    await waitFor(() => {
      expect(requestBody).toHaveBeenCalledWith({ provider: 'VECVNet' });
    });
  });

  it('requests a password reset and confirms success', async () => {
    const requestBody = vi.fn();
    server.use(
      http.post('*', async ({ request }) => {
        requestBody(await request.json());
        return HttpResponse.json({});
      }),
    );
    const { user } = renderWithProviders(<SignInForm />);

    await user.type(screen.getByLabelText('Dealer code or email'), 'dealer-1');
    await user.click(screen.getByRole('button', { name: 'Forgot password?' }));

    expect(await screen.findByRole('status')).toHaveTextContent('Password reset email sent');
    expect(requestBody).toHaveBeenCalledWith({ dealerCodeOrEmail: 'dealer-1' });
  });

  it('shows a request error and retries the failed dealer login', async () => {
    let attempts = 0;
    server.use(
      http.post('*', () => {
        attempts += 1;
        return attempts === 1
          ? HttpResponse.json({ message: 'Request failed' }, { status: 500 })
          : HttpResponse.json({});
      }),
    );
    const { user } = renderWithProviders(<SignInForm />);

    await user.type(screen.getByLabelText('Dealer code or email'), 'dealer-1');
    await user.type(screen.getByLabelText('Password'), 'correct-password');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Something went wrong');
    await user.click(screen.getByRole('button', { name: 'Retry' }));

    await waitFor(() => expect(attempts).toBe(2));
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
  });
});
