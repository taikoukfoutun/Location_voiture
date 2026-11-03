@echo off
title Launch Car Rental App
echo Launching Backend and Frontend servers...
start "Laravel Backend" "%~dp0start-backend.bat"
start "React Frontend" "%~dp0start-frontend.bat"
echo Both servers started!
echo Open your browser at: http://localhost:5173
pause
