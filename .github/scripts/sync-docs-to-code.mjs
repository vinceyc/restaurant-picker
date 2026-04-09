/**
 * Reads docs/restaurants.md and rewrites src/restaurants.js to match.
 * Called by the sync-docs-to-code workflow when docs change.
 */
import OpenAI from 'openai'
import { readFileSync, writeFileSync } from 'fs'

const client = new OpenAI()

const docsContent = readFileSync('docs/restaurants.md', 'utf-8')

const response = await client.chat.completions.create({
  model: 'gpt-4o',
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

const jsContent = response.choices[0].message.content.trim()
writeFileSync('src/restaurants.js', jsContent + '\n')
console.log('Updated src/restaurants.js')
