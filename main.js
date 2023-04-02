const { app, BrowserWindow } = require('electron');
const path = require('path');

let isSingleInstance = app.requestSingleInstanceLock()
if (!isSingleInstance) {
    app.quit()
};

const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        fullscreen: true,
        alwaysOnTop: false,
        frame: false,  
        resizable: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            // devTools: !app.isPackaged,
        },
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