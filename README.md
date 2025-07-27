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
```


## Listeners

You can listen for various events emitted by the parser. Here are the available events:

```js
nwwsObject.onEvent(`onAlert`, (alert) => {
    for (let i = 0; i < alert.length; i++) {
        console.log(alert[i]); // Fully parsed alert object.
    }
});
```

```js
nwwsObject.onEvent(`onMessage`, (message) => {
    console.log(message); // Raw stanza object received from NWWS (This is a object containing the message and attributes)
});
```

```js
nwwsObject.onEvent(`onOccupant`, (occupant) => {
    console.log(occupant); // Room occupant object containing the nickname and JID of the occupant.
});
```

```js
nwwsObject.onEvent(`onError`, (error) => {
    console.log(`Error:`, error); // String containing the stack trace / error message
});
```

```js
nwwsObject.onEvent(`onDebug`, (status) => {
    console.log(`Debug:`, status); // Debug message, useful for debugging purposes
});
```

```js
nwwsObject.onEvent(`onServiceInterruption`, (service) => {
    console.log(`Service Interruption:`, service); // String containing details about the service interruption
});
```


