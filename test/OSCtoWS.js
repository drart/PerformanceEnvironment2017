//  Listen to OSC on UDP Port 9000 and relay to websockets 
var osc = require('osc');
var WebSocket = require('ws');

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0", 
    localPort: 9000
});

udpPort.on("ready", function () {
    console.log("Listening for OSC over UDP.");
});

udpPort.on("message", function (oscMessage) {
    console.log(oscMessage);
});

udpPort.on("error", function (err) {
    console.log(err);
});

udpPort.open();

var wss = new WebSocket.Server({ port: 9000 });

wss.on("connection", function (socket) {
    var socketPort = new osc.WebSocketPort({
        socket: socket
    });

    var relay = new osc.Relay(udpPort, socketPort, {
        raw: true
    });
});
