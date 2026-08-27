import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { useSidebar } from 'vitepress-openapi'

function getMarkdownTitle (file, fallback) {
  const content = fs.readFileSync(file, 'utf-8')
  const frontmatter = content.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/)
  if (!frontmatter) return fallback
  const title = frontmatter[1].match(/^title:\s*["']?(.*?)["']?\s*$/m)?.[1]
  return title || fallback
}

function formatDirectoryTitle (name) {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}

function buildSidebarTree (dir, baseUrl, options = {}) {
  const { exclude = ['index.md'] } = options
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    )
  const items = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      const children = buildSidebarTree(fullPath, `${baseUrl}/${entry.name}`, options)
      if (children.length > 0) {
        items.push({
          text: formatDirectoryTitle(entry.name),
          items: children
        })
      }
      continue
    }
    if (!entry.isFile()) continue
    if (!entry.name.endsWith('.md')) continue
    if (exclude.includes(entry.name)) continue
    const name = entry.name.replace(/\.md$/, '')
    items.push({
      text: getMarkdownTitle(fullPath, name),
      link: `${baseUrl}/${name}`
    })
  }
  return items
}

function resolveVitepressRoot (configUrl) {
  const configFile = fileURLToPath(configUrl)
  return path.resolve(path.dirname(configFile), '..')
}

export function generateSidebar (options) {
  const {
    rootDir,
    baseUrl = '',
    index,
    exclude
  } = options
  const absoluteRootDir = path.resolve(rootDir)
  if (!fs.existsSync(absoluteRootDir)) return []
  const items = []
  if (index) items.push(index)
  items.push(...buildSidebarTree(absoluteRootDir, baseUrl, { exclude }))
  return items
}

export function generateSidebars (options = {}) {
  const {
    configUrl,
    baseUrl = ''
  } = options
  if (!configUrl) throw new Error('configUrl is required')
  const rootDir = resolveVitepressRoot(configUrl)
  if (!fs.existsSync(rootDir)) return {}
  const entries = fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
    .sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    )
  const sidebars = {}
  for (const entry of entries) {
    const route = `${baseUrl}/${entry.name}`.replace(/\/+/g, '/')
    sidebars[`${route}/`] = generateSidebar({
      rootDir: path.join(rootDir, entry.name),
      baseUrl: route
    })
  }
  return sidebars
}

export function addOpenApiSidebar (items, options) {
  const {
    specPath,
    pageLink
  } = options
  const absoluteSpecPath = path.resolve(specPath)
  if (!fs.existsSync(absoluteSpecPath)) return items
  const spec = JSON.parse(fs.readFileSync(absoluteSpecPath, 'utf-8'))
  const apiItem = items.find(item => item.link === pageLink)
  if (!apiItem) return items
  apiItem.collapsed = false
  apiItem.items = useSidebar({ spec }).itemsByPaths({
    linkPrefix: `${pageLink}#`
  })
  return items
}

export function generatePackageSidebar (pkg, options = {}) {
  const {
    rootDir = `packages/${pkg}`,
    publicDir = 'public'
  } = options
  const baseUrl = `/packages/${pkg}`
  const items = generateSidebar({
    rootDir,
    baseUrl,
    index: {
      text: pkg,
      link: `${baseUrl}/index`
    }
  })
  return addOpenApiSidebar(items, {
    specPath: path.join(publicDir, `${pkg}-openapi.json`),
    pageLink: `${baseUrl}/${pkg}-openapi`
  })
}
