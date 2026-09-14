#!/bin/bash

# Gracious PVT School - Deployment Setup Script
# This script helps set up and deploy the Gracious PVT School website

echo "================================"
echo "Gracious PVT School Setup"
echo "================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already initialized"
fi

echo ""
echo "================================"
echo "Backend Setup"
echo "================================"
echo ""

# Setup backend
cd backend

if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env
    echo "⚠️  Please update .env with your email credentials!"
    echo "   EMAIL_USER and EMAIL_PASSWORD are required for email notifications"
else
    echo "✅ .env file exists"
fi

cd ..

echo ""
echo "================================"
echo "Deployment Instructions"
echo "================================"
echo ""
echo "1️⃣  Local Development:"
echo "   - Terminal 1: npm start (in gracious/backend)"
echo "   - Terminal 2: python -m http.server 5500 (in gracious/)"
echo "   - Open http://localhost:5500"
echo ""
echo "2️⃣  GitHub Setup:"
echo "   git remote add origin https://github.com/yourusername/gracious-school-website.git"
echo "   git branch -M main"
echo "   git add ."
echo "   git commit -m 'Initial commit: Gracious PVT School website'"
echo "   git push -u origin main"
echo ""
echo "3️⃣  GitHub Pages (Frontend):"
echo "   - Go to repo Settings → Pages"
echo "   - Source: Deploy from branch (main, / root)"
echo ""
echo "4️⃣  Deploy Backend to Render.com:"
echo "   - Sign up at https://render.com"
echo "   - Create new Web Service"
echo "   - Connect your GitHub repo"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo "   - Add environment variables from .env"
echo ""
echo "5️⃣  Update Frontend API URL:"
echo "   - Edit gracious.html"
echo "   - Replace API_BASE_URL with your deployed backend URL"
echo "   - Push to GitHub"
echo ""
echo "✨ Setup complete! Happy coding!"
