'use server'
import { readData, writeData } from '@/lib/storage/fileStorage'
import { nanoid } from 'nanoid'
import { slugify } from '@/lib/utils'
import { DocumentType } from '@/types/documentType'
import { DocumentTypeSchema, type DocumentTypeInput } from '@/lib/schemas/documentType'

interface StoreShape { document_types: DocumentType[] }

export async function getAllDocumentTypes(): Promise<DocumentType[]> {
  const data = await readData<StoreShape>()
  return data.document_types
}

export async function getDocumentTypeById(id: string): Promise<DocumentType | null> {
  const all = await getAllDocumentTypes()
  return all.find(d => d.id === id) ?? null
}

export async function createDocumentType(input: DocumentTypeInput): Promise<DocumentType> {
  const parsed = DocumentTypeSchema.parse(input)
  const data = await readData<StoreShape>()
  if (data.document_types.some(dt => dt.identificador === parsed.identificador)) {
    throw new Error('El identificador ya existe')
  }
  const now = new Date().toISOString()
  const newItem: DocumentType = {
    id: nanoid(12),
    created_at: now,
    updated_at: now,
    ...parsed,
  }
  data.document_types.push(newItem)
  await writeData(data)
  return newItem
}

export async function updateDocumentType(id: string, patch: Partial<DocumentType>): Promise<DocumentType> {
  const data = await readData<StoreShape>()
  const idx = data.document_types.findIndex(d => d.id === id)
  if (idx === -1) throw new Error('No encontrado')
  const current = data.document_types[idx]

  if (!current) throw new Error('No encontrado')

  if (patch.identificador && patch.identificador !== current.identificador) {
    if (data.document_types.some(dt => dt.identificador === patch.identificador)) {
      throw new Error('El identificador ya existe')
    }
  }

  const merged: DocumentType = {
    ...current,
    ...patch,
    updated_at: new Date().toISOString(),
  }
  data.document_types[idx] = merged
  await writeData(data)
  return merged
}

export async function deleteDocumentType(id: string): Promise<void> {
  const data = await readData<StoreShape>()
  const next = data.document_types.filter(d => d.id !== id)
  data.document_types = next
  await writeData(data)
}

export async function duplicateDocumentType(id: string): Promise<DocumentType> {
  const orig = await getDocumentTypeById(id)
  if (!orig) throw new Error('No encontrado')
  const data = await readData<StoreShape>()
  const baseName = `Copia de ${orig.nombre}`
  let slug = slugify(baseName) || 'tipo'
  let suffix = 1
  while (data.document_types.some(dt => dt.identificador === slug)) {
    slug = `${slugify(baseName)}-${suffix++}`
  }
  const now = new Date().toISOString()
  const copy: DocumentType = {
    ...orig,
    id: nanoid(12),
    nombre: baseName,
    identificador: slug,
    version: 1,
    created_at: now,
    updated_at: now,
  }
  data.document_types.push(copy)
  await writeData(data)
  return copy
}
