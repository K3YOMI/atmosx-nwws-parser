nwws = require(`./index.js`);

let nwwsObject = new nwws({
    databaseDir: `myDatabase.db`,
    cap: false,
    reconnect: true,
    interval: 60,
    authenication: {
        username: `USERNAME_HERE`,
        password: `PASSWORD_HERE`, 
        display: `DISPLAY_NAME`
    }
});

nwwsObject.onEvent(`onAlert`, (alert) => {});
nwwsObject.onEvent(`onMessage`, (message) => {});
nwwsObject.onEvent(`onOccupant`, (occupant) => {});
nwwsObject.onEvent(`onError`, (error) => {console.log(error)});
nwwsObject.onEvent(`onDebug`, (status) => {});
nwwsObject.onEvent(`onServiceInterruption`, (service) => {});
nwwsObject.onEvent(`onReconnect`, (service) => { nwwsObject.setDisplayName(`${nwwsObject.authenication.display} (x${service.reconnects})`)})

