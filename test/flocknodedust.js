
var repl = require("repl");


var flock = require("flocking");

flock.init({
    chans: 8
});


var s = flock.synth({
    synthDef: {
        ugen: "flock.ugen.dust",
        expand: 6,
        density: 10
    }
});

s.play();

var replServer = repl.start({
    prompt: "my-app > ",
});
replServer.context.flock = flock;
