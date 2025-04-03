#!/usr/bin/env bash

# Set colors for better visibility
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
GRAY='\033[0;90m'
BOLD='\033[1m'
RESET='\033[0m'

# Repository root directory (where the script is run from)
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
cd "$REPO_ROOT" || { echo -e "${RED}${BOLD}Failed to cd to repository root${RESET}"; exit 1; }

# Print header
echo -e "\n${BLUE}${BOLD}==========================================${RESET}"
echo -e "${BLUE}${BOLD}    PROJECT INITIALIZATION SCRIPT    ${RESET}"
echo -e "${BLUE}${BOLD}==========================================${RESET}\n"

# Function to print step info
print_step() {
  echo -e "\n${CYAN}${BOLD}[STEP $1/${TOTAL_STEPS}]${RESET} ${BOLD}$2${RESET}"
}

# Function to print task status
print_task() {
  echo -e "${GRAY}  → $1${RESET}"
}

# Function to print success
print_success() {
  echo -e "${GREEN}  ✓ $1${RESET}"
}

# Function to print error
print_error() {
  echo -e "${RED}  ✗ $1${RESET}"
  echo -e "${RED}  ✗ Error details: $2${RESET}"
}

# Count total steps to display progress
TOTAL_STEPS=6

# Step 1: Clean directories
print_step 1 "Cleaning project directories"
directories=("dist" "node_modules" ".nx" "tmp" "coverage")

for dir in "${directories[@]}"; do
  print_task "Removing $dir directories..."
  find . -type d -name "$dir" -prune -exec rm -rf {} \; 2>/dev/null &
done

# Wait for all rm commands to finish
wait
print_success "All directories cleaned"

# Step 2: Clear pnpm cache
print_step 2 "Clearing pnpm cache"
print_task "Running pnpm store prune..."
if pnpm store prune; then
  print_success "pnpm cache cleared"
else
  print_error "Failed to clear pnpm cache" "$?"
fi

# Step 3: Install dependencies
print_step 3 "Installing dependencies"
print_task "Running pnpm install..."
if pnpm install; then
  print_success "Dependencies installed"
else
  print_error "Failed to install dependencies" "$?"
  echo -e "${YELLOW}${BOLD}⚠️ Continuing despite error, but subsequent steps may fail.${RESET}\n"
fi

# Step 4: Reset NX cache
print_step 4 "Resetting NX cache"
print_task "Running pnpm nx reset..."
if pnpm nx reset; then
  print_success "NX cache reset"
else
  print_error "Failed to reset NX cache" "$?"
fi

# Step 5: Build project
print_step 5 "Building project"
print_task "Running pnpm build..."
if FORCE_COLOR=1 pnpm build; then
  print_success "Project built successfully"
else
  print_error "Failed to build project" "$?"
  echo -e "${YELLOW}${BOLD}⚠️ Continuing despite error, but subsequent steps may fail.${RESET}\n"
fi

# Step 6: Run tests
print_step 6 "Running tests"
print_task "Running pnpm test..."
if FORCE_COLOR=1 pnpm test; then
  print_success "Tests passed"
else
  print_error "Some tests failed" "$?"
fi

# Print summary
echo -e "\n${BLUE}${BOLD}==========================================${RESET}"
echo -e "${GREEN}${BOLD}    INITIALIZATION COMPLETE    ${RESET}"
echo -e "${BLUE}${BOLD}==========================================${RESET}\n"

exit 0