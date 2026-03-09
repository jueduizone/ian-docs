import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ian's Docs",
  description: "AI & Product documentation by Ian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen" style={{ background: '#0d1117' }}>
        <header className="border-b border-gray-800 sticky top-0 z-10" style={{ background: 'rgba(13,17,23,0.95)', backdropFilter: 'blur(8px)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs font-bold">I</div>
              <span className="text-white font-semibold text-base">Ian&apos;s Docs</span>
            </a>
            <nav className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">AI · Product · Engineering</span>
            </nav>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          {children}
        </main>
        <footer className="border-t border-gray-800 mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Ian&apos;s Docs · Built with Next.js
          </div>
        </footer>
      </body>
    </html>
  );
}
