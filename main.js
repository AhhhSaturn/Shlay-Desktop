const { app, BrowserWindow } = require('electron');
const path = require('path');
let mainWindow;

let isSingleInstance = app.requestSingleInstanceLock()
if (!isSingleInstance) {
    app.quit()
};

const loadMainWindow = () => {
    mainWindow = new BrowserWindow({
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
    // let session = mainWindow.webContents.session;
    // session.defaultSession.sessionStorage.setItem('key', 'value');
    console.log(`Launcher Based Entry Point: local`);
    mainWindow.webContents.executeJavaScript(`localStorage.setItem('entryPoint', 'local')`);
}

app.on('ready', () => {
    loadMainWindow();
    app.setAsDefaultProtocolClient('shlay');
});
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

app.on('second-instance', (event) => {
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
    }
});

app.on('open-url', (event, url) => {
    console.log(`Url Based Entry Point: ${url}`);
    mainWindow.webContents.executeJavaScript(`localStorage.setItem('entryPoint', ${url})`);
});