@echo off
REM Change to script directory to ensure we're in the right place
cd /d "%~dp0"

echo Stopping any existing processes on port 3000...

REM Find and kill processes using port 3000
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo Killing process %%a...
    taskkill /PID %%a /F >nul 2>&1
)

REM Wait a moment for the port to be released
timeout /t 2 /nobreak >nul

echo.
echo Starting Next.js development server...
echo.

REM Use npx to run Next.js (most reliable method, works even if PATH is broken)
REM The --yes flag automatically installs next if needed
npx --yes next dev

REM If npx fails for some reason, try direct node execution as fallback
if errorlevel 1 (
    echo.
    echo npx failed, trying direct node execution...
    if exist node_modules\next\dist\bin\next.js (
        node node_modules\next\dist\bin\next dev
    ) else (
        echo Error: Next.js not found. Please run 'npm install' first.
        pause
        exit /b 1
    )
)

