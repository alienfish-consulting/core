# @alienfishconsulting/core-context

[![npm version](https://img.shields.io/npm/v/@alienfishconsulting/core-context.svg)](https://www.npmjs.com/package/@alienfishconsulting/core-context)
[![License](https://img.shields.io/npm/l/@alienfishconsulting/core-context.svg)](./LICENSE)
![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

![CI](https://github.com/alienfish-consulting/core/actions/workflows/ci.yml/badge.svg?branch=development)
![codecov](https://codecov.io/gh/alienfish-consulting/core/branch/main/graph/badge.svg)

> Strongly typed, functional AsyncLocalStorage wrapper for managing request-scoped context in Node.js applications.

---

## ✨ Features

- 🔒 Immutable `RequestContext` model for tracing and auditing
- 🧠 Type-safe accessors for contextual fields (e.g., `requestId`, `userId`)
- 🔁 Async context propagation across call stacks
- 📥 Header integration for tracing across services
- 🧪 CI-enforced test coverage with Vitest & Nx
- ⚙️ Framework-agnostic (no Express dependency)

---

## 📦 Installation

```bash
  pnpm add @alienfishconsulting/core-context
```

Requires Node.js ≥18.

## 🧱 Context Model
The RequestContext defines a consistent schema across async boundaries:

```ts
interface RequestContext {
  requestId: string;
  correlationId: string;
  userId?: string;
  accountId?: string;
  transactionId?: string;
}
```

All fields are immutable and meant to persist across the request lifecycle.

## 🚀 Quick Start

```ts
import {
  initWithDefaultContext,
  getContext,
  getContextField,
  runWithContext
} from '@alienfishconsulting/core-context';

initWithDefaultContext(() => {
  const ctx = getContext();
  console.log('Request ID:', ctx?.requestId);
});
```

Or use a custom context:

```ts
const context = {
  requestId: 'abc123',
  correlationId: 'xyz456',
};

runWithContext(context, () => {
  // context is now available inside this function
});
```

## 📥 Working with HTTP Headers
```ts
import { extractContextFromHeaders, updateContextFromHeaders } from '@alienfishconsulting/core-context';

const headers = {
  'x-request-id': 'abc123',
  'x-user-id': 'user789',
};

updateContextFromHeaders(headers);

// Later...
const userId = getContextField('userId');
```

### 🔧 API Overview

| Function |Description |
|--|--|
| `runWithContext(ctx, fn)` |	Runs fn with the given context |
| `initWithDefaultContext(fn)` |	Auto-generates requestId/correlationId |
| `getContext(fallback?: boolean)` |	Retrieves the current context |
| `assertContext()` |	Returns context or throws if missing |
| `bind(fn)` |	Returns a function bound to the current context |
| `extractContextFromHeaders(headers)` |	Builds a context from header values |
| `updateContextFromHeaders(headers)`	| Extracts + applies context to storage |
| `getContextField(key)` |	Retrieves a specific field from the context |


## ✅ Best Practices

- Always call runWithContext() at the top level of async workflows

- Use bind() when passing callbacks to preserve context

- Avoid mutating context values — treat them as read-only

- Integrate context extraction in your HTTP layer (e.g., middleware or handlers)

## 🧪 Testing
This package is managed with Nx and uses Vitest for testing.

```bash
pnpm nx test core-context
```

- ✅ 80% coverage required

- 🎯 100% coverage target

- CI will fail if coverage is insufficient

## 🛠 Project Structure
```bash
  core-context/
  ├── src/
  │   ├── accessors.ts      # Context getters and safety checks
  │   ├── headers.ts        # HTTP header integration
  │   ├── lifecycle.ts      # runWithContext(), bind(), initWithDefaultContext()
  │   ├── storage.ts        # Shared AsyncLocalStorage instance
  │   └── types.ts          # RequestContext schema
```

## 🧩 Related Projects
This package is part of the @alienfishconsulting/core monorepo — a collection of modular, enterprise-grade TypeScript utilities.

# 📄 License

MIT 

© Terry "Lee" Allen, Jr

