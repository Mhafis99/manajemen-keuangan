# 📊 Aplikasi Manajemen Keuangan

Aplikasi manajemen keuangan lengkap dengan login untuk admin dan anggota, dibuat dengan Next.js 15, TypeScript, Prisma, dan SQLite.

## 🚀 Fitur Utama

### Untuk Admin
- ✅ Dashboard dengan statistik keuangan (pemasukan, pengeluaran, saldo)
- ✅ Manajemen transaksi (tambah/hapus pemasukan & pengeluaran)
- ✅ Riwayat transaksi lengkap
- ✅ Manajemen anggota (CRUD)
- ✅ Manajemen user (buat admin/anggota baru)

### Untuk Anggota (View Only)
- ✅ Lihat dashboard statistik
- ✅ Lihat riwayat transaksi
- ✅ Lihat daftar anggota
- ❌ Tidak bisa mengelola data

## 📦 Teknologi

- **Framework**: Next.js 15 dengan App Router
- **Language**: TypeScript 5
- **Database**: SQLite + Prisma ORM
- **UI**: shadcn/ui + Tailwind CSS
- **Icons**: Lucide React

## 🛠️ Installation

### Prerequisites
- Node.js 18+ atau Bun
- Git

### Setup Local

```bash
# Clone repository
git clone https://github.com/GITHUB_USERNAME/manajemen-keuangan.git
cd manajemen-keuangan

# Install dependencies
bun install

# Setup database
bun run db:push

# Seed admin & member user
bun seed.ts

# Start development server
bun run dev
```

Aplikasi akan berjalan di: http://localhost:3000

## 👤 Akun Demo

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@contoh.com | admin123 |
| Anggota | anggota@contoh.com | anggota123 |

## 📂 Struktur Proyek

```
manajemen-keuangan/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/          # Authentication API
│   │   │   ├── transactions/   # Transaksi CRUD
│   │   │   ├── members/       # Anggota CRUD
│   │   │   ├── users/         # User CRUD
│   │   │   └── stats/         # Statistik keuangan
│   │   ├── dashboard/         # Halaman dashboard
│   │   ├── page.tsx           # Halaman login
│   │   └── layout.tsx
│   ├── components/ui/         # shadcn/ui components
│   └── lib/
│       └── db.ts              # Prisma client
├── prisma/
│   └── schema.prisma          # Database schema
└── package.json
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user baru

### Transactions
- `GET /api/transactions` - Ambil semua transaksi
- `POST /api/transactions` - Buat transaksi baru
- `DELETE /api/transactions/[id]` - Hapus transaksi

### Members
- `GET /api/members` - Ambil semua anggota
- `POST /api/members` - Tambah anggota baru
- `DELETE /api/members/[id]` - Hapus anggota

### Users
- `GET /api/users` - Ambil semua user
- `POST /api/users` - Buat user baru
- `DELETE /api/users/[id]` - Hapus user

### Stats
- `GET /api/stats` - Ambil statistik keuangan

## 🌐 GitHub Workflow

### Branch Strategy

```
main (production)
  ↑
develop (development)
  ↑
feature/feature-name (fitur baru)
```

### Cara Membuat Fitur Baru

1. Buat branch baru dari `develop`:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/tambah-fitur-baru
```

2. Kode fitur baru di branch ini

3. Commit dengan pesan yang jelas:
```bash
git add .
git commit -m "feat: tambah fitur export data ke Excel"
```

4. Push dan buat Pull Request:
```bash
git push origin feature/tambah-fitur-baru
# Lalu buat PR di GitHub
```

### Commit Message Convention

Gunakan format:
```
<type>: <description>

[type] bisa:
- feat: fitur baru
- fix: perbaikan bug
- docs: perubahan dokumentasi
- style: format kode (tidak ubah logic)
- refactor: refactor kode
- test: tambah/ubah test
- chore: maintenance
```

Contoh:
```bash
git commit -m "feat: tambah filter transaksi berdasarkan tanggal"
git commit -m "fix: perbaiki bug saldo tampil negatif saat kosong"
git commit -m "docs: update README dengan workflow GitHub"
```

### Pull Request Guidelines

Judul PR:
```
[Type] Judul PR

Contoh:
[Feat] Tambah fitur export data ke Excel
[Fix] Perbaiki bug saldo tidak update
```

Deskripsi PR:
```markdown
## Perubahan
- Tambah tombol export data
- Support format Excel dan CSV

## Testing
- [x] Test export Excel
- [x] Test export CSV
- [x] Test di admin view
- [x] Test di member view

## Screenshot
(Sertakan screenshot jika perubahan UI)
```

## 📝 Cara Menjalankan di Production

```bash
# Build aplikasi
bun run build

# Start production server
bun start
```

## 🔐 Security Notes

Untuk production:
1. Ganti validasi password sederhana dengan bcrypt
2. Tambah rate limiting untuk API
3. Implementasi session management yang proper
4. Gunakan environment variables untuk sensitive data
5. Enable HTTPS

## 📄 License

MIT License

## 👥 Kontributor

- [Nama Anda] - Initial development
