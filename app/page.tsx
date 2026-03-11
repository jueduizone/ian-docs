import { getAllDocs } from '@/lib/docs'
import Link from 'next/link'

export default function Home() {
  const docs = getAllDocs()

  return (
    <div>
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          文档库
        </h1>
        <p className="text-gray-400 text-base sm:text-lg">
          AI · 产品设计 · 工程实践
        </p>
      </div>

      {/* Doc list */}
      {docs.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">暂无文档</p>
          <p className="text-sm mt-2">将 .md 文件添加到 /docs 目录即可</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {docs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              className="group block p-5 sm:p-6 rounded-xl border border-gray-800 hover:border-gray-600 transition-all duration-200"
              style={{ background: '#161b22' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-gray-100 group-hover:text-white transition-colors mb-1 line-clamp-2">
                    {doc.title}
                  </h2>
                  {doc.description && (
                    <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                      {doc.description}
                    </p>
                  )}
                </div>
                <svg
                  className="flex-shrink-0 w-4 h-4 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all mt-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <time className="text-xs text-gray-600 font-mono">{doc.date}</time>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-800/50">
                  文档
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Count */}
      {docs.length > 0 && (
        <p className="mt-8 text-center text-gray-700 text-sm">
          共 {docs.length} 篇文档
        </p>
      )}
    </div>
  )
}
