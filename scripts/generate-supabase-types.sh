#!/usr/bin/env bash

# Exit script immediately if any command fails
set -e

# --- Configuration ---
# Adjust this path to your desired output file location
OUTPUT_FILE="./supabase/types.ts"
# Specify the schema(s) you want to generate types for
SCHEMA="public"
# Specify connection method: --linked, --project-id <id>, or --db-url <url>
CONNECTION_FLAG="--linked"
# --- End Configuration ---

# Get the directory part of the output file path
OUTPUT_DIR=$(dirname "$OUTPUT_FILE")

echo "Ensuring output directory '$OUTPUT_DIR' exists..."
# Create the output directory if it doesn't exist (-p ensures no error if it exists)
mkdir -p "$OUTPUT_DIR"

echo "Generating Supabase types for schema '$SCHEMA'..."
echo "Outputting to '$OUTPUT_FILE'..."

# Run the Supabase CLI command using the variables
npx supabase gen types typescript "$CONNECTION_FLAG" --schema "$SCHEMA" > "$OUTPUT_FILE"

echo "✅ Supabase types generated successfully!"