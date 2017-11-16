/**
 * Created by s0m01dq on 10/15/17.
 */
const electron = require('electron');
const countDown = require('./countdown.js');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc =  electron.ipcMain;
const Menu  = electron.Menu;

let mainWindow;

app.on('ready', function () {

    const name = electron.app.getName()

    const template = [
        {
            label : name,
            submenu : [
            {
                label: `About ${name}`,
                click: () => {
                    console.log('clicked the application');
                },
                role : 'about'
            },
            {
                type : 'separator'
            },
            {
                label : 'Quit',
                click : () => {
                    app.quit()
                },
                accelerator : 'Cmd+Q'
            }
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

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

