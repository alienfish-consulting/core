# AlienFishConsulting Core

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

A centralized collection of enterprise-ready, open source packages maintained by AlienFishConsulting. Our packages are designed with reliability, security, and professional standards in mind.

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| [@alienfishconsulting/core-context](./packages/core-context) | [![npm version](https://img.shields.io/npm/v/@alienfishconsulting/core-context.svg)](https://www.npmjs.com/package/@alienfishconsulting/core-context) | Strongly typed, functional AsyncLocalStorage wrapper with context propagation for Node.js and Express apps |
| [@alienfishconsulting/winston-blue](./packages/winston-blue) | [![npm version](https://img.shields.io/npm/v/@alienfishconsulting/winston-blue.svg)](https://www.npmjs.com/package/@alienfishconsulting/winston-blue) | Structured logging wrapper around winston with rich contextual features |

## Getting Started

### Prerequisites

This project uses [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) for package management.

```bash
# Check your Node.js version (should match .nvmrc)
node -v

# Install pnpm if you don't have it
npm install -g pnpm@10.6.4
```

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/alienfishconsulting/core.git
cd core
pnpm install
```

## Monorepo Structure

This project is organized as a monorepo using NX. Here's an overview of the structure:
alienfishconsulting-core/ 

```
├── packages/ # Individual packages 
    └── core-context/ # Context propagation utilities 
    └── winston-blue/ # Structured logging utilities 
├── .github/ # GitHub-specific files (workflows, etc) 
├── .husky/ # Git hooks 
├── nx.json # NX configuration 
└── package.json # Workspace configuration
```


## Development Workflow

### Common Commands

Here are some common commands you'll use when working with this repo:

```bash
# Build all packages
pnpm build

# Run tests for all packages
pnpm test

# Lint all packages
pnpm lint

# Clean the project (resets NX cache and removes node_modules)
pnpm clean

# Start a local npm registry for testing
pnpm nx run local-registry

# Create a properly formatted commit (uses commitizen)
pnpm commit
```

## Working with NX

This repo uses NX for efficient monorepo management. Some useful NX commands

```bash 
# Build a specific package
pnpm nx build core-context

# Run tests for a specific package
pnpm nx test core-context

# Run a command for multiple packages
pnpm nx run-many -t build

# Visualize the project dependency graph
pnpm nx graph

# Get detailed help on NX commands
pnpm nx help
```

## Creating a New Package
To create a new package in the monorepo:

1. Create a new directory in the packages/ folder
2. Set up the package structure following existing patterns
3. Update the workspace config as needed
4. Run pnpm install to update dependencies 

# Example structure for a new package:
```
packages/new-package/
├── src/                   # Source code
├── tests/                 # Tests
├── package.json           # Package configuration
├── tsconfig.json          # TypeScript configuration
├── project.json           # NX project configuration
└── README.md              # Package documentation
```

## Commit Guidelines
We use Conventional Commits to ensure consistent commit messages. This enables automatic versioning and changelog generation.

The general format is:
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```
For example:

```
feat(core-context): add Express middleware support
fix(winston-blue): resolve concurrent logging issue
docs: update main README with new examples
```

We provide a commitizen setup for helping with this format:

`pnpm commit`

## Release Process
Packages are versioned and published using [Changesets](https://github.com/changesets/changesets). The workflow is:

1. Make your changes and create a PR
2. Add a changeset to describe the changes: pnpm changeset
3. Once the PR is merged, version packages: pnpm version-packages
4. Publish to npm: pnpm release

## Contributing
We welcome contributions! Please see our Contributing Guide for details on how to get started.

## Code of Conduct
This project adheres to the Contributor Covenant Code of Conduct. By participating, you are expected to uphold this code.

## Security
If you discover a security vulnerability, please follow our Security Policy.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
AlienFishConsulting - https://github.com/alienfishconsulting