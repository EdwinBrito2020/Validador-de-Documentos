import { z } from 'zod'

export const CampoSchema = z.object({
  id: z.string(),
  campo: z.string().min(1, 'El nombre del campo es requerido'),
  tipo: z.enum(['string', 'number', 'date', 'boolean', 'email']),
  requerido: z.boolean(),
  descripcion: z.string().default(''),
  validacion_cruzada: z.boolean().optional(),
  regex: z.string().optional(),
  min_length: z.number().optional(),
  max_length: z.number().optional(),
  min_value: z.number().optional(),
  max_value: z.number().optional(),
})

export const ValidacionFijaSchema = z.object({
  id: z.string(),
  nombre: z.string().min(1),
  descripcion: z.string().default(''),
  severidad: z.enum(['critical', 'warning', 'info']),
})

export const ValidacionConfigurableSchema = z.object({
  id: z.string(),
  nombre: z.string().min(1),
  descripcion: z.string().default(''),
  severidad: z.enum(['critical', 'warning', 'info']),
  parametros_requeridos: z.array(z.string()),
  tipo_parametro: z.record(z.enum(['string', 'number', 'boolean', 'date'])),
})

export const DocumentTypeSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  identificador: z.string().min(3).regex(/^[a-z0-9-]+$/, 'Solo minúsculas, números y guiones'),
  version: z.number().int().positive(),
  descripcion: z.string().optional(),
  activo: z.boolean(),
  configuracion_archivos: z.object({
    max_size_mb: z.number().positive(),
    allowed_formats: z.array(z.string()),
    procesamiento: z.object({
      metodo: z.enum(['hibrido', 'local', 'directo']),
      reglas_auto: z.record(z.string()).optional(),
    }),
  }),
  campos_extraibles: z.array(CampoSchema).min(1, 'Debe haber al menos un campo'),
  validaciones_fijas: z.array(ValidacionFijaSchema),
  validaciones_configurables: z.array(ValidacionConfigurableSchema),
  prompt_template: z.string().min(50, 'El prompt debe tener al menos 50 caracteres'),
  configuracion_adicional: z.record(z.any()).optional(),
})

export type DocumentTypeInput = z.infer<typeof DocumentTypeSchema>
