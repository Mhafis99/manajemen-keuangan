# 🚀 Panduan Setup GitHub dengan VS Code

## 1. Setup GitHub Repository

### 1.1 Buat Repository di GitHub

1. Buka https://github.com/new
2. Isi detail:
   ```
   Repository name: manajemen-keuangan
   Description: Aplikasi Manajemen Keuangan dengan Next.js
   Visibility: Public atau Private
   ```
3. **JANGAN** centang "Initialize this repository"
4. Klik **Create repository**

### 1.2 Hubungkan Proyek Lokal ke GitHub

Di terminal VS Code:

```bash
# Ganti GITHUB_USERNAME dengan username Anda
git remote add origin https://github.com/GITHUB_USERNAME/manajemen-keuangan.git

# Rename branch ke main
git branch -M main

# Push ke GitHub
git push -u origin main
```

**Jika diminta login:**
- Username: GitHub username Anda
- Password: **Personal Access Token** (bukan password GitHub biasa)

### 1.3 Buat Personal Access Token (PAT)

1. Buka: https://github.com/settings/tokens
2. Klik **Generate new token (classic)**
3. Isi:
   - Note: `VS Code Token`
   - Expiration: `90 days` atau `No expiration`
   - Scopes: Centang ✅ `repo`
4. Klik **Generate token**
5. **Copy token** (tampil hanya sekali!)

---

## 2. Setup VS Code

### 2.1 Install Extension Penting

Buka VS Code, tekan `Ctrl+Shift+X` (Windows/Linux) atau `Cmd+Shift+X` (Mac), lalu install:

**Wajib:**
- ✅ `GitHub Pull Requests` - by GitHub
- ✅ `GitLens` - by GitKraken

**Opsional tapi sangat berguna:**
- 📌 `GitHub Copilot` - AI coding assistant
- 📌 `Prettier` - Code formatter
- 📌 `Auto Rename Tag` - HTML/JSX helper
- 📌 `Bracket Pair Colorizer` - Visual brace coloring

### 2.2 Konfigurasi Git di VS Code

Buka VS Code Settings (`Ctrl+,`), cari "git", dan set:

```json
{
  "git.enableSmartCommit": true,
  "git.confirmSync": false,
  "git.autofetch": true,
  "git.postCommitCommand": "none",
  "git.showInlineOpenFileAction": true
}
```

### 2.3 Setup GitHub Authentication di VS Code

1. Install `GitHub Pull Requests` extension
2. Buka VS Code Command Palette (`Ctrl+Shift+P`)
3. Ketik: `GitHub: Sign In`
4. Follow wizard untuk sign in ke GitHub

---

## 3. GitHub Workflow dengan VS Code

### 3.1 Melihat Perubahan (Changes)

1. Buka **Source Control** panel (`Ctrl+Shift+G`)
2. Lihat semua file yang berubah
3. Klik file untuk melihat diff (perbedaan)

### 3.2 Commit Changes

**Cara 1: Via VS Code UI:**
1. Di Source Control panel:
   - Klik **+** di sebelah file untuk stage
   - Atau klik **Stage All Changes**
2. Tulis commit message di kotak di atas
3. Klik ✓ (Commit)

**Cara 2: Via Terminal:**
```bash
# Stage semua file
git add .

# Commit dengan message
git commit -m "feat: tambah fitur baru"

# Atau commit file spesifik
git commit -m "fix: perbaiki bug" src/app/page.tsx
```

### 3.3 Push ke GitHub

**Cara 1: Via VS Code UI:**
1. Di status bar bawah, klik menu git (ada ikon sync)
2. Klik **Push**

**Cara 2: Via Terminal:**
```bash
git push
```

### 3.4 Pull dari GitHub

**Cara 1: Via VS Code UI:**
1. Di status bar bawah, klik menu git
2. Klik **Pull**

**Cara 2: Via Terminal:**
```bash
git pull
```

---

## 4. Branch Management

### 4.1 Melihat Branch Saat Ini

```bash
git branch
```

### 4.2 Membuat Branch Baru

```bash
# Buat dan switch ke branch baru
git checkout -b feature/tambah-fitur

# Atau
git switch -c feature/tambah-fitur
```

### 4.3 Switch Between Branches

```bash
# Switch ke branch lain
git switch main

# Atau
git checkout main
```

### 4.4 Hapus Branch

