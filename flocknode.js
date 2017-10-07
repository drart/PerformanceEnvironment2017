var repl = require("repl");


var flock = require("flocking");

flock.init({
    chans: 8
});


var s = flock.synth({
    synthDef: {
                  ugen: "flock.ugen.sin",
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

var replServer = repl.start({
    prompt: "my-app > ",
});
replServer.context.flock = flock;
