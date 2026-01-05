@echo off
echo ====================================
echo Setup VS Code ke GitHub
echo ====================================
echo.

REM Check git installed
git --version
if %errorlevel% neq 0 (
    echo [!] Git belum terinstall!
    echo Silakan install Git dari: https://git-scm.com/downloads
    pause
    exit /b 1
)

echo.
echo [1/5] Git sudah terinstall
echo.

REM Configure git user
set /p GIT_NAME="Masukkan nama Anda: "
set /p GIT_EMAIL="Masukkan email GitHub Anda: "

git config --global user.name "%GIT_NAME%"
git config --global user.email "%GIT_EMAIL%"

echo.
echo [2/5] Git user sudah dikonfigurasi
echo.

REM Configure credential helper
git config --global credential.helper manager-core

echo.
echo [3/5] Git credential helper sudah dikonfigurasi
echo.

REM Show current config
echo.
echo [4/5] Konfigurasi Git saat ini:
echo.
git config --global --list

echo.
echo [5/5] Setup selesai!
echo.
echo Langkah selanjutnya:
echo 1. Buat repository di GitHub: https://github.com/new
echo 2. Run perintah berikut di terminal:
echo    git remote add origin https://github.com/USERNAME/manajemen-keuangan.git
echo    git push -u origin main
echo.
pause
