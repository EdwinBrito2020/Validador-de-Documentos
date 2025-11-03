import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="container py-10">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-3xl font-bold">Panel de Administración de Tipos de Documentos</h1>
        <p className="text-slate-600">Administra campos, validaciones y plantillas de prompt para tu microservicio de validación con IA.</p>
        <Link className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" href="/admin/tipos-documento">Ir al Panel</Link>
      </div>
    </main>
  )
}
