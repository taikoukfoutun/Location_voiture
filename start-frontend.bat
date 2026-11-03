@echo off
title React Frontend (Port 5173)
cd /d "%~dp0frontend"
echo Starting React Vite frontend on http://localhost:5173 ...
call npm run dev
pause
