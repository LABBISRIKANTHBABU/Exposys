@echo off
title Brrrgrrr Demonstration

echo =========================================
echo 🚀 BRRRGRRR - BURGER ORDERING APP DEMO
echo =========================================
echo.

echo ✅ 1. Checking if the application is running...
echo.

curl -s http://localhost:4000/api/products > nul
if %errorlevel% == 0 (
    echo ✅ Server is running!
) else (
    echo ❌ Server is not running. Please start it with 'npm run dev'
    pause
    exit /b 1
)

echo.
echo ✅ 2. Testing API endpoints...
echo.

echo 📋 Getting products:
curl -s http://localhost:4000/api/products | findstr "name"
echo.

echo 📋 Getting blog posts:
curl -s http://localhost:4000/api/posts | findstr "title"
echo.

echo.
echo ✅ 3. Application is ready!
echo.
echo 📱 Open your browser and go to: http://localhost:5175
echo.
echo 🔑 Login credentials (in offline mode):
echo    Email: john@example.com
echo    Password: 123456
echo.
echo 👑 Admin credentials (in offline mode):
echo    Email: admin@brrr.com
echo    Password: admin123
echo.
echo =========================================
echo 🎉 DEMONSTRATION COMPLETE!
echo =========================================
pause