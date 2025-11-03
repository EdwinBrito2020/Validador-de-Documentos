import { NextResponse } from 'next/server'
import { getDocumentTypeById, updateDocumentType, deleteDocumentType, duplicateDocumentType } from '@/lib/storage/documentTypes'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const item = await getDocumentTypeById(params.id)
    if (!item) return NextResponse.json({ success: false, error: 'No encontrado' }, { status: 404 })
    return NextResponse.json({ success: true, data: item })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const patch = await req.json()
    const updated = await updateDocumentType(params.id, patch)
    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await deleteDocumentType(params.id)
    return NextResponse.json({ success: true, message: 'Tipo de documento eliminado' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const url = new URL(req.url)
    const action = url.searchParams.get('action')
    if (action === 'duplicate') {
      const copy = await duplicateDocumentType(params.id)
      return NextResponse.json({ success: true, data: copy })
    }
    return NextResponse.json({ success: false, error: 'Acción no soportada' }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
