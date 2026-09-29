@echo off
echo ============================================
echo   Warhouse-Gym Member Management System
echo ============================================
echo.
echo [1] Compiling...
javac -cp "lib\mysql-connector-j-8.3.0.jar" -d bin src\gym\DBConnection.java src\gym\Member.java src\gym\MemberDAO.java src\gym\GymApp.java
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo BUILD FAILED. Make sure JDK is installed and in PATH.
    pause
    exit /b 1
)
echo Compilation successful!
echo.
echo [2] Make sure XAMPP MySQL is running and run database_setup.sql first.
echo.
echo [3] Launching application...
java -cp "bin;lib\mysql-connector-j-8.3.0.jar" gym.GymApp
pause
