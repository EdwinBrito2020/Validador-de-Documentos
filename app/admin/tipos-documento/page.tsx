'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, THead, TH, TBody, TD } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'

interface DocType {
  id: string; nombre: string; identificador: string; version: number; activo: boolean; updated_at: string; campos_extraibles: any[]
}

export default function TiposDocumentoPage() {
  const [items, setItems] = React.useState<DocType[]>([])
  const [loading, setLoading] = React.useState(true)
  const [query, setQuery] = React.useState('')
  const [estado, setEstado] = React.useState<'all' | 'activos' | 'inactivos'>('all')
  const { push, Toasts } = useToast()

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/document-types', { cache: 'no-store' })
    const json = await res.json()
    setItems(json.data || [])
    setLoading(false)
  }

  React.useEffect(() => { load() }, [])

  const eliminar = async (id: string) => {
    if (!confirm('¿Eliminar este tipo de documento?')) return
    const res = await fetch(`/api/document-types/${id}`, { method: 'DELETE' })
    if (res.ok) { push('Eliminado'); load() } else { push('Error al eliminar') }
  }

  const duplicar = async (id: string) => {
    const res = await fetch(`/api/document-types/${id}?action=duplicate`, { method: 'POST' })
    if (res.ok) { push('Duplicado'); load() } else { push('Error al duplicar') }
  }

  const filtered = items.filter(i => {
    const okQ = `${i.nombre} ${i.identificador}`.toLowerCase().includes(query.toLowerCase())
    const okS = estado === 'all' ? true : estado === 'activos' ? i.activo : !i.activo
    return okQ && okS
  })

  return (
    <div className="space-y-4">
      <Toasts />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Tipos de documento</h1>
        <Link href="/admin/tipos-documento/nuevo"><Button>Crear Nuevo Tipo</Button></Link>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
            <input className="border rounded px-3 py-2 text-sm w-full md:w-72" placeholder="Buscar por nombre o identificador" value={query} onChange={e=>setQuery(e.target.value)} />
            <select className="border rounded px-3 py-2 text-sm w-full md:w-48" value={estado} onChange={e=>setEstado(e.target.value as any)}>
              <option value="all">Todos</option>
              <option value="activos">Activos</option>
              <option value="inactivos">Inactivos</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-10 text-center text-slate-500">Cargando...</div>
          ) : (
            <div className="overflow-auto">
              <Table>
                <THead>
                  <tr>
                    <TH>Nombre</TH>
                    <TH>Identificador</TH>
                    <TH>Versión</TH>
                    <TH>Estado</TH>
                    <TH>Campos</TH>
                    <TH>Última actualización</TH>
                    <TH>Acciones</TH>
                  </tr>
                </THead>
                <TBody>
                  {filtered.map(i => (
                    <tr key={i.id}>
                      <TD>{i.nombre}</TD>
                      <TD className="text-slate-600">{i.identificador}</TD>
                      <TD>{i.version}</TD>
                      <TD>{i.activo ? <Badge color="green">activo</Badge> : <Badge color="red">inactivo</Badge>}</TD>
                      <TD>{i.campos_extraibles?.length ?? 0}</TD>
                      <TD>{new Date(i.updated_at).toLocaleString()}</TD>
                      <TD>
                        <div className="flex gap-2">
                          <Link className="text-blue-700 hover:underline" href={`/admin/tipos-documento/${i.id}/editar`}>Editar</Link>
                          <button className="text-yellow-700 hover:underline" onClick={()=>duplicar(i.id)}>Duplicar</button>
                          <button className="text-red-700 hover:underline" onClick={()=>eliminar(i.id)}>Eliminar</button>
                        </div>
                      </TD>
                    </tr>
                  ))}
                </TBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
