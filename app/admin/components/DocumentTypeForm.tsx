'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DocumentTypeSchema } from '@/lib/schemas/documentType'
import type { DocumentType } from '@/types/documentType'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { FieldBuilder } from './FieldBuilder'
import { ValidationBuilder } from './ValidationBuilder'
import { PromptEditor } from './PromptEditor'
import { nanoid } from 'nanoid'

interface DocumentTypeFormProps {
  initialData?: DocumentType
  onSubmit: (data: any) => Promise<void>
  onCancel: () => void
}

export function DocumentTypeForm({ initialData, onSubmit, onCancel }: DocumentTypeFormProps) {
  const defaultValues = initialData || {
    nombre: '',
    identificador: '',
    version: 1,
    descripcion: '',
    activo: true,
    configuracion_archivos: {
      max_size_mb: 5,
      allowed_formats: ['pdf', 'jpg', 'png'],
      procesamiento: { metodo: 'hibrido' as const }
    },
    campos_extraibles: [
      { id: nanoid(8), campo: 'numero_documento', tipo: 'string', requerido: true, descripcion: '' }
    ],
    validaciones_fijas: [],
    validaciones_configurables: [],
    prompt_template: 'Analiza la siguiente {{tipo_documento}}.\n\nExtrae los siguientes campos:\n{{campos}}\n\nAplica las siguientes validaciones:\n{{validaciones}}\n\nParámetros adicionales:\n{{parametros}}\n\nResponde en formato JSON con claves en snake_case.',
    configuracion_adicional: {}
  }

  const { register, handleSubmit, formState, watch, setValue } = useForm<any>({
    resolver: zodResolver(DocumentTypeSchema),
    defaultValues,
    mode: 'onChange'
  })

  const [tab, setTab] = React.useState('info')

  const valores = watch()

  const submit = (vals: any) => onSubmit(vals)

  const sugerirIdentificador = () => {
    const slug = (valores.nombre || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    setValue('identificador', slug, { shouldValidate: true })
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(submit)}>
      <Tabs value={tab} onValueChange={setTab as any}>
        <TabsList>
          <TabsTrigger value="info" current={tab} onClick={setTab as any}>Información Básica</TabsTrigger>
          <TabsTrigger value="files" current={tab} onClick={setTab as any}>Configuración de Archivos</TabsTrigger>
          <TabsTrigger value="fields" current={tab} onClick={setTab as any}>Campos a Extraer</TabsTrigger>
          <TabsTrigger value="valf" current={tab} onClick={setTab as any}>Validaciones Fijas</TabsTrigger>
          <TabsTrigger value="valc" current={tab} onClick={setTab as any}>Validaciones Configurables</TabsTrigger>
          <TabsTrigger value="prompt" current={tab} onClick={setTab as any}>Template de Prompt</TabsTrigger>
          <TabsTrigger value="extra" current={tab} onClick={setTab as any}>Configuración Adicional</TabsTrigger>
        </TabsList>

        <TabsContent value="info" current={tab}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Nombre</label>
              <Input {...register('nombre')} />
              {formState.errors?.nombre && <p className="text-red-600 text-xs mt-1">{String(formState.errors.nombre.message)}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Identificador</label>
              <div className="flex gap-2">
                <Input {...register('identificador')} />
                <Button type="button" variant="outline" onClick={sugerirIdentificador}>Sugerir</Button>
              </div>
              {formState.errors?.identificador && <p className="text-red-600 text-xs mt-1">{String(formState.errors.identificador.message)}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Descripción</label>
              <Textarea {...register('descripcion')} />
            </div>
            <div>
              <label className="block text-sm font-medium">Estado</label>
              <Select {...register('activo' as any)}>
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium">Versión</label>
              <Input type="number" {...register('version', { valueAsNumber: true })} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="files" current={tab}>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium">Tamaño máximo (MB)</label>
              <Input type="number" step="0.1" {...register('configuracion_archivos.max_size_mb', { valueAsNumber: true })} />
            </div>
            <div>
              <label className="block text-sm font-medium">Formatos permitidos (coma separada)</label>
              <Input {...register('configuracion_archivos.allowed_formats_str')} onChange={e=>{
                setValue('configuracion_archivos.allowed_formats', e.target.value.split(',').map(s=>s.trim()).filter(Boolean), { shouldValidate: true })
              }} placeholder="pdf, jpg, png" />
            </div>
            <div>
              <label className="block text-sm font-medium">Método de procesamiento</label>
              <Select {...register('configuracion_archivos.procesamiento.metodo')}>
                <option value="hibrido">híbrido</option>
                <option value="local">local</option>
                <option value="directo">directo</option>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="fields" current={tab}>
          <FieldBuilder value={valores.campos_extraibles} onChange={(v)=>setValue('campos_extraibles', v, { shouldValidate: true })} />
          {formState.errors?.campos_extraibles && <p className="text-red-600 text-xs mt-1">{String(formState.errors.campos_extraibles.message)}</p>}
        </TabsContent>

        <TabsContent value="valf" current={tab}>
          <ValidationBuilder type="fija" value={valores.validaciones_fijas} onChange={(v)=>setValue('validaciones_fijas', v)} />
        </TabsContent>

        <TabsContent value="valc" current={tab}>
          <ValidationBuilder type="configurable" value={valores.validaciones_configurables} onChange={(v)=>setValue('validaciones_configurables', v)} />
        </TabsContent>

        <TabsContent value="prompt" current={tab}>
          <PromptEditor value={valores.prompt_template} onChange={(v)=>setValue('prompt_template', v, { shouldValidate: true })} variables={[
            { key: '{{tipo_documento}}', description: 'Nombre del tipo de documento' },
            { key: '{{campos}}', description: 'Lista de campos a extraer' },
            { key: '{{validaciones}}', description: 'Validaciones a aplicar' },
            { key: '{{parametros}}', description: 'Parámetros del cliente' }
          ]} />
          {formState.errors?.prompt_template && <p className="text-red-600 text-xs mt-1">{String(formState.errors.prompt_template.message)}</p>}
        </TabsContent>

        <TabsContent value="extra" current={tab}>
          <label className="block text-sm font-medium">Configuración adicional (JSON)</label>
          <Textarea defaultValue={JSON.stringify(valores.configuracion_adicional || {}, null, 2)} onBlur={e=>{
            try { const v = JSON.parse(e.target.value); setValue('configuracion_adicional', v, { shouldValidate: true }) }
            catch { alert('JSON inválido') }
          }} />
        </TabsContent>
      </Tabs>

      <div className="flex items-center gap-2">
        <Button type="submit">Guardar</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
      </div>
    </form>
  )
}
