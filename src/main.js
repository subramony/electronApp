/**
 * Created by s0m01dq on 10/15/17.
 */
const electron = require('electron');
const countDown = require('./countdown.js');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc =  electron.ipcMain;

let mainWindow;
let windows = [];

app.on('ready', function () {
    [1,2,3].forEach(function () {
        let win  = new BrowserWindow({
            height: 400,
            width : 400
        });

        win.loadURL(`file://${__dirname}/views/countdown.html`);

        win.on('close', () => {
          console.log('closed');
        })

        windows.push(win);
    })
});

ipc.on('countdown-start', function () {
    countDown(function (count) {

        windows.forEach(function(win) {
            win.webContents.send('countdown', count);
        });
    });
});

