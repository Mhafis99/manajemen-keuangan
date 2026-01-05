'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpCircle, ArrowDownCircle, Wallet2, LogOut, Users, Plus, Trash2, History, UserPlus } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface User {
  id: string
  email: string
  name: string | null
  role: string
}

interface Member {
  id: string
  name: string
  email: string | null
  phone: string | null
  address: string | null
}

interface Transaction {
  id: string
  type: string
  amount: number
  category: string | null
  description: string | null
  memberId: string | null
  member: Member | null
  date: string
}

interface Stats {
  totalIncome: number
  totalExpense: number
  balance: number
  totalTransactions: number
  recentTransactions: Transaction[]
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  // Transaction form state
  const [transactionType, setTransactionType] = useState('income')
  const [transactionAmount, setTransactionAmount] = useState('')
  const [transactionCategory, setTransactionCategory] = useState('')
  const [transactionDescription, setTransactionDescription] = useState('')
  const [transactionMemberId, setTransactionMemberId] = useState('')

  // Member form state
  const [memberName, setMemberName] = useState('')
  const [memberEmail, setMemberEmail] = useState('')
  const [memberPhone, setMemberPhone] = useState('')
  const [memberAddress, setMemberAddress] = useState('')

  // User form state
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userRole, setUserRole] = useState('member')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (!savedUser) {
      router.push('/')
      return
    }
    setUser(JSON.parse(savedUser))
    loadDashboardData()
  }, [router])

  const loadDashboardData = async () => {
    try {
      const [statsRes, transactionsRes, membersRes, usersRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/transactions'),
        fetch('/api/members'),
        fetch('/api/users')
      ])

      const [statsData, transactionsData, membersData, usersData] = await Promise.all([
        statsRes.json(),
        transactionsRes.json(),
        membersRes.json(),
        usersRes.json()
      ])

      setStats(statsData)
      setTransactions(transactionsData)
      setMembers(membersData)
      setUsers(usersData)
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
    router.push('/')
  }

  const handleAddTransaction = async () => {
    if (!transactionAmount) return

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: transactionType,
          amount: transactionAmount,
          category: transactionCategory,
          description: transactionDescription,
          memberId: transactionMemberId || null
        })
      })

      if (response.ok) {
        setTransactionAmount('')
        setTransactionCategory('')
        setTransactionDescription('')
        setTransactionMemberId('')
        setMessage('Transaksi berhasil ditambahkan')
        loadDashboardData()
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      console.error('Error adding transaction:', error)
    }
  }

  const handleDeleteTransaction = async (id: string) => {
    try {
      await fetch(`/api/transactions/${id}`, { method: 'DELETE' })
      loadDashboardData()
    } catch (error) {
      console.error('Error deleting transaction:', error)
    }
  }

  const handleAddMember = async () => {
    if (!memberName) return

    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: memberName,
          email: memberEmail,
          phone: memberPhone,
          address: memberAddress
        })
      })

      if (response.ok) {
        setMemberName('')
        setMemberEmail('')
        setMemberPhone('')
        setMemberAddress('')
        setMessage('Anggota berhasil ditambahkan')
        loadDashboardData()
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      console.error('Error adding member:', error)
    }
  }

  const handleDeleteMember = async (id: string) => {
    try {
      await fetch(`/api/members/${id}`, { method: 'DELETE' })
      loadDashboardData()
    } catch (error) {
      console.error('Error deleting member:', error)
    }
  }

  const handleAddUser = async () => {
    if (!userEmail || !userPassword || !userRole) return

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
          name: userName,
          role: userRole
        })
      })

      const data = await response.json()
      if (response.ok) {
        setUserName('')
        setUserEmail('')
        setUserPassword('')
        setMessage('User berhasil ditambahkan')
        loadDashboardData()
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage(data.error || 'Gagal menambahkan user')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  const handleDeleteUser = async (id: string) => {
    try {
      await fetch(`/api/users/${id}`, { method: 'DELETE' })
      loadDashboardData()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const isAdmin = user?.role === 'admin'

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Memuat data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet2 className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Manajemen Keuangan</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user?.name} ({user?.role === 'admin' ? 'Admin' : 'Anggota'})
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Keluar
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {message && (
          <Alert className="mb-6">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pemasukan</CardTitle>
              <ArrowUpCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats ? formatCurrency(stats.totalIncome) : '-'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
              <ArrowDownCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stats ? formatCurrency(stats.totalExpense) : '-'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo</CardTitle>
              <Wallet2 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stats?.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats ? formatCurrency(stats.balance) : '-'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.totalTransactions || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="transactions">Transaksi</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            {isAdmin && (
              <>
                <TabsTrigger value="members">Anggota</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </>
            )}
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            {isAdmin && (
              <Card>
                <CardHeader>
                  <CardTitle>Tambah Transaksi Baru</CardTitle>
                  <CardDescription>Masukkan data transaksi pemasukan atau pengeluaran</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Jenis Transaksi</Label>
                      <Select value={transactionType} onValueChange={setTransactionType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">Pemasukan</SelectItem>
                          <SelectItem value="expense">Pengeluaran</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Jumlah (Rp)</Label>
                      <Input
                        type="number"
                        placeholder="100000"
                        value={transactionAmount}
                        onChange={(e) => setTransactionAmount(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Kategori</Label>
                      <Input
                        placeholder="Gaji, Belanja, dll."
                        value={transactionCategory}
                        onChange={(e) => setTransactionCategory(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Anggota (Opsional)</Label>
                      <Select value={transactionMemberId} onValueChange={setTransactionMemberId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih anggota" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Tanpa Anggota</SelectItem>
                          {members.map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                              {member.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Deskripsi</Label>
                    <Input
                      placeholder="Deskripsi transaksi"
                      value={transactionDescription}
                      onChange={(e) => setTransactionDescription(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleAddTransaction}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Transaksi
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Transaksi Terbaru</CardTitle>
                <CardDescription>10 transaksi terakhir</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Jenis</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead>Anggota</TableHead>
                        <TableHead>Jumlah</TableHead>
                        {isAdmin && <TableHead>Aksi</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stats?.recentTransactions.map((t) => (
                        <TableRow key={t.id}>
                          <TableCell className="text-sm">{formatDate(t.date)}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              t.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                            </span>
                          </TableCell>
                          <TableCell>{t.category || '-'}</TableCell>
                          <TableCell>{t.description || '-'}</TableCell>
                          <TableCell>{t.member?.name || '-'}</TableCell>
                          <TableCell className={`font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                          </TableCell>
                          {isAdmin && (
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteTransaction(t.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Semua Riwayat Transaksi</CardTitle>
                <CardDescription>Daftar lengkap semua transaksi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto max-h-96 overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Jenis</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead>Anggota</TableHead>
                        <TableHead>Jumlah</TableHead>
                        {isAdmin && <TableHead>Aksi</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((t) => (
                        <TableRow key={t.id}>
                          <TableCell className="text-sm">{formatDate(t.date)}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              t.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                            </span>
                          </TableCell>
                          <TableCell>{t.category || '-'}</TableCell>
                          <TableCell>{t.description || '-'}</TableCell>
                          <TableCell>{t.member?.name || '-'}</TableCell>
                          <TableCell className={`font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                          </TableCell>
                          {isAdmin && (
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteTransaction(t.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members Tab - Admin Only */}
          {isAdmin && (
            <TabsContent value="members">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tambah Anggota Baru</CardTitle>
                    <CardDescription>Masukkan data anggota</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nama Lengkap *</Label>
                      <Input
                        placeholder="Nama anggota"
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="email@contoh.com"
                        value={memberEmail}
                        onChange={(e) => setMemberEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>No. Telepon</Label>
                      <Input
                        placeholder="08123456789"
                        value={memberPhone}
                        onChange={(e) => setMemberPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Alamat</Label>
                      <Input
                        placeholder="Alamat lengkap"
                        value={memberAddress}
                        onChange={(e) => setMemberAddress(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddMember}>
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Anggota
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Daftar Anggota</CardTitle>
                    <CardDescription>Semua anggota terdaftar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Telepon</TableHead>
                            <TableHead>Aksi</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {members.map((member) => (
                            <TableRow key={member.id}>
                              <TableCell className="font-medium">{member.name}</TableCell>
                              <TableCell>{member.email || '-'}</TableCell>
                              <TableCell>{member.phone || '-'}</TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteMember(member.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          {/* Users Tab - Admin Only */}
          {isAdmin && (
            <TabsContent value="users">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tambah User Baru</CardTitle>
                    <CardDescription>Buat akun untuk admin atau anggota</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nama</Label>
                      <Input
                        placeholder="Nama user"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        placeholder="email@contoh.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Password *</Label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Role *</Label>
                      <Select value={userRole} onValueChange={setUserRole}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Anggota</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddUser}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Tambah User
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Daftar User</CardTitle>
                    <CardDescription>Semua user terdaftar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Aksi</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map((u) => (
                            <TableRow key={u.id}>
                              <TableCell className="font-medium">{u.name || '-'}</TableCell>
                              <TableCell>{u.email}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {u.role === 'admin' ? 'Admin' : 'Anggota'}
                                </span>
                              </TableCell>
                              <TableCell>
                                {u.id !== user?.id && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteUser(u.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  )
}
