nwws = require(`index.js`);

let nwwsObject = new nwws({
    databaseDir: `myDatabase.db`,
    cap: false,
    authenication: {
        username: `USERNAME-HERE`,
        password: `PASSOWRD-HERE`, 
        display: `DISPLAY-NAME-HERE`
    }
});


nwwsObject.onEvent(`onStanza`, (alert) => {
    console.log(alert);
});
nwwsObject.onEvent(`onAlert`, (alert) => {
    console.log(alert);
});
nwwsObject.onEvent(`onError`, (alert) => {
    console.log(alert)
});


