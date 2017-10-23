var osc = require('osc');
var WebSocket = require('ws');
var express = require('express');

var app = express();

app.use( "/", express.static(__dirname) );
app.listen(8000);



var wss = new WebSocket.Server({ port: 9000 });

wss.on("connection", function (socket) {
    console.log("A Web Socket connection has been established!");
    var socketPort = new osc.WebSocketPort({
        socket: socket,
        metadata: true
    });

    // work on this
    socketPort.on("message", function (oscMsg) {
        console.log(oscMsg);
    });

    
    var relay = new osc.Relay(udp, socketPort, {
        raw: true
    });

});

var udp = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 9000,
    remoteAddress: "127.0.0.1",
    remotePort: 8000 
});

udp.on("ready", function () {
    //var ipAddresses = getIPAddresses();
    console.log("Listening for OSC over UDP on port: " + udp.options.remotePort);
    //ipAddresses.forEach(function (address) {
    //    console.log(" Host:", address + ", Port:", udp.options.localPort);
    //});
    console.log("Broadcasting OSC over UDP to", udp.options.remoteAddress + ", Port:", udp.options.remotePort);
});

udp.open();






/*

var flock = require("flocking");

flock.init({
    chans: 8,
    bufferSize: 128
});

var adam = require("./adam");
var bop = adam.bop();

var octopus = adam.octopus();

octopus.set("f1.mul", 0.1);
octopus.set("f2.mul", 0.1);
octopus.set("f3.mul", 0.1);
octopus.set("f4.mul", 0.1);

octopus.set("f1.freq", 100);
octopus.set("f2.freq", 200);
octopus.set("f3.freq", 300);
octopus.set("f4.freq", 400);

octopus.scatter();

octopus.play();


//bop.play();
//bop.set("bop.mul.gate", 1);

console.log(adam);
console.log(flock.enviro.shared.audioSystem.model.chans);


/*
var s = flock.synth({
    synthDef: {
        ugen: "flock.ugen.sin",
        id: "tester",
        expand: 6,
        freq: {
            ugen: "flock.ugen.lfNoise",
            freq: 1,
            mul: 180,
            add: 180
        },
        mul: {
            ugen: "flock.ugen.envGen",
            envelope: {
                type: "flock.envelope.sin",
                duration: 0.5
            },
            gate: {
                ugen: "flock.ugen.lfPulse",
                width: 0.5,
                freq: 1
            }
        }
    }
});

s.play();
*/
