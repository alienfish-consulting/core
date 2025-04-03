/**
 * @file internal.ts
 * Internal utilities not intended for use in production environments.
 */

import type { RequestContext } from './types.js';
import { storage } from './storage.js';

/**
 * Overwrites the current request context.
 * Intended for internal/test use only.
 *
 * @param context - The new context to set
 */
export const setContext = (context: RequestContext): void => {
  storage.enterWith(context);
};
