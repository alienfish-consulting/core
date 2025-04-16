# 🧠 Nx Initialization

This GitHub Action initializes and restores the Nx local computation cache. It generates a deterministic key based on the current environment, resets any existing local cache, and restores the `.nx` directory for efficient caching across workflows.

---

## 🚀 Features

- 🔁 Resets local Nx state using `pnpx nx reset`
- 🔐 Generates a robust, versioned cache key
- 💾 Restores `.nx` and nested `.cache/nx` directories
- 🧮 Optionally calculates `nx affected` SHAs for `main` vs `HEAD`
- 📊 Prints CLI dashboard and GitHub summary output

---

## 📥 Inputs

| Name              | Description                                               | Required | Default    |
|-------------------|-----------------------------------------------------------|----------|------------|
| `node-version`     | Node.js version for cache key generation                | ❌       | `22`       |
| `pnpm-version`     | PNPM version for cache key generation                   | ❌       | `10.6.4`   |
| `cache-version`    | Optional prefix to bust or namespace the cache key       | ❌       | `v1`       |
| `run-affected`     | Whether to run `nx-set-shas` for affected workflows      | ❌       | `false`    |

---

## 📤 Outputs

| Name         | Description                          |
|--------------|--------------------------------------|
| `cache-key`   | The generated Nx cache key          |
| `cache-hit`   | Whether the Nx cache was restored   |

---

## 🧪 Example Usage

```yaml
- name: 🧠 Initialize Nx
  uses: ./.github/actions/setup-nx
  with:
    node-version: '22'
    pnpm-version: '10.6.4'
    cache-version: 'v2'
    run-affected: true
```

---

## 📊 Sample Output

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                         🧠 NX CACHE INITIALIZED                      ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ • Cache Hit:  TRUE                                                    ┃
┃ • Cache Key:  v2-node22-pnpm10.6.4-nx-a1b2c3d4                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 🔗 Related Actions

- `setup-repo`: Performs sparse checkout and sets Nx Cloud tokens
- `setup-node-env`: Installs Node.js and PNPM for consistency

---

## 💬 Notes

- Intended to be used early in workflows that rely on Nx caching
- Pairs well with affected-based lint/test/build pipelines
- Cache key is tied to Git SHA and versions of node/pnpm

