//////////
// Array of Synths
//////////
var chansynths = [];

for ( var i = 0 ; i < flock.enviro.shared.audioSystem.model.chans; i++){
    chansynths.push({ugen: "flock.ugen.sinOsc", mul: 0.0});
    chansynths[i].freq = 440 + (i*5); 
    chansynths[i].id = Number(i).toString();
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

/*
// stolen from colin clark
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
