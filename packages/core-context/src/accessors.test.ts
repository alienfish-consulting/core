import { describe, it, expect, beforeEach } from 'vitest';
import {
  getContext,
  hasContext,
  assertContext,
  getContextField,
} from './accessors';
import { runWithContext } from './lifecycle';
import type { RequestContext } from './types';

describe('accessors', () => {
  const context: RequestContext = {
    requestId: 'test-request-id',
    correlationId: 'test-correlation-id',
    userId: 'user-1',
    accountId: 'account-1',
    transactionId: 'txn-1',
  };

  beforeEach(() => {
    // reset any existing context between tests
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    runWithContext(context, () => {});
  });

  it('getContext returns undefined outside runWithContext', () => {
    expect(getContext()).toBeUndefined();
  });

  it('getContext returns default context when fallbackToDefault is true', () => {
    const ctx = getContext(true);
    expect(ctx?.requestId).toBeDefined();
    expect(ctx?.correlationId).toBeDefined();
  });

  it('hasContext returns false outside runWithContext', () => {
    expect(hasContext()).toBe(false);
  });

  it('hasContext returns true inside runWithContext', () => {
    let value = false;
    runWithContext(context, () => {
      value = hasContext();
    });
    expect(value).toBe(true);
  });

  it('assertContext returns context inside runWithContext', () => {
    let value: RequestContext | undefined;
    runWithContext(context, () => {
      value = assertContext();
    });
    expect(value).toEqual(context);
  });

  it('assertContext throws outside runWithContext', () => {
    expect(() => assertContext()).toThrow('Request context is missing');
  });

  it('getContextField returns correct field', () => {
    let result: string | undefined;
    runWithContext(context, () => {
      result = getContextField('userId');
    });
    expect(result).toBe('user-1');
  });

  it('getContextField returns undefined outside runWithContext', () => {
    const result = getContextField('userId');
    expect(result).toBeUndefined();
  });
});
