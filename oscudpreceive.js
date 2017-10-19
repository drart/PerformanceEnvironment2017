var osc = require('osc');

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
