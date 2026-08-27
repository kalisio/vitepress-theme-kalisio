import fs from 'node:fs'
import path from 'node:path'

import { useSidebar } from 'vitepress-openapi'

function buildSidebarTree (dir, baseUrl, options = {}) {
  const { exclude = ['index.md'], capitalize = false } = options
  const formatText = text =>
    capitalize ? text.charAt(0).toUpperCase() + text.slice(1) : text
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    )
  const items = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      const children = buildSidebarTree(
        fullPath,
        `${baseUrl}/${entry.name}`,
        options
      )
      if (children.length > 0) {
        items.push({
          text: formatText(entry.name),
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
      text: formatText(name),
      link: `${baseUrl}/${name}`
    })
  }
  return items
}

export function generateSidebar (options) {
  const { rootDir, baseUrl, index, exclude, capitalize } = options
  const absoluteRootDir = path.resolve(process.cwd(), rootDir)
  if (!fs.existsSync(absoluteRootDir)) return []
  const items = []
  if (index) items.push(index)
  items.push(
    ...buildSidebarTree(absoluteRootDir, baseUrl, {
      exclude,
      capitalize
    })
  )
  return items
}

export function generateSidebars (options = {}) {
  const { rootDir = '.', baseUrl = '', capitalize = false } = options
  const absoluteRootDir = path.resolve(process.cwd(), rootDir)
  if (!fs.existsSync(absoluteRootDir)) return {}
  const entries = fs
    .readdirSync(absoluteRootDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    )
  const sidebars = {}
  for (const entry of entries) {
    const route = `${baseUrl}/${entry.name}`.replace(/\/+/g, '/')
    sidebars[`${route}/`] = generateSidebar({
      rootDir: path.join(rootDir, entry.name),
      baseUrl: route,
      capitalize
    })
  }
  return sidebars
}

export function addOpenApiSidebar (items, options) {
  const { specPath, pageLink } = options
  const absoluteSpecPath = path.resolve(process.cwd(), specPath)
  if (!fs.existsSync(absoluteSpecPath)) {
    return items
  }
  const spec = JSON.parse(
    fs.readFileSync(absoluteSpecPath, 'utf-8')
  )
  const apiItem = items.find(item => item.link === pageLink)
  if (!apiItem) {
    return items
  }
  apiItem.collapsed = false
  apiItem.items = useSidebar({ spec }).itemsByPaths({
    linkPrefix: `${pageLink}#`
  })
  return items
}

export function generatePackageSidebar (pkg) {
  const baseUrl = `/packages/${pkg}`
  const items = generateSidebar({
    rootDir: `packages/${pkg}`,
    baseUrl,
    index: {
      text: pkg,
      link: `${baseUrl}/index`
    }
  })
  return addOpenApiSidebar(items, {
    specPath: `public/${pkg}-openapi.json`,
    pageLink: `${baseUrl}/${pkg}-openapi`
  })
}