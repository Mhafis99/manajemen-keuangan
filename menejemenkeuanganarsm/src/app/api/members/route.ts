import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const members = await db.member.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(members)
  } catch (error) {
    console.error('Get members error:', error)
    return NextResponse.json({ error: 'Gagal mengambil data anggota' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, phone, address } = data

    if (!name) {
      return NextResponse.json(
        { error: 'Nama anggota harus diisi' },
        { status: 400 }
      )
    }

    const member = await db.member.create({
      data: {
        name,
        email,
        phone,
        address
      }
    })

    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    console.error('Create member error:', error)
    return NextResponse.json({ error: 'Gagal membuat anggota' }, { status: 500 })
  }
}
