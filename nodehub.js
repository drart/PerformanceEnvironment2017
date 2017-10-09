var osc = require('osc');
var WebSocket = require('ws');

var wss = new WebSocket.Server({ port: 9000 });

wss.on("connection", function (socket) {
    var socketPort = new osc.WebSocketPort({
        socket: socket,
        metadata: true
    });

    // work on this
    socketPort.on("message", function (oscMsg) {
        if (oscMsg.address === "/pressurexy"){
            console.log(typeof oscMsg.args[0].value);
            s.set("tester.freq.freq", oscMsg.args[0].value + 1 );
            s.set("tester.freq.mul", oscMsg.args[1].value + 1);
            s.set("tester.freq.add", oscMsg.args[2].value + 1);
        }
    });
});

var flock = require("flocking");

flock.init({
    chans: 8
});

var adam = require("./adam");
var bop = adam.bop();

//bop.play();
//bop.set("bop.mul.gate", 1);

console.log(adam);


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
