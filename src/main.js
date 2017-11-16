/**
 * Created by s0m01dq on 10/15/17.
 */
const electron = require('electron');
const countDown = require('./countdown.js');
const path = require('path');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc =  electron.ipcMain;
const Tray = electron.Tray;
const Menu = electron.Menu;

let mainWindow;

app.on('ready', function () {

    const tray = new Tray(path.join('src','countdown_small.png'));
    const contextMenu = Menu.buildFromTemplate([
        {
            label : 'Wow',
            click : () => {
                console.log('wow');
            }
        },
        {
          type: 'separator'
        },
        {
            label : 'Awesome',
            click : () => {
                console.log('Awesome');
            }
        }

    ]);

    tray.setContextMenu(contextMenu);
    tray.setToolTip('My great tool');

    mainWindow  = new BrowserWindow({
        height: 400,
        width : 400
    });

    mainWindow.loadURL(`file://${__dirname}/views/countdown.html`);

    mainWindow.on('close', () => {
      console.log('closed');
    })
});

ipc.on('countdown-start', function () {
    countDown(function (count) {
        mainWindow.webContents.send('countdown', count);
    });
});

