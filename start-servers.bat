@echo off
echo 🚀 Starting Travel Company Website Servers...
echo.

echo 📍 Starting Backend Server (Port 5000)...
start "Backend Server" cmd /k "cd backend && python server.py"

echo ⏳ Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo 🌐 Starting Frontend Server (Port 3000)...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo ✅ Both servers are starting up!
echo 📍 Backend: http://localhost:5000
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Admin Panel: http://localhost:3000/admin
echo.
echo Press any key to close this window...
pause > nul 