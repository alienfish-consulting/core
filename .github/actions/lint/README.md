# 🧹 Nx Lint

A reusable GitHub Action to lint projects in an Nx monorepo using ESLint. Supports both affected and full project runs, validates environment state, and provides a clean test summary for CI pipelines.

---

## 🚀 Features

- ✅ Runs `nx affected --target=lint` or `nx run-many --target=lint`
- ✅ Verifies dependencies (`node_modules`) and `.nx` cache directories
- ✅ Ensures `NX_BASE` and `NX_HEAD` are present for affected mode
- 🧹 Configurable linting targets (`affected-target`, `run-many-target`)
- 🧩 Additional CLI flags via `cli-flags`
- 📊 GitHub summary with lint output
- 🛠 Designed for Nx monorepos with CI/CD workflows

---

## 📥 Inputs

| Name               | Description                                                       | Required | Default     |
|--------------------|-------------------------------------------------------------------|----------|-------------|
| `gh-token`          | GitHub token for access                                           | ✅       | —           |
| `nx-use-cloud`      | Whether to use Nx Cloud                                           | ❌       | `'false'`   |
| `nx-cloud-token`    | Nx Cloud access token                                             | ❌       | —           |
| `run-affected`      | Run only affected projects or all projects                        | ❌       | `'true'`    |
| `affected-target`   | Target for `nx affected` (typically `lint`)                       | ❌       | `'lint'`    |
| `run-many-target`   | Target for `nx run-many` (typically `lint`)                       | ❌       | `'lint'`    |
| `cli-flags`         | Additional CLI flags passed to the Nx command                     | ❌       | `''`        |

---

## 📤 Outputs

| Name          | Description                        |
|---------------|------------------------------------|
| `lint-success`| `'true'` if lint passed, else `'false'` |

---

## 🧪 Example Usage

```yaml
- name: 🧹 Run Lint
  uses: ./.github/actions/lint
  with:
    gh-token: ${{ secrets.GITHUB_TOKEN }}
    nx-use-cloud: true
    nx-cloud-token: ${{ secrets.NX_CLOUD_ACCESS_TOKEN }}
    run-affected: true
    cli-flags: '--configuration=ci'
