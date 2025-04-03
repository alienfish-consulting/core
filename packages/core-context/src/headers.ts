/**
 * @file headers.ts
 * Provides utilities to extract and apply request context from HTTP headers.
 */

import type { RequestContext } from './types.js';
import { getContext } from './accessors.js';
import { setContext } from './internal.js';
import { createId } from '@paralleldrive/cuid2';

/**
 * Mapping of RequestContext keys to HTTP header names.
 */
const headerMap: Record<keyof RequestContext, string> = {
  requestId: 'x-request-id',
  correlationId: 'x-correlation-id',
  userId: 'x-user-id',
  accountId: 'x-account-id',
  transactionId: 'x-transaction-id',
};

/**
 * Extracts context values from HTTP headers and merges them with existing context,
 * ensuring that required fields like requestId and correlationId are present.
 */
export function extractContextFromHeaders(
  headers: Record<string, string | string[] | undefined>
): RequestContext {
  const baseCtx = getContext(true);

  const headerContext: Partial<RequestContext> = {};

  for (const key in headerMap) {
    const contextKey = key as keyof RequestContext;
    const headerName = headerMap[contextKey];
    const value = headers[headerName.toLowerCase()];
    if (typeof value === 'string') {
      headerContext[contextKey] = value;
    }
  }

  return {
    ...baseCtx,
    ...headerContext,
    requestId: headerContext.requestId ?? baseCtx?.requestId ?? createId(),
    correlationId:
      headerContext.correlationId ?? baseCtx?.correlationId ?? createId(),
  } as RequestContext;
}

/**
 * Applies extracted context from headers to the current AsyncLocalStorage.
 */
export function updateContextFromHeaders(
  headers: Record<string, string | string[] | undefined>
): void {
  const context = extractContextFromHeaders(headers);
  setContext(context);
}
