@echo off
REM Launch Next.js development server on port 3001
REM This script ensures the server starts successfully

REM Change to script directory to ensure we're in the right place
cd /d "%~dp0"

echo ========================================
echo Starting Next.js Dev Server on Port 3001
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Error: node_modules not found!
    echo Please run 'npm install' first.
    echo.
    pause
    exit /b 1
)

REM Kill any existing processes on port 3001
echo Checking for existing processes on port 3001...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do (
    echo Stopping existing process %%a...
    taskkill /PID %%a /F >nul 2>&1
)

REM Wait a moment for the port to be released
timeout /t 1 /nobreak >nul

echo.
echo Starting development server...
echo Server will be available at: http://localhost:3001
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

REM Start the dev server on port 3001
npm run dev -- -p 3001

REM If npm fails, try direct node execution as fallback
if errorlevel 1 (
    echo.
    echo npm failed, trying direct node execution...
    if exist node_modules\next\dist\bin\next.js (
        node node_modules\next\dist\bin\next.js dev -p 3001
    ) else (
        echo Error: Next.js not found. Please run 'npm install' first.
        pause
        exit /b 1
    )
)



