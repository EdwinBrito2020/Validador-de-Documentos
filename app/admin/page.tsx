import Link from 'next/link'

export default function AdminIndex() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p>Ve a <Link className="text-blue-600 underline" href="/admin/tipos-documento">Tipos de documento</Link>.</p>
    </div>
  )
}
