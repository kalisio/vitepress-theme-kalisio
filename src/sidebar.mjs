import fs from 'node:fs'
import path from 'node:path'

export function generateSideBar (pkg) {
  // Ensure the pkg folder exists
  const pkgDir = path.resolve(process.cwd(), `packages/${pkg}`)
  if (!fs.existsSync(pkgDir)) {
    return []
  }
  // Helper function to build the tree
  function buildTree (dir, basePath = '') {
    const entries = fs
      .readdirSync(dir, { withFileTypes: true })
      .sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
      )
    const items = []
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      const relativePath = path.join(basePath, entry.name)
      // Folder case
      if (entry.isDirectory()) {
        const children = buildTree(fullPath, relativePath)
        if (children.length > 0) {
          items.push({
            text: entry.name,
            items: children
          })
        }
      }
      // File case
      if (
        entry.isFile() &&
        entry.name.endsWith('.md') &&
        entry.name !== 'index.md'
      ) {
        const name = relativePath.replace(/\.md$/, '').replace(/\\/g, '/')
        items.push({
          text: entry.name.replace('.md', ''),
          link: `/packages/${pkg}/${name}`
        })
      }
    }
    return items
  }
  // Build the sidebar tree
  return [
    { text: pkg, link: `/packages/${pkg}/index` },
    ...buildTree(pkgDir)
  ]
}
