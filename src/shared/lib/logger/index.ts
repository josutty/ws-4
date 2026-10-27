// src/shared/lib/logger/index.ts — the only place console.* is allowed (AGENTS.md §9)
type Meta = Record<string, unknown>;

const isProd = import.meta.env.PROD;

function write(level: 'debug' | 'info' | 'warn' | 'error', message: string, meta?: Meta) {
  if (isProd && (level === 'debug' || level === 'info')) return;
  if (meta === undefined) {
    console[level](message);
    return;
  }
  console[level](message, meta);
}

export const logger = {
  debug: (message: string, meta?: Meta) => write('debug', message, meta),
  info: (message: string, meta?: Meta) => write('info', message, meta),
  warn: (message: string, meta?: Meta) => write('warn', message, meta),
  error: (message: string, meta?: Meta) => write('error', message, meta),
};