```bash
# Hapus branch lokal
git branch -d feature/tambah-fitur

# Hapus branch di remote
git push origin --delete feature-tambah-fitur
```

---

## 5. Pull Request (PR) Workflow

### 5.1 Membuat Pull Request dari VS Code

1. Switch ke branch feature
2. Push branch ke GitHub:
   ```bash
   git push -u origin feature/tambah-fitur
   ```
3. Buka **GitHub Pull Requests** extension
4. Klik **Create Pull Request**
5. Isi:
   - Title: `[Feat] Tambah fitur export data`
   - Description: Jelaskan perubahan
   - Base: `main` atau `develop`
   - Compare: branch feature Anda
6. Klik **Create**

### 5.2 Review Pull Request

**Via VS Code:**
1. Buka **GitHub Pull Requests** extension
2. Pilih PR yang ingin direview
3. Klik file untuk melihat diff
4. Tambah komentar di baris spesifik
5. Add:
   - 👍 **Approve** - Setuju merge
   - 🔄 **Request Changes** - Perlu perbaikan
   - 💬 **Comment** - Sekadar komentar

### 5.3 Merge Pull Request

**Via GitHub Web:**
1. Buka PR di GitHub
2. Cek semua checks (CI/CD) harus ✅
3. Klik **Merge pull request**
4. Pilih merge method:
   - **Create a merge commit** - Preserve history
   - **Squash and merge** - Satu commit bersih
   - **Rebase and merge** - Linear history
5. Hapus branch setelah merge

---

## 6. Commit Message Convention

Gunakan format yang konsisten:

```
<type>: <description>

<type>:
- feat: fitur baru
- fix: perbaikan bug
- docs: update dokumentasi
- style: format kode (tidak ubah logic)
- refactor: refactoring kode
- test: tambah/ubah test
- chore: maintenance, update deps
```

**Contoh:**
```bash
git commit -m "feat: tambah filter tanggal di history transaksi"
git commit -m "fix: perbaiki bug saldo tidak update realtime"
git commit -m "docs: update README dengan deployment guide"
git commit -m "chore: upgrade Next.js ke versi 15.3"
```

---

## 7. Common Commands Cheat Sheet

```bash
# Melihat status
git status

# Melihat history
git log

# Melihat history dengan graph
git log --graph --oneline

# Melihat perbedaan file
git diff
git diff file.tsx

# Unstage file
git restore --staged file.tsx

# Discard semua perubahan (hati-hati!)
git restore .

# Stash perubahan temporary
git stash
git stash pop

# Revert commit
git revert <commit-hash>

# Reset ke commit tertentu (hati-hati!)
git reset --hard <commit-hash>
```

---

## 8. Best Practices

### ✅ DO:
- Buat branch baru untuk setiap fitur
- Tulis commit message yang jelas
- Review PR sebelum merge
- Pastikan semua tests dan CI passes
- Pull sebelum push (git pull)

### ❌ DON'T:
- Push langsung ke `main` branch
- Commit ke `main` tanpa review
- Force push (`git push -f`) ke shared branch
- Ignore merge conflicts
- Commit sensitive data (passwords, API keys)

---

## 9. Troubleshooting

### Problem: "remote origin already exists"
```bash
# Hapus remote yang ada
git remote remove origin

# Tambah remote baru
git remote add origin https://github.com/USERNAME/REPO.git
```

### Problem: Merge conflict
```bash
# 1. Pull dulu
git pull

# 2. Buka file yang conflict, cari mark:
# <<<<<<< HEAD
# kode Anda
# =======
# kode dari remote
# >>>>>>> branch-name

# 3. Edit manual, hapus mark, simpan

# 4. Add dan commit
git add .
git commit -m "fix: resolve merge conflict"
```

### Problem: Git push gagal (authentication failed)
- Buat Personal Access Token baru
- Gunakan token sebagai password
- Atau gunakan SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

---

## 10. Quick Start Checklist

- [ ] Buat GitHub repository
- [ ] Install VS Code extensions (GitLens, GitHub PR)
- [ ] Setup Git di VS Code
- [ ] Buat Personal Access Token
- [ ] Push kode pertama ke GitHub
- [ ] Buat branch `develop`
- [ ] Buat branch feature baru
- [ ] Coba buat Pull Request

---

**Selamat coding! 🎉**
