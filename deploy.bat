@echo off
echo ====================================================
echo   AUTOMATISATION DE LA DEPLOYMENT (PFE PROJECT)
echo ====================================================
echo.

echo [1/3] Envoi vers GitHub...
git push -u origin main
if %ERRORLEVEL% neq 0 (
    echo.
    echo ❌ Erreur lors du push GitHub. Verifiez vos permissions.
) else (
    echo ✅ Code envoye sur GitHub avec succes.
)

echo.
echo [2/3] Verification de Docker Login...
docker login
if %ERRORLEVEL% neq 0 (
    echo ❌ Echec de la connexion Docker. Connectez-vous d'abord.
    pause
    exit /b
)

echo.
echo [3/3] Tagging et Push des images Docker...
set /p DOCKER_USER="Entrez votre nom d'utilisateur Docker Hub: "

echo.
echo Tagging des images...
docker tag pfe-backend %DOCKER_USER%/pfe-backend:latest
docker tag pfe-frontend %DOCKER_USER%/pfe-frontend:latest

echo.
echo Pushing backend...
docker push %DOCKER_USER%/pfe-backend:latest

echo.
echo Pushing frontend...
docker push %DOCKER_USER%/pfe-frontend:latest

echo.
echo ====================================================
echo 🎉 DEPLOYMENT TERMINE !
echo ====================================================
pause
