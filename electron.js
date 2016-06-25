'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const autoUpdater = require('auto-updater');
const appVersion = require('./package.json').version;
const os = require('os').platform();
const dialog = require('electron').dialog;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 1100, height: 700, minWidth: 800, minHeight: 600});

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
    createWindow();

   /* autoUpdater.setFeedURL('http://localhost:3000/release');
    autoUpdater.checkForUpdates(); */

});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

autoUpdater.on('update-downloaded', notifyUserAboutUpdate);

function notifyUserAboutUpdate() {
    let buttons = ['Sure, get me a new version!', 'Nah, I\'m good, I can wait.'];
    let options = {
        type: 'question',
        message: 'Hey, new version of app is downloaded! Do you want to restart it now and get the newest version?',
        cancelId: -1,
        buttons
    };

    dialog.showMessageBox(options, function (response) {
        if (response == 0) {
            autoUpdater.quitAndInstall();
        }
    });
}