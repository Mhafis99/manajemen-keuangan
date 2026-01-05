import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const transaction = await db.transaction.delete({
      where: { id: params.id }
    })
    return NextResponse.json(transaction)
  } catch (error) {
    console.error('Delete transaction error:', error)
    return NextResponse.json({ error: 'Gagal menghapus transaksi' }, { status: 500 })
  }
}
