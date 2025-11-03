'use client'
import React from 'react'
import { nanoid } from 'nanoid'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type Campo = {
  id: string
  campo: string
  tipo: 'string'|'number'|'date'|'boolean'|'email'
  requerido: boolean
  descripcion: string
  validacion_cruzada?: boolean
  regex?: string
  min_length?: number
  max_length?: number
  min_value?: number
  max_value?: number
}

export function FieldBuilder({ value, onChange }: { value: Campo[], onChange: (v: Campo[])=>void }) {
  const add = () => {
    onChange([...(value||[]), { id: nanoid(8), campo: '', tipo: 'string', requerido: false, descripcion: '' }])
  }
  const del = (id: string) => onChange((value||[]).filter(f => f.id !== id))
  const up = (idx: number) => {
    if (idx <= 0) return
    const copy = [...value]
    const temp = copy[idx] as Campo
    copy[idx] = copy[idx-1] as Campo
    copy[idx-1] = temp
    onChange(copy)
  }
  const down = (idx: number) => {
    if (idx >= value.length - 1) return
    const copy = [...value]
    const temp = copy[idx] as Campo
    copy[idx] = copy[idx+1] as Campo
    copy[idx+1] = temp
    onChange(copy)
  }

  const set = (id: string, patch: Partial<Campo>) => {
    onChange(value.map(f => f.id === id ? { ...f, ...patch } : f))
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Campos configurados</h3>
        <Button type="button" onClick={add}>Agregar campo</Button>
      </div>
      {(value||[]).length === 0 && <p className="text-sm text-slate-500">No hay campos aún.</p>}
      <div className="space-y-4">
        {value.map((f, idx) => (
          <div key={f.id} className="border rounded p-3 bg-slate-50">
            <div className="grid gap-2 md:grid-cols-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium">Nombre del campo</label>
                <Input value={f.campo} onChange={e=>set(f.id, { campo: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium">Tipo</label>
                <Select value={f.tipo} onChange={e=>set(f.id, { tipo: e.target.value as any })}>
                  <option value="string">string</option>
                  <option value="number">number</option>
                  <option value="date">date</option>
                  <option value="boolean">boolean</option>
                  <option value="email">email</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium">Requerido</label>
                <select className="border rounded px-3 py-2 text-sm w-full" value={String(f.requerido)} onChange={e=>set(f.id, { requerido: e.target.value === 'true' })}>
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium">Descripción</label>
                <Input value={f.descripcion} onChange={e=>set(f.id, { descripcion: e.target.value })} />
              </div>
            </div>

            {/* Condicionales */}
            {f.tipo === 'string' && (
              <div className="grid gap-2 md:grid-cols-3 mt-2">
                <div>
                  <label className="block text-sm font-medium">Regex</label>
                  <Input value={f.regex || ''} onChange={e=>set(f.id, { regex: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium">Min length</label>
                  <Input type="number" value={f.min_length ?? ''} onChange={e=>set(f.id, { min_length: e.target.value? Number(e.target.value): undefined })} />
                </div>
                <div>
                  <label className="block text-sm font-medium">Max length</label>
                  <Input type="number" value={f.max_length ?? ''} onChange={e=>set(f.id, { max_length: e.target.value? Number(e.target.value): undefined })} />
                </div>
              </div>
            )}
            {f.tipo === 'number' && (
              <div className="grid gap-2 md:grid-cols-2 mt-2">
                <div>
                  <label className="block text-sm font-medium">Min value</label>
                  <Input type="number" value={f.min_value ?? ''} onChange={e=>set(f.id, { min_value: e.target.value? Number(e.target.value): undefined })} />
                </div>
                <div>
                  <label className="block text-sm font-medium">Max value</label>
                  <Input type="number" value={f.max_value ?? ''} onChange={e=>set(f.id, { max_value: e.target.value? Number(e.target.value): undefined })} />
                </div>
              </div>
            )}

            <div className="mt-3 flex items-center gap-2">
              <Button type="button" variant="outline" onClick={()=>up(idx)}>↑</Button>
              <Button type="button" variant="outline" onClick={()=>down(idx)}>↓</Button>
              <Button type="button" variant="destructive" onClick={()=>del(f.id)}>Eliminar</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
