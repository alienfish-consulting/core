# 🏗️ Nx Build with BOM

This GitHub Action builds affected (or all) Nx monorepo projects and generates a detailed **Bill of Materials (BOM)** for inclusion in GitHub Releases or audits. It optionally uploads build artifacts and BOM files for downstream workflows.

---

## 🚀 Features

- 🔧 Runs `nx affected --target=build` or `nx run-many`
- ✅ Supports Nx Cloud with SHA diffing
- 📦 Archives `dist/` folders from `packages`, `apps`, or custom directories
- 🧾 Generates both:
    - **Markdown BOM** (`bom.md`) – for GitHub Release Notes
    - **JSON BOM** (`bom.json`) – for automation & auditing
- 📤 Uploads build artifacts & BOM as retrievable GitHub artifacts
- 🛠 Designed for release workflows & CI pipelines

---

## 📥 Inputs

| Name             | Description                                                             | Required | Default       |
|------------------|-------------------------------------------------------------------------|----------|----------------|
| `gh-token`        | GitHub token for repo access                                            | ✅       | —              |
| `nx-cloud-token`  | Nx Cloud access token                                                   | ✅       | —              |
| `build-dirs`      | Comma-separated list of root dirs to search for `dist/`                | ❌       | `'packages'`   |
| `run-affected`    | If `true`, runs `nx affected`; otherwise runs full `nx run-many`       | ❌       | `'true'`       |
| `cli-flags`       | Extra CLI flags to pass to Nx CLI (e.g., `--configuration=ci`)         | ❌       | `''`           |

---

## 📤 Outputs

| Name              | Description                           |
|-------------------|---------------------------------------|
| `build-success`    | `'true'` if the build step passed     |
| `bom-md-path`      | Path to the generated `bom.md`        |
| `bom-json-path`    | Path to the generated `bom.json`      |

---

## 🧪 Example Usage

```yaml
- name: 🏗️ Build Application
  uses: ./.github/actions/build
  with:
    gh-token: ${{ secrets.GITHUB_TOKEN }}
    nx-cloud-token: ${{ secrets.NX_CLOUD_ACCESS_TOKEN }}
    build-dirs: packages,apps
    run-affected: true
    cli-flags: '--configuration=ci'
