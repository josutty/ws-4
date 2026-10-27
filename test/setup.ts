import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '@mocks/node';
import { resetDb } from '@mocks/db';

const nativeFetch = globalThis.fetch;
const NativeRequest = globalThis.Request;
const nativeSignal = new NativeRequest('http://localhost').signal;

class TestRequest extends NativeRequest {
  constructor(input: RequestInfo | URL, init?: RequestInit) {
    const requestInit = { ...init };
    delete requestInit.signal;
    super(input, requestInit);
  }
}

Object.defineProperty(globalThis, 'Request', {
  configurable: true,
  value: TestRequest,
});

class NodeAbortController {
  readonly signal = nativeSignal;

  abort() {}
}

Object.defineProperties(globalThis, {
  AbortController: { configurable: true, value: NodeAbortController },
  AbortSignal: { configurable: true, value: nativeSignal.constructor },
});
globalThis.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
  const { signal: _signal, ...requestInit } = init ?? {};
  const requestInput = input instanceof Request ? input.url : input;
  return nativeFetch(requestInput, requestInit);
};

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  cleanup();
  server.resetHandlers();
  resetDb();
});
afterAll(() => server.close());
