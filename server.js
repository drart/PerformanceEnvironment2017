var osc = require('osc');
var WebSocket = require('ws');
var express = require('express');

var app = express();

app.use( "/", express.static(__dirname) );
app.listen(8000);

var wss = new WebSocket.Server({ port: 9000 });

var perfomancehubsocket = undefined;

wss.on("connection", function (socket) {
    if (perfomancehubsocket === undefined){

        perfomancehubsocket = new osc.WebSocketPort({
            metadata: true, 
            socket: socket
        });
        
        var udprelay = new osc.Relay(udp, perfomancehubsocket, {
            raw: true
        });

        var soundplanerelay = new osc.Relay(soundplane, perfomancehubsocket, {
            raw: true
        });

    }else{
    
        var socketPort = new osc.WebSocketPort({
            metadata: true,
            socket: socket
        });

        var websocketrelay = new osc.Relay(socketPort, perfomancehubsocket, {
            raw: true
        });
    
    }

    console.log("A Web Socket connection has been established!");
});

var udp = new osc.UDPPort({
    metadata: true,
    localAddress: "0.0.0.0",
    localPort: 9000,
});

udp.on("ready", function () {
    console.log("Listening for OSC over UDP on port: " + udp.options.localPort);
    console.log("Broadcasting OSC over UDP to", udp.options.remoteAddress + ", Port:", udp.options.remotePort);
    console.log(udp);
});

udp.open();

var soundplane = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 3123,
});

soundplane.open();


