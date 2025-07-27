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


nwwsObject.onEvent(`onStanza`, (stanza) => { console.log(stanza); }); 
nwwsObject.onEvent(`onAlert`, (alert) => { console.log(alert);    });
nwwsObject.onEvent(`onError`, (error) => { console.log(error)     });
nwwsObject.onEvent(`onDebug`, (debug) => { console.log(debug);    });


