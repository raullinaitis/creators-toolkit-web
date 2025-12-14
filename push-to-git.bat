@echo off
echo ========================================
echo    PUSH TO GIT - Creators Toolkit
echo ========================================
echo.

cd /d "S:\MANAGEMENT\ECOMMERCE\WEBSITE HTMLS\CREATORS TOOLKIT WEB_headless vercel build"

echo Current git status:
echo -------------------
git status --short
echo.

echo Staging all changes...
echo ----------------------
git add .
echo.

echo Committing changes...
echo --------------------
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "timestamp=%YYYY%-%MM%-%DD% %HH%:%Min%:%Sec%"

git commit -m "backup: %timestamp% - Auto-commit from push-to-git.bat"
echo.

echo Pushing to remote repository...
echo -------------------------------
git push origin main
echo.

echo ========================================
echo    BACKUP COMPLETE!
echo ========================================
echo Your local build has been pushed to Git.
echo.

pause