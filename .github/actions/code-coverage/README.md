# 📊 Code Coverage

This GitHub Action merges code coverage reports from an Nx monorepo, generates a markdown and HTML-friendly coverage artifact bundle, and uploads the results to Codecov and GitHub. Designed to be run on GitHub Release events.

---

## 🚀 Features

- ✅ Merges all `lcov.info` files from `packages/*/coverage/`
- 📄 Generates `lcov.info`, `COVERAGE.md`, and a lightweight HTML placeholder
- ☁️ Uploads to [Codecov](https://codecov.io/) (if token provided)
- 📦 Uploads versioned artifact containing all coverage files
- 🧠 Automatically detects and restricts upload to a specific branch (default: `main`)
- 📊 Writes a visual summary in the GitHub Actions UI

---

## 📥 Inputs

| Name             | Description                                        | Required | Default     |
|------------------|----------------------------------------------------|----------|-------------|
| `codecov-token`   | Codecov token (optional but recommended)           | ❌       | `''`        |
| `branch-check`    | Restrict coverage reporting to this branch         | ❌       | `'main'`    |

---

## 📤 Outputs

| Name                  | Description                             |
|-----------------------|-----------------------------------------|
| `coverage-artifact-key` | Unique name of the uploaded artifact    |
| `lcov-count`            | Number of `lcov.info` files merged     |

---

## 🧪 Example Usage

```yaml
- name: 📊 Upload Coverage Report
  uses: ./.github/actions/code-coverage
  with:
    codecov-token: ${{ secrets.CODECOV_TOKEN }}
    branch-check: main
