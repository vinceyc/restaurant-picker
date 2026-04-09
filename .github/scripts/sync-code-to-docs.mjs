/**
 * Reads src/restaurants.js and rewrites docs/restaurants.md to match.
 * Called by the sync-code-to-docs workflow when code changes.
 */
import Anthropic from '@anthropic-ai/sdk'
import { readFileSync, writeFileSync } from 'fs'

const client = new Anthropic()

const currentDocs = readFileSync('docs/restaurants.md', 'utf-8')
const jsContent = readFileSync('src/restaurants.js', 'utf-8')

const response = await client.messages.create({
  model: 'claude-opus-4-6',
  max_tokens: 3000,
  messages: [
    {
      role: 'user',
      content: `You are syncing a JavaScript source file back into documentation.

The \`src/restaurants.js\` file was updated by a developer. Update \`docs/restaurants.md\` so the restaurant table reflects the current state of the code.

Rules:
- Keep all the existing prose, headings, and structure of the docs file exactly as-is
- Only update the restaurant table (the | Name | Cuisine | ... | table) to match the JS array
- Do not add or remove any other sections
- Return ONLY the updated markdown — no explanation, no fences

Current docs/restaurants.md:
${currentDocs}

Current src/restaurants.js:
${jsContent}`,
    },
  ],
})

const mdContent = response.content[0].text.trim()
writeFileSync('docs/restaurants.md', mdContent + '\n')
console.log('Updated docs/restaurants.md')
