/**
 * @file lifecycle.ts
 * Provides context lifecycle functions.
 */

import type { RequestContext } from './types.js';
import { storage } from './storage.js';
import { createId } from '@paralleldrive/cuid2';

/**
 * Creates a default context with generated IDs.
 */
export const createDefaultContext = (): RequestContext => ({
  requestId: createId(),
  correlationId: createId(),
});

/**
 * Runs a function with the given context.
 */
export const runWithContext = <T>(context: RequestContext, fn: () => T): T => {
  return storage.run(context, fn);
};

/**
 * Runs a function with a generated default context.
 */
export const initWithDefaultContext = <T>(fn: () => T): T => {
  return runWithContext(createDefaultContext(), fn);
};

/**
 * Binds the current context to a function and returns a new function
 * that retains that context.
 */
export const bind = <Args extends unknown[], R>(
  fn: (...args: Args) => R
): ((...args: Args) => R) => {
  const ctx = storage.getStore();
  return (...args: Args): R => {
    if (!ctx) return fn(...args);
    return storage.run(ctx, () => fn(...args));
  };
};
