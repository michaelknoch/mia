"use strict";

const electron = require('electron');
// Module to control application life.
const {app, ipcMain} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;
const autoUpdater = electron.autoUpdater;
const appVersion = require('./package.json').version;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {

    // Create the browser window.
    win = new BrowserWindow({width: 1100, height: 700, minWidth: 800, minHeight: 600});

    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/index.html`);

    // Open the DevTools.
    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    registerUpdater();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

function registerUpdater() {

    ipcMain.on('version-request', () => {
        win.webContents.send('version-receive', appVersion);
    });
    console.info('appversion', appVersion);

    let updateFeed = 'http://52.29.3.70:3000/release';
    autoUpdater.setFeedURL(updateFeed + '?version=' + appVersion);
    autoUpdater.checkForUpdates();


    autoUpdater.on('update-available', () => {
        console.info('update-available');
        win.webContents.send('update-available');
    });

    autoUpdater.on('update-downloaded', () => {
        console.info('update-downloaded');
        win.webContents.send('update-downloaded');
    });

    ipcMain.on('force-restart', () => {
        console.info('force-restart');
        autoUpdater.quitAndInstall();
    });
}

