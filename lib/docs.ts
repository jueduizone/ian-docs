import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'

const docsDirectory = path.join(process.cwd(), 'docs')

export interface DocMeta {
  slug: string
  title: string
  date: string
  description: string
}

export interface DocFull extends DocMeta {
  contentHtml: string
}

function extractTitleFromContent(content: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : 'Untitled'
}

function extractDescriptionFromContent(content: string): string {
  // Remove headings and get first meaningful paragraph
  const lines = content.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('```') && trimmed.length > 20) {
      return trimmed.slice(0, 160) + (trimmed.length > 160 ? '...' : '')
    }
  }
  return ''
}

function extractDateFromContent(content: string): string {
  const match = content.match(/(\d{4}-\d{2}-\d{2})/)
  if (match) return match[1]
  return new Date().toISOString().split('T')[0]
}

export function getAllDocs(): DocMeta[] {
  if (!fs.existsSync(docsDirectory)) return []

  const fileNames = fs.readdirSync(docsDirectory).filter(f => f.endsWith('.md'))

  const docs = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(docsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const stat = fs.statSync(fullPath)

    const rawDate = data.date
    const dateStr = rawDate instanceof Date
      ? rawDate.toISOString().split('T')[0]
      : (rawDate ? String(rawDate) : extractDateFromContent(content) || stat.mtime.toISOString().split('T')[0])

    return {
      slug,
      title: data.title || extractTitleFromContent(content),
      date: dateStr,
      description: data.description || extractDescriptionFromContent(content),
    }
  })

  // Sort by date descending
  return docs.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getDocBySlug(slug: string): Promise<DocFull | null> {
  const fullPath = path.join(docsDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  const contentHtml = processedContent.toString()

  const rawDate = data.date
  const dateStr = rawDate instanceof Date
    ? rawDate.toISOString().split('T')[0]
    : (rawDate ? String(rawDate) : extractDateFromContent(content) || new Date().toISOString().split('T')[0])

  return {
    slug,
    title: data.title || extractTitleFromContent(content),
    date: dateStr,
    description: data.description || extractDescriptionFromContent(content),
    contentHtml,
  }
}
