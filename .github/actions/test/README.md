# 🧪 Nx Test

This GitHub Action runs unit/integration tests across Nx monorepo projects, with support for both full and affected targets. It also verifies that dependencies and Nx cache directories are correctly initialized before execution.

---

## 🚀 Features

- ✅ Runs `nx affected --target=test` or `nx run-many --target=test`
- ✅ Validates that dependencies (`node_modules`) are present
- ✅ Validates `.nx` and nested `.cache/nx` directories
- ✅ Validates `NX_BASE` and `NX_HEAD` for affected runs
- 🧪 Configurable test targets (`affected-target`, `run-many-target`)
- 🛠 Forwards additional CLI flags (e.g., `--configuration=ci`)
- 📊 Summarizes results in GitHub UI
- 🔁 Designed for monorepo CI pipelines

---

## 📥 Inputs

| Name               | Description                                                  | Required | Default     |
|--------------------|--------------------------------------------------------------|----------|-------------|
| `gh-token`          | GitHub token for access                                      | ✅       | —           |
| `nx-use-cloud`      | Whether to use Nx Cloud                                      | ❌       | `'false'`   |
| `nx-cloud-token`    | Nx Cloud access token                                       | ❌       | —           |
| `run-affected`      | If `true`, runs `nx affected`; otherwise `nx run-many`       | ❌       | `'true'`    |
| `affected-target`   | Target to run in `nx affected`                               | ❌       | `'test'`    |
| `run-many-target`   | Target to run in `nx run-many`                               | ❌       | `'test'`    |
| `cli-flags`         | Extra CLI flags to forward to Nx (e.g., `--configuration=ci`) | ❌       | `''`        |

---

## 📤 Outputs

| Name           | Description                         |
|----------------|-------------------------------------|
| `test-success` | `'true'` if all tests passed         |

---

## 🧪 Example Usage

```yaml
- name: 🧪 Run Tests
  uses: ./.github/actions/test
  with:
    gh-token: ${{ secrets.GITHUB_TOKEN }}
    nx-use-cloud: true
    nx-cloud-token: ${{ secrets.NX_CLOUD_ACCESS_TOKEN }}
    run-affected: true
    cli-flags: '--configuration=ci'
