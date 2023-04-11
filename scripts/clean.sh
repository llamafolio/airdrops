#!/usr/bin/env bash

# Find all node_modules folders and remove them recursively
echo "Removing all node_modules folders..."
find . -name 'node_modules' -exec rm -rf {} \;

# Find all dist folders and remove them recursively
echo "Removing all dist folders..."
find . -name 'dist' -exec rm -rf {} \;

# Find all generated folders and remove them recursively
echo "Removing all generated folders..."
find . -name 'generated' -exec rm -rf {} \;

echo "Removing .sst folder..."
rm -rf .sst

echo "Done."
