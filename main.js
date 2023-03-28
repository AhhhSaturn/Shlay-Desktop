const { app, BrowserWindow } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) app.quit();

const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        fullscreen: false,
        width: 1600,
        height: 1200,
        alwaysOnTop: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadFile(path.join(__dirname, '/src/index.html'));
}
app.on('ready', loadMainWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        loadMainWindow();
    }
});