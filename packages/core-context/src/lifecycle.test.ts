import { describe, expect, it } from 'vitest';
import {
  bind,
  createDefaultContext,
  initWithDefaultContext,
  runWithContext,
} from './lifecycle';
import { getContext, hasContext } from './accessors';
import type { RequestContext } from './types';

describe('lifecycle', () => {
  const mockContext: RequestContext = {
    requestId: 'r123',
    correlationId: 'c456',
  };

  it('runWithContext sets the context for the function scope', () => {
    let ctx: RequestContext | undefined;

    runWithContext(mockContext, () => {
      ctx = getContext();
    });

    expect(ctx).toEqual(mockContext);
  });

  it('runWithContext does not leak context outside the scope', () => {
    runWithContext(mockContext, () => {
      expect(getContext()).toEqual(mockContext);
    });

    expect(getContext()).toBeUndefined();
  });

  it('createDefaultContext generates valid request and correlation IDs', () => {
    const ctx = createDefaultContext();
    expect(ctx.requestId).toBeDefined();
    expect(ctx.correlationId).toBeDefined();
  });

  it('initWithDefaultContext sets context and runs the function', () => {
    let seen: RequestContext | undefined;

    initWithDefaultContext(() => {
      seen = getContext();
    });

    expect(seen?.requestId).toBeDefined();
    expect(seen?.correlationId).toBeDefined();
  });

  it('bind captures the current context and reuses it later', () => {
    let captured: (() => RequestContext | undefined) | undefined;

    runWithContext(mockContext, () => {
      captured = bind(() => getContext());
    });

    const result = captured?.();
    expect(result).toEqual(mockContext);
  });

  it('bind returns original function result if no context exists', () => {
    const bound = bind(() => getContext());
    expect(bound()).toBeUndefined();
  });

  it('bind preserves arguments and return value', () => {
    const fn = (a: number, b: number): string => `${a + b}`;

    let result: string | undefined;

    runWithContext(mockContext, () => {
      const bound = bind(fn);
      result = bound(2, 3);
    });

    expect(result).toBe('5');
  });

  it('hasContext is false outside bound scope', () => {
    const fn = bind(() => hasContext());
    expect(fn()).toBe(false);
  });
});
