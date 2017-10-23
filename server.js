var osc = require('osc');
var WebSocket = require('ws');
var express = require('express');

var app = express();

app.use( "/", express.static(__dirname) );
app.listen(8000);



var wss = new WebSocket.Server({ port: 9000 });

wss.on("connection", function (socket) {
    var socketPort = new osc.WebSocketPort({
        socket: socket,
        metadata: true
    });

    // work on this
    socketPort.on("message", function (oscMsg) {
        console.log(oscMsg);
        if (oscMsg.address === "/pressurexy"){
            console.log(typeof oscMsg.args[0].value);
            s.set("tester.freq.freq", oscMsg.args[0].value + 1 );
            s.set("tester.freq.mul", oscMsg.args[1].value + 1);
            s.set("tester.freq.add", oscMsg.args[2].value + 1);
        }
    });
});








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
