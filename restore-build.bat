@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Restoring latest build from Git (hard reset)
echo ========================================
echo.

REM Ensure we're inside a Git repository
git rev-parse --git-dir >nul 2>&1
if errorlevel 1 (
    echo ERROR: Not a Git repository. Run this from your project root.
    echo.
    pause
    exit /b 1
)

REM Remember this script name so we can exclude it from cleaning
set "SCRIPT_NAME=%~nx0"

REM Stash any local changes to avoid conflicts
echo [1/4] Stashing local changes...
git stash push -m "Auto-stash before restore" >nul 2>&1
echo Done.
echo.

REM Fetch latest from origin
echo [2/4] Fetching latest from origin...
git fetch origin
if errorlevel 1 (
    echo ERROR: Failed to fetch from origin. Check your connection and remote.
    echo.
    pause
    exit /b 1
)
echo Done.
echo.

REM Detect default branch (main or master)
echo [3/4] Detecting default branch...
set "MAIN_BRANCH="
git rev-parse --verify main >nul 2>&1 && set "MAIN_BRANCH=main"
if not defined MAIN_BRANCH (
    git rev-parse --verify master >nul 2>&1 && set "MAIN_BRANCH=master"
)
if not defined MAIN_BRANCH (
    echo ERROR: Could not find 'main' or 'master' branch on this repo.
    echo.
    pause
    exit /b 1
)
echo Using branch: %MAIN_BRANCH%
echo.

REM Hard reset to remote default branch
echo [4/4] Resetting local files to origin/%MAIN_BRANCH%...
git reset --hard origin/%MAIN_BRANCH%
if errorlevel 1 (
    echo ERROR: Failed to reset to origin/%MAIN_BRANCH%.
    echo.
    pause
    exit /b 1
)
echo Done.
echo.

REM Clean untracked files/directories, but keep this script (and optional PS helper)
echo Cleaning untracked files (preserving restore scripts)...
git clean -fd -e "%SCRIPT_NAME%" -e "restore-build.ps1"
if errorlevel 1 (
    echo WARNING: git clean reported issues. Review manually if needed.
)
echo Done.
echo.

echo ========================================
echo Restore complete.
echo ========================================
echo Your working tree now matches origin/%MAIN_BRANCH%.
echo Any previous local changes were stashed. To bring them back, run: git stash pop
echo.
echo Press any key to exit...
pause >nul

endlocal
@echo off
powershell.exe -ExecutionPolicy Bypass -File "%~dp0restore-build.ps1"