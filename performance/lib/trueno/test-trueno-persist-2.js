"use strict";

/**
 * @author Edgardo A. Barsallo Yi (ebarsallo)
 * This module decription
 * @module path/moduleFileName
 * @see module:path/referencedModuleName
 */

/* import modules */
const Promise = require("bluebird");
const Socket = require('uws');

const dbName = 'test3';

var ws = new Socket('ws://localhost:8008');

/* Create callbacks reference */
var callbacks = {};

ws.on('open', function open() {
    console.log('connected');
    create();
});

ws.on('error', function error() {
    console.log('Error connecting!');
});

ws.on('message', function(data, flags) {
    console.log('Message: ' + data);
    var obj = JSON.parse(data);
    callbacks[obj.callbackIndex](obj);

    console.log('Message: ' + data);
});

ws.on('close', function(code, message) {
    console.log('Disconnection: ' + code + ', ' + message);
});

/* the payload object */
var internal = {
    index: dbName,
    type: 'v',
    id: 1,
    source: {
        label: 'knows',
        prop: {
            name: 'Bob',
            age: 28,
            city: 'Chicago'
        }
    }
};
var counter = 'create_1';

var payload = {
    callbackIndex: counter,
    action: "persist",
    object: internal
};


function create() {
    console.log('send --> ', JSON.stringify(payload));
    ws.send(JSON.stringify(payload));
    /* adding callback */
    callbacks[counter] = function(results){
        console.log('done');
    };
}

