# Contributing Guide

Welcome! We appreciate your interest in contributing to the AlienFishConsulting Core Monorepo. Our goal is to build enterprise-ready open source software that is safe, maintainable, and developer-friendly.

---

## 🧭 Ground Rules

- All changes must go through code review and CI/CD.
- Pull Requests must be approved by **two code owners**.
- Issues should be created **before submitting a PR**.
- **Tests and documentation are required** for all contributions.
- All packages must maintain **>80% code coverage**, with a target of 100%.
---

## 🧱 Prerequisites

- Node.js `>=18.0.0`
- `pnpm`
- Familiarity with [Conventional Commits](https://www.conventionalcommits.org/)
- Familiarity with [Changesets](https://github.com/changesets/changesets)
- 
---

## 🚀 Getting Started

1. Fork the repository and clone your fork:
   ```bash
   git clone https://github.com/<your-username>/core.git
   cd core
   pnpm install
    ```
2. Create a new branch:

    ```bash
    Copy
    Edit
    git checkout -b feat/your-feature-name
    ```
3. Make your changes, add or update tests, and ensure they pass:
    ```bash
    Copy
    Edit
    pnpm test
    ```
4. Add a Changeset:
    ```bash
    Copy
    Edit
    pnpm changeset
    ```

5. Format your commit:
    ```bash
    Copy
    Edit
    pnpm commit
    ```
6. Push your branch and open a Pull Request.

7. Make sure your PR links to an existing issue.

---

## 🧪 Testing
- We use Vitest for testing and enforce minimum test coverage:
- CI will fail below 80% 
- Target is 100% code coverage
- Use pnpm test --coverage to check locally

---

## 💬 Communication
- For questions or help, open a GitHub Discussion
- For bugs or feature requests, open an issue

### Thank you for helping make this project better!   