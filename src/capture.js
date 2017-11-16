let electron = require('electron');
let path = require('path');
let fs = require('fs');
let ipc = electron.ipcRenderer;
let desktopCapturer = electron.desktopCapturer;
let screen = electron.screen;


function getMainSource(desktopCapturer, screen, done) {
    let options = {
        types: ['screen'],
        thumbnailSize : screen.getPrimaryDisplay().workAreaSize
    }
    desktopCapturer.getSources(options, function (err, sources){
        if(err) console.log('Cannot Capture Screen', err);

        let MainSource = sources.filter(function (source) {
            return source.name === 'Entire screen' || source.name === 'Screen 1'
        });

        console.log(MainSource);

        done(MainSource[0]);
    });
}

function onCapture(evt,targetDir) {
    console.log('capturing');
    getMainSource(desktopCapturer , screen, function (source) {
        const png =  source.thumbnail.toPng();
        const filePath = path.join(targetDir, new Date()+ '.png');
        writeFile(filePath, png);
    });
}

function writeFile(filePath, image) {
    fs.writeFile(filePath, image, function (err) {
        if(err)
            console.log("error in writing file");
    })
}

ipc.on('capture', onCapture) ;