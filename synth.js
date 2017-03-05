flock.init();


//////////
// Array of Synths
//////////
var chansynths = [];

for ( var i = 0 ; i < flock.enviro.shared.audioSystem.model.chans; i++){
    chansynths.push({ugen: "flock.ugen.sinOsc", mul: 0.5});
    chansynths[i].freq = 440 + (i*5); 
}

var synths = flock.synth({
    synthDef: chansynths    
});

/*
/// put this on its own channel
var noiser = flock.synth({
    synthDef: {
        id: "noiser",
        ugen: "flock.ugen.whiteNoise",    
        mul: 0.05,
        options: {
            numOutputs: 1 
        }
              
    }
});
*/

/*
var synth = flock.synth({
    synthDef:{
        id: "moogy",
        ugen: "flock.ugen.filter.moog",
        source: {
            id: "testy",
            ugen: "flock.ugen.sin",
            mul: {
                id: "freqy",
                ugen: "flock.ugen.dust",
                density: 10,
                mul: 0.3,
                add: 0.5
            }
        },
        resonance: 10,
        cutoff: 1000,
    }
});
*/

//////////
//BUFFERS
//////////



