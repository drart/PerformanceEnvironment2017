flock.init({
        chans:8
}
);


//////////
// Array of Synths
//////////
var chansynths = [];

for ( var i = 0 ; i < flock.enviro.shared.audioSystem.model.chans; i++){
    chansynths.push({ugen: "flock.ugen.sinOsc", mul: 0.0});
    chansynths[i].freq = 440 + (i*5); 
}

var synths = flock.synth({
    synthDef: chansynths    
});

var bop = flock.synth({
    synthDef: {
        id: "bop",
        ugen: "flock.ugen.sinOsc",
        freq: 440,
        mul: {
            ugen: "flock.ugen.asr",
            start: 0.0,
            attack: 0.01,
            sustain: 0.1,
            release: 0.5,
        }
    }
});


bop.play();


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

var synth = flock.synth({
    synthDef:{
        id: "moogy",
        ugen: "flock.ugen.filter.moog",
        source: {
            id: "testy",
            ugen: "flock.ugen.whiteNoise",
            mul: {
                id: "freqy",
                ugen: "flock.ugen.dust",
                density: 100,
                mul: 0.4,
                add: 0.5
            }
        },
        resonance: {
           ugen: "flock.ugen.line",
           start: 1,
           end: 15,
           duration: 100    
        },
        cutoff: {
            ugen: "flock.ugen.sinOsc",
            freq: 0.1,
            mul: 500,
            add: 1000
        },
    }
});

/*
*/

//////////
//BUFFERS
//////////


/*
var thing1 = flock.synth({
    synthDef: {
        ugen: "flock.ugen.playBuffer",
        buffer: {
            id: "thing1",
            url: "beat1.wav"
        }, 
        trigger :{
            ugen: "flock.ugen.impulse",
            freq: 1
        }
    }
});

var buffer;
flock.audio.decode({
    src: "beat1.wav",
    success: function (bufDesc) {
        buffer = bufDesc;
        buffer.id = "thing1";
        flock.environment.registerBuffer(buffer);
        console.log(buffer);
        waveform1.setBuffer(buffer._buffer);
    },
    error: function (err) {
        console.log("There was an error while trying to load the convolver’s impulse reponse audio file.", err);
    }
});
*/

