# Troubleshooting Guide - Dubai Luxury Properties Frontend

## Issue: Development Server Won't Start

If you're experiencing issues with `npm run dev`, follow these steps:

### Problem Symptoms
- Server exits with "non-zero exit code"
- UnhandledPromiseRejection errors
- Vite fails to start

### Solution 1: Check Node.js Version

**Required**: Node.js v18 or higher

Check your version:
```bash
node --version
```

If you have an older version, download and install Node.js 18+ from: https://nodejs.org/

### Solution 2: Clean Reinstall

```bash
# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install

# Try starting the server
npm run dev
```

### Solution 3: Use Alternative Dev Server

If Vite continues to fail, you can use a simple HTTP server:

```bash
# Install http-server globally
npm install -g http-server

# Build the project
npm run build

# Serve the built files
http-server dist -p 3000
```

### Solution 4: Manual Vite Start

Try running Vite directly:
```bash
npx vite --host 0.0.0.0 --port 3000
```

### Solution 5: Check for Port Conflicts

Make sure port 3000 is not already in use:
```bash
# Windows
netstat -ano | findstr :3000

# If port is in use, kill the process or use a different port
npx vite --port 3001
```

### Solution 6: Disable Strict Mode (Temporary)

Edit `src/main.jsx` and temporarily remove `<React.StrictMode>`:

```javascript
// Before
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// After (temporary fix)
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
```

### Solution 7: Use Create React App Instead

If Vite continues to have issues, you can migrate to Create React App:

```bash
# Create new CRA project
npx create-react-app dubai-properties

# Copy your src files
Copy-Item -Recurse src/* dubai-properties/src/

# Copy public files
Copy-Item -Recurse public/* dubai-properties/public/

# Update package.json dependencies
# Then install and run
cd dubai-properties
npm install react-router-dom axios formik yup
npm start
```

### Common Issues

#### Issue: "Cannot find module"
**Solution**: Run `npm install` again

#### Issue: "Port already in use"
**Solution**: Change port in vite.config.js or kill the process using the port

#### Issue: "ENOENT: no such file or directory"
**Solution**: Make sure you're in the correct directory (`frontend` folder)

### Getting Help

If none of these solutions work:

1. Check the full error message in the terminal
2. Look for specific file names or line numbers in the error
3. Search for the error message on:
   - Vite GitHub Issues: https://github.com/vitejs/vite/issues
   - Stack Overflow: https://stackoverflow.com/questions/tagged/vite

### Quick Test

To verify your setup is working, create a minimal test file:

**test.html**:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Test</title>
    <link rel="stylesheet" href="src/index.css">
</head>
<body>
    <h1>If you see this, your files are accessible</h1>
</body>
</html>
```

Open this file directly in your browser to test if the CSS loads.

---

## Alternative: Run Without Build Tool

If you need to demo quickly without fixing Vite:

1. Open `index.html` directly in your browser
2. Note: React Router won't work without a server
3. You'll see the basic structure but navigation will be broken

For a proper demo, you MUST run a development server.

---

**Need immediate help?** Contact your instructor or check the project README.md for additional setup instructions.
