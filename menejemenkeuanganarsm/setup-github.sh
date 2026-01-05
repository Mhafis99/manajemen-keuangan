#!/bin/bash

echo "===================================="
echo "Setup VS Code ke GitHub"
echo "===================================="
echo ""

# Check git installed
if ! command -v git &> /dev/null; then
    echo "[!] Git belum terinstall!"
    echo "Silakan install Git:"
    echo "  Ubuntu/Debian: sudo apt-get install git"
    echo "  Mac: brew install git"
    exit 1
fi

echo "[1/5] Git sudah terinstall: $(git --version)"
echo ""

# Get user input
read -p "Masukkan nama Anda: " GIT_NAME
read -p "Masukkan email GitHub Anda: " GIT_EMAIL

# Configure git
git config --global user.name "$GIT_NAME"
git config --global user.email "$GIT_EMAIL"

echo ""
echo "[2/5] Git user sudah dikonfigurasi"
echo ""

# Configure credential helper
git config --global credential.helper store

echo ""
echo "[3/5] Git credential helper sudah dikonfigurasi"
echo ""

# Show current config
echo ""
echo "[4/5] Konfigurasi Git saat ini:"
echo ""
git config --global --list

echo ""
echo "[5/5] Setup selesai!"
echo ""
echo "Langkah selanjutnya:"
echo "1. Buat repository di GitHub: https://github.com/new"
echo "2. Run perintah berikut di terminal:"
echo "   git remote add origin https://github.com/USERNAME/manajemen-keuangan.git"
echo "   git push -u origin main"
echo ""
echo "Saat push, gunakan Personal Access Token sebagai password."
echo "Buat token di: https://github.com/settings/tokens"
echo ""
