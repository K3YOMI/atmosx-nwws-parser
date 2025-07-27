# AtmosphericX (NOAA Weather Wire Service Parser)
---

This package allows you to easily obtain and parse data from the NOAA Weather Wire Service (NWWS) using Node.js. It provides a simple framework to connect to the NWWS and authenticate and parse messages such as CAP (Common Alerting Protocol) messages and or Raw Text Products.


## Installation
```bash
npm install atmosx-nwws-parser
or 
npm install k3y0mi@nwws-parser
```

## Usage
```javascript
const nwws = require('atmosx-nwws-parser'); // Alternatively, require(`@k3y0mi/nwws-parser`)

let nwwsObject = new nwws({
    databaseDir: `myDatabase.db`, // Path to your database file (Default: shapefiles.db)
    cap: false, // Set to true if you wish to only recieve CAP messages (Default: False)
    authenication: {
        username: `USERNAME_HERE`, // Your NWWS username
        password: `PASSWORD_HERE`, // Your NWWS password
        display: `DISPLAY_NAME` // Display name for the connection (If left empty, it will default to the username)
    }
});

nwwsObject.onEvent(`onStanza`, (stanza) => { console.log(stanza); }); // This will log all stanzas received from the NWWS without parsing.
nwwsObject.onEvent(`onAlert`, (alert) => { console.log(alert);    }); // This will log all parsed RAW and CAP alerts.
nwwsObject.onEvent(`onError`, (error) => { console.log(error)     }); // This will log any errors that occur during the connection or parsing process.
nwwsObject.onEvent(`onDebug`, (debug) => { console.log(debug);    }); // This will log any debug messages that occur during the connection or parsing process.
```

