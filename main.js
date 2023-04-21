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
}

app.on('ready', () => {
    loadMainWindow();
    app.setAsDefaultProtocolClient('shlay');
    console.log(`Launcher Based Entry Point: local`);
    mainWindow.webContents.executeJavaScript(`const entryPoint = 'local'; console.log('Entry Point:', entryPoint);`);
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
    event.preventDefault();
    console.log(`Url Based Entry Point: ${url}`);
    mainWindow.webContents.executeJavaScript(`const entryPoint = '${url}'; console.log('Entry Point:', entryPoint);`);
}); 