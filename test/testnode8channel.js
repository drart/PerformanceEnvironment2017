var flock = require("flocking");
var adam = require("../adam");



flock.init({
    chans: 8
});

var octopus = adam.octopus();
octopus.setallvol(80);

console.log( flock.enviro.shared.audioSystem.model.chans);
flock.enviro.shared.play();
