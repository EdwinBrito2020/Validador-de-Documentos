import { NextResponse } from 'next/server'
import { getAllDocumentTypes, createDocumentType } from '@/lib/storage/documentTypes'

export async function GET() {
  try {
    const data = await getAllDocumentTypes()
    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const created = await createDocumentType(body)
    return NextResponse.json({ success: true, data: created })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
