# 📦 Setup Repository Checkout

A reusable GitHub Action designed to replace `actions/checkout@v4` with additional logic for sparse-checkout and conditional Nx Cloud configuration. This is a foundational action that can be reused across all workflows.

---

## 🚀 Features

- ✅ Performs full or sparse repository checkout
- ✅ Conditionally sets up Nx Cloud based on inputs
- ✅ Outputs useful metadata: branch, commit
- ✅ Logs a visually styled CLI dashboard + GitHub Summary
- ✅ Ensures environment consistency across all workflows

---

## 📥 Inputs

| Name               | Description                                                        | Required | Default   |
|--------------------|--------------------------------------------------------------------|----------|-----------|
| `sparse-checkout`   | Enable sparse checkout (for monorepos with stable structure)       | ❌       | `'false'` |

---

## 📤 Outputs

| Name                  | Description                                    |
|-----------------------|------------------------------------------------|
| `branch`              | Current Git branch name                        |
| `commit`              | Current short commit SHA                       |
| `sparse-checkout-used`| `'true'` if sparse-checkout was used           |

---

## 📦 Example Usage

```yaml
- name: 📦 Setup Repository
  uses: ./.github/actions/setup-repo
  with:
    sparse-checkout: true
