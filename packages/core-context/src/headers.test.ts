import { describe, it, expect } from 'vitest';
import {
  extractContextFromHeaders,
  updateContextFromHeaders,
} from './headers.js';
import { getContext } from './accessors.js';
import type { RequestContext } from './types.js';
import { setContext } from './internal.js';

describe('headers', () => {
  it('extractContextFromHeaders pulls values from headers correctly', () => {
    const headers = {
      'x-request-id': 'r1',
      'x-correlation-id': 'c1',
      'x-user-id': 'u1',
      'x-account-id': 'a1',
      'x-transaction-id': 't1',
    };

    const ctx = extractContextFromHeaders(headers);

    expect(ctx).toEqual<RequestContext>({
      requestId: 'r1',
      correlationId: 'c1',
      userId: 'u1',
      accountId: 'a1',
      transactionId: 't1',
    });
  });

  it('extractContextFromHeaders falls back to existing context if present', () => {
    const base: RequestContext = {
      requestId: 'base-request-id',
      correlationId: 'base-correlation-id',
      userId: 'base-user',
      accountId: 'base-account',
      transactionId: 'base-txn',
    };

    const headers = {
      'x-user-id': 'override-user',
    };

    setContext(base); // manually set base context

    const merged = extractContextFromHeaders(headers);

    expect(merged.requestId).toBeDefined();
    expect(merged.userId).toBe('override-user');
    expect(merged.accountId).toBeDefined();
    expect(merged.transactionId).toBeDefined();
  });

  it('extractContextFromHeaders generates missing IDs when not present', () => {
    const headers = {}; // No relevant headers

    const result = extractContextFromHeaders(headers);

    expect(result.requestId).toBeDefined();
    expect(result.correlationId).toBeDefined();
  });

  it('updateContextFromHeaders makes new context accessible via getContext', () => {
    const headers = {
      'x-request-id': 'r2',
      'x-correlation-id': 'c2',
    };

    updateContextFromHeaders(headers);
    const ctx = getContext(true);

    expect(ctx?.requestId).toBe('r2');
    expect(ctx?.correlationId).toBe('c2');
  });

  it('generates requestId and correlationId when missing in headers and base context', () => {
    // Clear existing context completely
    // @ts-expect-error required for unit testing
    setContext({});

    const result = extractContextFromHeaders({});

    expect(result.requestId).toBeDefined();
    expect(result.correlationId).toBeDefined();
  });
});
