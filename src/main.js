/**
 * Created by s0m01dq on 10/15/17.
 */
const electron = require('electron');
const countDown = require('./countdown.js');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc =  electron.ipcMain;
const globalShortcut=  electron.globalShortcut;

let mainWindow;

app.on('ready', function () {

    mainWindow  = new BrowserWindow({
        height: 400,
        width : 400
    });

    mainWindow.loadURL(`file://${__dirname}/views/countdown.html`);

    mainWindow.on('close', () => {
      console.log('closed');
    })

    globalShortcut.register('Ctrl+Alt+Cmd+D', function () {
        mainWindow.webContents.send('capture', app.getPath('pictures'));
    });
});

ipc.on('countdown-start', function () {
    countDown(function (count) {
        mainWindow.webContents.send('countdown', count);
    });
});

