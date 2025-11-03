'use client'
import React from 'react'
import { useRouter, useParams } from 'next/navigation'
import { DocumentTypeForm } from '@/app/admin/components/DocumentTypeForm'
import type { DocumentType } from '@/types/documentType'

export default function EditarTipoPage() {
  const router = useRouter()
  const params = useParams() as { id: string }
  const [initial, setInitial] = React.useState<DocumentType | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    (async () => {
      const res = await fetch(`/api/document-types/${params.id}`)
      const json = await res.json()
      setInitial(json.data)
      setLoading(false)
    })()
  }, [params.id])

  const onSubmit = async (data: DocumentType) => {
    const res = await fetch(`/api/document-types/${params.id}`, { method: 'PUT', body: JSON.stringify(data) })
    if (res.ok) router.push('/admin/tipos-documento')
    else { const j = await res.json(); alert(j.error || 'Error al actualizar') }
  }

  if (loading) return <div>Cargando...</div>
  if (!initial) return <div>No encontrado</div>

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Editar tipo de documento</h1>
      <DocumentTypeForm initialData={initial} onSubmit={onSubmit} onCancel={()=>history.back()} />
    </div>
  )
}
