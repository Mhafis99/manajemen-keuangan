# 🔗 Panduan Koneksi VS Code ke GitHub (Visual Guide)

## METODE 1: GitHub Extension (Cara Resmi - REKOMENDASI)

### Step 1: Install Extension

```
VS Code → Extensions (Ctrl+Shift+X)
→ Cari "GitHub Pull Requests"
→ Pilih dari "GitHub"
→ Klik Install
```

### Step 2: Sign in ke GitHub

```
VS Code → Command Palette (Ctrl+Shift+P)
→ Ketik: "GitHub: Sign In"
→ Tekan Enter
→ Browser akan terbuka
→ Login ke GitHub
→ Klik "Authorize"
```

### Step 3: Verifikasi

```
VS Code → Sidebar GitHub icon (kiri)
→ Anda akan melihat:
  - Issues
  - Pull Requests
  - Repositories

Jika muncul list, berarti SUDAH TERHUBUNG! ✅
```

---

## METODE 2: Git Credential Manager (Paling Mudah)

### Step 1: Configure Git di Terminal

Buka terminal di VS Code (`Ctrl+`` `) dan jalankan:

```bash
# Set nama dan email Anda
git config --global user.name "Nama Lengkap"
git config --global user.email "email@contoh.com"

# Contoh:
git config --global user.name "Budi Santoso"
git config --global user.email "budi@gmail.com"
```

### Step 2: Configure Credential Helper

```bash
# Aktifkan credential helper
git config --global credential.helper manager-core
```

### Step 3: Push & Login Otomatis

Sekarang coba push:

```bash
# Pastikan remote sudah ditambahkan
git remote -v

# Jika belum, tambahkan:
git remote add origin https://github.com/USERNAME/manajemen-keuangan.git

# Push
git push -u origin main
```

**Apa yang akan terjadi:**

1. Prompt akan muncul di terminal:
   ```
   Username for 'https://github.com': budi
   Password for 'https://budi@github.com': 
   ```

2. Browser popup akan muncul untuk login GitHub

3. Login ke GitHub

4. Klik "Authorize" jika diminta

5. DONE! VS Code sudah terhubung ke GitHub ✅

---

## METODE 3: SSH Key (Paling Aman - Untuk Advanced User)

### Step 1: Generate SSH Key

```bash
ssh-keygen -t ed25519 -C "email@contoh.com"
```

Tekan Enter 3x untuk default settings.

### Step 2: Copy SSH Public Key

**Windows:**
```bash
cat ~/.ssh/id_ed25519.pub | clip
```

**Mac:**
```bash
cat ~/.ssh/id_ed25519.pub | pbcopy
```

**Linux:**
```bash
cat ~/.ssh/id_ed25519.pub | xclip -selection clipboard
```

### Step 3: Add to GitHub

1. Buka: https://github.com/settings/ssh/new
2. Title: `VS Code SSH Key`
3. Key: Paste SSH key yang sudah di-copy
4. Click **Add SSH key**

### Step 4: Test Connection

```bash
ssh -T git@github.com
```

Jika berhasil:
```
Hi username! You've successfully authenticated...
```

### Step 5: Push dengan SSH

```bash
# Hapus remote HTTPS
git remote remove origin

# Tambah remote SSH
git remote add origin git@github.com:USERNAME/manajemen-keuangan.git

# Push
git push -u origin main
```

---

## 🔍 Cara Cek Sudah Terhubung atau Belum

### Check 1: Cek Git Config

```bash
git config --global --list
```

Harus muncul:
```
user.name=Nama Anda
user.email=email@contoh.com
credential.helper=manager
```

### Check 2: Cek Remote

```bash
git remote -v
```

Harus muncul:
```
origin  https://github.com/USERNAME/manajemen-keuangan.git (fetch)
origin  https://github.com/USERNAME/manajemen-keuangan.git (push)
```

### Check 3: Cek VS Code Connection

Buka:
- Command Palette → `GitHub: Show Issues`
- Jika list muncul = SUDAH TERHUBUNG ✅
- Jika error = BELUM TERHUBUNG ❌

---

## ⚡ Quick Fix (Jika Error)

### Error: "Authentication Failed"

**Solusi:**
1. Buat Personal Access Token: https://github.com/settings/tokens
2. Generate new token (classic)
3. Centang ✅ `repo`
4. Copy token
5. Use token sebagai password saat push

### Error: "remote origin already exists"

**Solusi:**
```bash
# Hapus remote yang ada
git remote remove origin

# Tambah remote baru
git remote add origin https://github.com/USERNAME/manajemen-keuangan.git
```

### Error: "Permission denied"

**Solusi:**
1. Pastikan repository sudah dibuat di GitHub
2. Pastikan username benar
3. Jika private repo, pastikan Anda punya access

---

## 📝 Checklist (Ikuti Urutan Ini!)

Sebelum push ke GitHub:

- [ ] GitHub account sudah dibuat
- [ ] Repository sudah dibuat di GitHub
- [ ] Git sudah terinstall di komputer
- [ ] Git user sudah dikonfigurasi (`git config --global`)
- [ ] Remote sudah ditambahkan (`git remote add`)
- [ ] SSH key sudah ditambah (jika pakai SSH method)
- [ ] Personal Access Token sudah dibuat (jika diperlukan)

---

## 🎯 Rekomendasi Untuk Pemula

**Gunakan METODE 2 (Git Credential Manager)**

Kenapa?
- ✅ Paling mudah
- ✅ Tidak perlu install banyak tool
- ✅ Otomatis handle authentication
- ✅ Browser popup akan muncul sendiri

---

## 🚀 Langkah Cepat (Copy Paste ke Terminal)

```bash
# 1. Configure git
git config --global user.name "Nama Anda"
git config --global user.email "email@contoh.com"
git config --global credential.helper manager-core

# 2. Verify config
git config --global --list

# 3. Add remote (ganti USERNAME)
git remote add origin https://github.com/USERNAME/manajemen-keuangan.git

# 4. Push
git push -u origin main

# 5. Login di browser popup yang muncul
# 6. Selesai! ✅
```

---

## 💡 Tips Tambahan

### VS Code Integrated Terminal

Buka terminal di VS Code:
- Windows/Linux: `Ctrl + ` ` (backtick)
- Mac: `Cmd + ` `

### View Git Status

Di VS Code:
- Tekan `Ctrl+Shift+G` untuk buka Source Control
- Lihat semua perubahan di sini

### Commit & Push

1. Stage files (klik `+` di Source Control)
2. Tulis commit message
3. Klik ✓ untuk commit
4. Klik menu sync di status bar → Push

---

## 🆘 Masih Bingung?

Jika masih gagal, coba:

1. **Restart VS Code**
2. **Restart Komputer**
3. **Update Git** ke versi terbaru: https://git-scm.com/downloads
4. **Update VS Code** ke versi terbaru

Atau coba METODE 1 (GitHub Extension) yang lebih visual.

---

**Selamat! VS Code Anda sekarang siap terhubung ke GitHub! 🎉**
