flock.init();

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


//////////
//BUFFERS
//////////



