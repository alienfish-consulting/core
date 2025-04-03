/**
 * @file accessors.ts
 * Provides functions to retrieve context and context fields.
 */

import type { RequestContext } from './types.js';
import { storage } from './storage.js';
import { createId } from '@paralleldrive/cuid2';

/**
 * Returns a valid default RequestContext with generated values.
 */
const createDefaultContext = (): RequestContext => ({
  requestId: createId(),
  correlationId: createId(),
});

/**
 * Gets the current request context or falls back to a generated default.
 *
 * @param fallbackToDefault - If true, returns a default context if unset
 * @returns The current or default RequestContext, or undefined
 */
export const getContext = (
  fallbackToDefault = false
): RequestContext | undefined => {
  const ctx = storage.getStore();
  return ctx ?? (fallbackToDefault ? createDefaultContext() : undefined);
};

/**
 * Returns true if a context is currently available.
 */
export const hasContext = (): boolean => {
  return storage.getStore() !== undefined;
};

/**
 * Throws an error if no context is available.
 * Ensures the returned value is a valid RequestContext.
 */
export const assertContext = (): RequestContext => {
  const ctx = storage.getStore();
  if (!ctx || typeof ctx !== 'object' || !('requestId' in ctx)) {
    throw new Error(
      'Request context is missing. Ensure runWithContext() was called.'
    );
  }
  return ctx;
};

/**
 * Retrieves a specific field from the current context, if available.
 *
 * @param key - The key of the context field to retrieve
 * @returns The value of the field, or undefined if not present
 */
export const getContextField = <K extends keyof RequestContext>(
  key: K
): RequestContext[K] | undefined => {
  const ctx = getContext();
  return ctx?.[key];
};
