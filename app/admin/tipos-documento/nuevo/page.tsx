'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { DocumentTypeForm } from '@/app/admin/components/DocumentTypeForm'
import type { DocumentType } from '@/types/documentType'

export default function NuevoTipoPage() {
  const router = useRouter()
  const onSubmit = async (data: DocumentType) => {
    const res = await fetch('/api/document-types', { method: 'POST', body: JSON.stringify(data) })
    if (res.ok) {
      router.push('/admin/tipos-documento')
    } else {
      const j = await res.json(); alert(j.error || 'Error al crear')
    }
  }
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Crear tipo de documento</h1>
      <DocumentTypeForm onSubmit={onSubmit} onCancel={()=>history.back()} />
    </div>
  )
}
