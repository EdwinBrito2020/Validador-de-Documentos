'use client'
import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function PromptEditor({ value, onChange, variables }: { value: string, onChange: (v:string)=>void, variables: { key: string, description: string }[] }) {
  const [showPreview, setShowPreview] = React.useState(true)
  const example = {
    tipo_documento: 'Cédula de Ciudadanía',
    campos: `- numero_documento
- nombres
- fecha_expedicion`,
    validaciones: `- Legibilidad (critical)
- Autenticidad (critical)`,
    parametros: 'dias_maximos=365'
  }
  const preview = value
    .replaceAll('{{tipo_documento}}', example.tipo_documento)
    .replaceAll('{{campos}}', example.campos)
    .replaceAll('{{validaciones}}', example.validaciones)
    .replaceAll('{{parametros}}', example.parametros)

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">Template</label>
        <Textarea value={value} onChange={e=>onChange(e.target.value)} />
        <div className="flex flex-wrap gap-2 mt-2">
          {variables.map(v => (
            <Button key={v.key} type="button" variant="outline" onClick={()=>onChange(value + (value.endsWith('\n')?'':'\n') + v.key)}>{v.key}</Button>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium">Preview</label>
          <Button type="button" variant="outline" onClick={()=>setShowPreview(s=>!s)}>{showPreview? 'Ocultar' : 'Mostrar'}</Button>
        </div>
        {showPreview && (
          <pre className="mt-2 p-3 bg-slate-900 text-white text-xs rounded whitespace-pre-wrap">{preview}</pre>
        )}
      </div>
    </div>
  )
}
