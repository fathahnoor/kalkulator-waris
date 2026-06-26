@echo off
setlocal
title FaraidPro - Kalkulator Waris Islam
color 0A
echo.
echo  ========================================
echo   FaraidPro - Kalkulator Waris Islam
echo  ========================================
echo.

:: ===== Coba Python launcher (py -3) — paling reliable di Windows =====
where py >nul 2>&1
if %errorlevel% equ 0 goto :run_py

:: ===== Coba python =====
where python >nul 2>&1
if %errorlevel% equ 0 goto :run_python

:: ===== Coba Node.js =====
where node >nul 2>&1
if %errorlevel% equ 0 goto :run_node

:: ===== Fallback: buka HTML langsung =====
goto :run_fallback

:run_py
REM Cari port gratis dengan benar-benar bind socket (lebih reliable dari netstat)
for /f "tokens=*" %%a in ('py -3 -c "import socket;s=socket.socket();s.bind((str(),0));print(s.getsockname()[1]);s.close()"') do set PORT=%%a
if not defined PORT set PORT=8765
echo  [OK] Python (py -3) terdeteksi. Port: %PORT%
echo  Buka: http://localhost:%PORT%
start "" "http://localhost:%PORT%"
echo  Tekan Ctrl+C untuk berhenti.
echo.
py -3 -m http.server %PORT% --bind 127.0.0.1
goto :end

:run_python
for /f "tokens=*" %%a in ('python -c "import socket;s=socket.socket();s.bind((str(),0));print(s.getsockname()[1]);s.close()"') do set PORT=%%a
if not defined PORT set PORT=8765
echo  [OK] Python terdeteksi. Port: %PORT%
echo  Buka: http://localhost:%PORT%
start "" "http://localhost:%PORT%"
echo  Tekan Ctrl+C untuk berhenti.
echo.
python -m http.server %PORT% --bind 127.0.0.1
goto :end

:run_node
echo  [OK] Node.js terdeteksi. Mencari port tersedia...
REM Tulis script port finder ke temp file untuk menghindari konflik kutip
> "%TEMP%\faraid_port.js" echo var n=require('net');
>> "%TEMP%\faraid_port.js" echo function findPort(p){
>> "%TEMP%\faraid_port.js" echo var s=n.createServer();
>> "%TEMP%\faraid_port.js" echo s.on('error',function(){s.close();findPort(p+1)});
>> "%TEMP%\faraid_port.js" echo s.listen(p,function(){console.log(p);s.close()});
>> "%TEMP%\faraid_port.js" echo }
>> "%TEMP%\faraid_port.js" echo findPort(8765);
node "%TEMP%\faraid_port.js" > "%TEMP%\faraid_port.txt"
set /p PORT=<"%TEMP%\faraid_port.txt"
del "%TEMP%\faraid_port.js" "%TEMP%\faraid_port.txt" >nul 2>&1
if not defined PORT set PORT=8765
echo  Buka: http://localhost:%PORT%
start "" "http://localhost:%PORT%"
echo  Tekan Ctrl+C untuk berhenti.
echo.
node -e "require('http').createServer((q,r)=>{var p='.'+q.url.replace(/\/$/,'/index.html');require('fs').readFile(p,(e,d)=>{r.writeHead(e?404:200,{'Content-Type':'text/html'});r.end(e?'<h1>404 - File tidak ditemukan</h1>':d)})}).listen(%PORT%)"
goto :end

:run_fallback
echo  [INFO] Tidak ada server (Python/PHP/Node.js).
echo  Membuka code.html langsung di browser...
echo  (Fitur Share URL mungkin tidak bekerja tanpa server)
echo.
start "" "%~dp0index.html"

:end
echo.
pause
