/**
 * Created by s0m01dq on 10/15/17.
 */

let electron = require('electron');

let ipc = electron.ipcRenderer;
document.getElementById('start').addEventListener('click', function() {
   ipc.send('countdown-start');
});

ipc.on('countdown',function(event, count) {
    document.getElementById('count').innerHTML = count;
})