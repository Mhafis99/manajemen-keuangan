import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const users = await db.user.findMany({
      orderBy: { createdAt: 'desc' }
    })
    const usersWithoutPassword = users.map(({ password, ...user }) => user)
    return NextResponse.json(usersWithoutPassword)
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json({ error: 'Gagal mengambil data user' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { email, password, name, role } = data

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Email, password, dan role harus diisi' },
        { status: 400 }
      )
    }

    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 400 }
      )
    }

    const user = await db.user.create({
      data: {
        email,
        password,
        name,
        role // 'admin' atau 'member'
      }
    })

    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error('Create user error:', error)
    return NextResponse.json({ error: 'Gagal membuat user' }, { status: 500 })
  }
}
