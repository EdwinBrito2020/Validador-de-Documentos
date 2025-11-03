'use client'
import React from 'react'
import { nanoid } from 'nanoid'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

type Fija = { id: string, nombre: string, descripcion: string, severidad: 'critical'|'warning'|'info' }

type Conf = { id: string, nombre: string, descripcion: string, severidad: 'critical'|'warning'|'info', parametros_requeridos: string[], tipo_parametro: Record<string, 'string'|'number'|'boolean'|'date'> }

export function ValidationBuilder({ type, value, onChange }: { type: 'fija'|'configurable', value: any[], onChange: (v:any[])=>void }) {
  const add = () => {
    if (type === 'fija') onChange([...(value||[]), { id: nanoid(8), nombre: '', descripcion: '', severidad: 'info'} as Fija])
    else onChange([...(value||[]), { id: nanoid(8), nombre: '', descripcion: '', severidad: 'info', parametros_requeridos: [], tipo_parametro: {} } as Conf])
  }
  const del = (id: string) => onChange((value||[]).filter((v:any) => v.id !== id))
  const set = (id: string, patch: any) => onChange(value.map((v:any) => v.id === id ? { ...v, ...patch } : v))

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{type === 'fija' ? 'Validaciones Fijas' : 'Validaciones Configurables'}</h3>
        <Button type="button" onClick={add}>Agregar</Button>
      </div>
      {(value||[]).map((v:any) => (
        <div key={v.id} className="border rounded p-3 bg-slate-50 space-y-2">
          <div className="grid gap-2 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium">Nombre</label>
              <Input value={v.nombre} onChange={e=>set(v.id, { nombre: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium">Severidad</label>
              <Select value={v.severidad} onChange={e=>set(v.id, { severidad: e.target.value })}>
                <option value="critical">critical</option>
                <option value="warning">warning</option>
                <option value="info">info</option>
              </Select>
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium">&nbsp;</label>
              <Button type="button" variant="destructive" onClick={()=>del(v.id)}>Eliminar</Button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <Textarea value={v.descripcion} onChange={e=>set(v.id, { descripcion: e.target.value })} />
          </div>

          {type === 'configurable' && (
            <div className="grid gap-2 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">Parámetros requeridos</label>
                <div className="flex gap-2">
                  <Input placeholder="nombre_param" onKeyDown={e=>{
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      const val = (e.target as HTMLInputElement).value.trim()
                      if (!val) return
                      set(v.id, { parametros_requeridos: [...(v.parametros_requeridos||[]), val], tipo_parametro: { ...v.tipo_parametro, [val]: 'string' } })
                      ;(e.target as HTMLInputElement).value=''
                    }
                  }} />
                </div>
                <div className="flex gap-2 flex-wrap mt-2">
                  {(v.parametros_requeridos||[]).map((p:string) => (
                    <span key={p} className="inline-flex items-center gap-2 bg-slate-200 px-2 py-1 rounded text-xs">{p}
                      <button className="text-red-700" onClick={(e)=>{e.preventDefault(); set(v.id, { parametros_requeridos: v.parametros_requeridos.filter((x:string)=>x!==p) })}}>x</button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Tipo de parámetro</label>
                <div className="space-y-2">
                  {Object.keys(v.tipo_parametro||{}).map((k:string) => (
                    <div key={k} className="flex items-center gap-2">
                      <span className="text-sm w-40">{k}</span>
                      <Select value={v.tipo_parametro[k]} onChange={e=>set(v.id, { tipo_parametro: { ...v.tipo_parametro, [k]: e.target.value } })}>
                        <option value="string">string</option>
                        <option value="number">number</option>
                        <option value="boolean">boolean</option>
                        <option value="date">date</option>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
