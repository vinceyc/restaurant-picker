/**
 * Reads docs/restaurants.md and rewrites src/restaurants.js to match.
 * Called by the sync-docs-to-code workflow when docs change.
 */
import Anthropic from '@anthropic-ai/sdk'
import { readFileSync, writeFileSync } from 'fs'

const client = new Anthropic()

const docsContent = readFileSync('docs/restaurants.md', 'utf-8')

const response = await client.messages.create({
  model: 'claude-opus-4-6',
  max_tokens: 2048,
  messages: [
    {
      role: 'user',
      content: `You are syncing a documentation file into a JavaScript source file.

Given the restaurant documentation below, generate the complete contents of \`src/restaurants.js\`.

Rules:
- Export a default array of restaurant objects
- Each object must have: id (number, sequential starting at 1), name, cuisine, address, description
- Parse all restaurants from the markdown table
- Keep the comment at the top: "// This file is auto-synced from docs/restaurants.md"
- Return ONLY the JavaScript source code — no markdown fences, no explanation

Documentation file (docs/restaurants.md):
${docsContent}`,
    },
  ],
})

const jsContent = response.content[0].text.trim()
writeFileSync('src/restaurants.js', jsContent + '\n')
console.log('Updated src/restaurants.js')
