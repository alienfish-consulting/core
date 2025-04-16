# 🧰 Node Environment Setup

This GitHub Action sets up a consistent Node.js environment using PNPM with optional dependency caching. It's designed for monorepo projects (like those using Nx) and supports cache key versioning and visual environment summaries.

---

## 🚀 Features

- 🟢 Installs Node.js using `actions/setup-node`
- 📦 Installs and configures PNPM via `pnpm/action-setup`
- 💾 Restores dependency cache using versioned keys
- 🛠 Installs dependencies if the cache is missed
- 📊 Outputs a CLI dashboard and GitHub step summary
- 🔁 Cache versioning supported via `cache-version`

---

## 📥 Inputs

| Name            | Description                                               | Required | Default     |
|-----------------|-----------------------------------------------------------|----------|-------------|
| `node-version`  | Node.js version to install                                | ❌       | `'22'`      |
| `pnpm-version`  | PNPM version to install                                   | ❌       | `'10.6.4'`  |
| `cache-version` | Custom version prefix for cache key generation            | ❌       | `'v1'`      |
| `skip-summary`  | If set to `'true'`, skips the dashboard and step summary  | ❌       | `'false'`   |

---

## 📤 Outputs

| Name         | Description                        |
|--------------|------------------------------------|
| `node-version` | The Node.js version used         |
| `pnpm-version` | The PNPM version used            |
| `cache-key`    | The generated dependency cache key |

---

## 🧪 Example Usage

```yaml
- name: 🧰 Setup Node Environment
  uses: ./.github/actions/setup-node-env
  with:
    node-version: '22.2.0'
    pnpm-version: '8.9.0'
    cache-version: 'v3'
