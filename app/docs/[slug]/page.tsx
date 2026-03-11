import { getDocBySlug, getAllDocs } from '@/lib/docs'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const docs = getAllDocs()
  return docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: Props) {
  const doc = await getDocBySlug(params.slug)
  if (!doc) return {}
  return {
    title: `${doc.title} · Ian's Docs`,
    description: doc.description,
  }
}

export default async function DocPage({ params }: Props) {
  const doc = await getDocBySlug(params.slug)
  if (!doc) notFound()

  return (
    <article>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-300 transition-colors">
          文档库
        </Link>
        <span>/</span>
        <span className="text-gray-400 truncate max-w-xs">{doc.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10 pb-8 border-b border-gray-800">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
          {doc.title}
        </h1>
        {doc.description && (
          <p className="text-gray-400 text-base sm:text-lg mb-4 leading-relaxed">
            {doc.description}
          </p>
        )}
        <div className="flex items-center gap-3">
          <time className="text-sm text-gray-500 font-mono">{doc.date}</time>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-800/50">
            文档
          </span>
        </div>
      </header>

      {/* Content */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
      />

      {/* Back */}
      <div className="mt-16 pt-8 border-t border-gray-800">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          返回文档列表
        </Link>
      </div>
    </article>
  )
}
