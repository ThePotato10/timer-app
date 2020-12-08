const {app, BrowserWindow} = require('electron')

function createWindow () {
    const window = new BrowserWindow({
        width: 800,
        height: 650,
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