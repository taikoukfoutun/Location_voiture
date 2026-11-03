@echo off
title Laravel Backend Server (Port 8000)
cd /d "%~dp0backend"
echo Starting Laravel API backend on http://127.0.0.1:8000 ...
"C:\Users\utente\AppData\Local\Microsoft\WinGet\Packages\PHP.PHP.8.3_Microsoft.Winget.Source_8wekyb3d8bbwe\php.exe" artisan serve --port=8000
pause
