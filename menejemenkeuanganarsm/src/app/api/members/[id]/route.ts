import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const member = await db.member.delete({
      where: { id: params.id }
    })
    return NextResponse.json(member)
  } catch (error) {
    console.error('Delete member error:', error)
    return NextResponse.json({ error: 'Gagal menghapus anggota' }, { status: 500 })
  }
}
