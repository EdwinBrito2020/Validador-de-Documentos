import Link from 'next/link'
import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[240px_1fr]">
      <aside className="border-r bg-slate-50 p-4 space-y-4">
        <h2 className="font-semibold">Administración</h2>
        <nav className="flex flex-col gap-2 text-sm">
          <Link className="hover:underline" href="/admin/tipos-documento">Tipos de documento</Link>
        </nav>
      </aside>
      <main className="p-6">{children}</main>
    </div>
  )
}
