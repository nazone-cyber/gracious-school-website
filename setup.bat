@echo off
REM Gracious PVT School - Deployment Setup Script (Windows)
REM This script helps set up and deploy the Gracious PVT School website

echo ================================
echo Gracious PVT School Setup
echo ================================
echo.

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Git is not installed. Please install Git first.
    pause
    exit /b 1
)

echo ✅ Git is installed
echo.

REM Check if node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo.

REM Initialize git if not already initialized
if not exist ".git" (
    echo 📦 Initializing Git repository...
    git init
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already initialized
)

echo.
echo ================================
echo Backend Setup
echo ================================
echo.

REM Setup backend
cd backend

if not exist "node_modules" (
    echo 📦 Installing backend dependencies...
    call npm install
    echo ✅ Dependencies installed
) else (
    echo ✅ Dependencies already installed
)

REM Check if .env exists
if not exist ".env" (
    echo ⚠️  .env file not found. Creating from template...
    copy .env.example .env
    echo ⚠️  Please update .env with your email credentials!
    echo    EMAIL_USER and EMAIL_PASSWORD are required for email notifications
) else (
    echo ✅ .env file exists
)

cd ..

echo.
echo ================================
echo Deployment Instructions
echo ================================
echo.
echo 1️⃣  Local Development:
echo    - Terminal 1: npm start (in gracious/backend)
echo    - Terminal 2: python -m http.server 5500 (in gracious/)
echo    - Open http://localhost:5500
echo.
echo 2️⃣  GitHub Setup:
echo    git remote add origin https://github.com/yourusername/gracious-school-website.git
echo    git branch -M main
echo    git add .
echo    git commit -m "Initial commit: Gracious PVT School website"
echo    git push -u origin main
echo.
echo 3️⃣  GitHub Pages (Frontend):
echo    - Go to repo Settings → Pages
echo    - Source: Deploy from branch (main, / root)
echo.
echo 4️⃣  Deploy Backend to Render.com:
echo    - Sign up at https://render.com
echo    - Create new Web Service
echo    - Connect your GitHub repo
echo    - Build Command: npm install
echo    - Start Command: npm start
echo    - Add environment variables from .env
echo.
echo 5️⃣  Update Frontend API URL:
echo    - Edit gracious.html
echo    - Replace API_BASE_URL with your deployed backend URL
echo    - Push to GitHub
echo.
echo ✨ Setup complete! Happy coding!
echo.
pause
