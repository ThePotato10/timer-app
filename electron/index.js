const {app, BrowserWindow} = require('electron')

function createWindow () {
    const window = new BrowserWindow({
        width: 650,
        maxWidth: 650,
        minWidth: 650,

        height: 500,
        maxHeight: 500,
        minHeight: 500,

        webPreferences: {
            nodeIntegration: true,
            devTools: true
        }
    });

    window.loadFile('../src/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
     if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});