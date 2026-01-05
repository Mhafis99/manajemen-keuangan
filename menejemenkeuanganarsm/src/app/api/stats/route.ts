import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const transactions = await db.transaction.findMany()

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    const balance = totalIncome - totalExpense

    const recentTransactions = await db.transaction.findMany({
      include: { member: true },
      orderBy: { date: 'desc' },
      take: 10
    })

    return NextResponse.json({
      totalIncome,
      totalExpense,
      balance,
      totalTransactions: transactions.length,
      recentTransactions
    })
  } catch (error) {
    console.error('Get stats error:', error)
    return NextResponse.json({ error: 'Gagal mengambil statistik' }, { status: 500 })
  }
}
