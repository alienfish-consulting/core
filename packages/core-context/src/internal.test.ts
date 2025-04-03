import { describe, it, expect } from 'vitest';
import { setContext } from './internal.js';
import { getContext } from './accessors.js';
import type { RequestContext } from './types.js';

describe('internal', () => {
  it('setContext sets the request context manually', () => {
    const mockContext: RequestContext = {
      requestId: 'internal-r1',
      correlationId: 'internal-c1',
      userId: 'user-abc',
      accountId: 'account-xyz',
      transactionId: 'txn-789',
    };

    setContext(mockContext);

    const ctx = getContext();
    expect(ctx).toEqual(mockContext);
  });

  it('setContext overwrites any existing context', () => {
    const first: RequestContext = {
      requestId: 'r1',
      correlationId: 'c1',
    };

    const second: RequestContext = {
      requestId: 'r2',
      correlationId: 'c2',
    };

    setContext(first);
    expect(getContext()).toEqual(first);

    setContext(second);
    expect(getContext()).toEqual(second);
  });
});
