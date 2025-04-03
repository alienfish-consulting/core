/**
 * @file types.ts
 * Request-scoped context metadata used for logging, tracing, and auditing.
 * All fields are immutable and used throughout async call chains.
 */

/**
 * Represents a complete request context used throughout the application lifecycle.
 * All fields are required and immutable once created.
 */
export interface RequestContext {
  requestId: string;
  correlationId: string;
  userId?: string;
  accountId?: string;
  transactionId?: string;
}

/**
 * Represents a partial context extracted from headers or partial sources.
 * Can be merged into a full RequestContext.
 */
export type PartialRequestContext = Partial<RequestContext>;
