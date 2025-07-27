nwws = require(`./index.js`);

let nwwsObject = new nwws({
    databaseDir: `myDatabase.db`,
    cap: false,
    authenication: {
        username: `USERNAME_HERE`,
        password: `PASSWORD_HERE`, 
        display: `DISPLAY_NAME`
    }
});


nwwsObject.onEvent(`onAlert`, (alert) => {});
nwwsObject.onEvent(`onMessage`, (message) => {});
nwwsObject.onEvent(`onOccupant`, (occupant) => {});
nwwsObject.onEvent(`onError`, (error) => {});
nwwsObject.onEvent(`onDebug`, (status) => {});
nwwsObject.onEvent(`onServiceInterruption`, (service) => {});


