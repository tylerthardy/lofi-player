const { app, BrowserWindow } = require("electron");
const path = require("path");

try {
    const electronReload = require("electron-reload");
    electronReload(__dirname);
} catch (_)
{
    // Swallow exceptions because this is a dev dependency only
}

const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));
}

app.on("ready", loadMainWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        loadMainWindow();
    }
});