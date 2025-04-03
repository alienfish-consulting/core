/**
 * @file storage.ts
 * Shared AsyncLocalStorage instance for consistent context tracking.
 */

import { AsyncLocalStorage } from 'async_hooks';
import type { RequestContext } from './types.js';

export const storage = new AsyncLocalStorage<RequestContext>();
