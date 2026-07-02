import fs from 'node:fs'
import path from 'node:path'
import { useSidebar } from 'vitepress-openapi'


// Load the package's OpenAPI spec 
function loadOpenApiSpec (pkg) {
  const specPath = path.resolve(process.cwd(), `public/${pkg}-openapi.json`)
  if (!fs.existsSync(specPath)) {
    return null
  }
  return JSON.parse(fs.readFileSync(specPath, 'utf-8'))
}

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
   const items = [
    { text: pkg, link: `/packages/${pkg}/index` },
    ...buildTree(pkgDir)
  ]

  // Load the OpenAPI spec
  const spec = loadOpenApiSpec(pkg)

  // No spec case
  if (!spec) return items

  // Attach the operations tree to the API page link
  const apiLink = `/packages/${pkg}/${pkg}-openapi`
  const apiItem = items.find(item => item.link === apiLink)
  if (apiItem) {
    
    apiItem.collapsed = false
    apiItem.items = useSidebar({ spec }).itemsByPaths({ linkPrefix: `${apiLink}#` })
  }
  return items
  
}
