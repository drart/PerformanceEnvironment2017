(function(){
    var adam = fluid.registerNamespace("adam");
 
    //////
    // Simple Sine Synth
    //////
    fluid.defaults("adam.bop", {
        gradeNames: ["flock.synth", "autoInit"],
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

    fluid.defaults("adam.tick", {
        gradeNames: ["flock.synth", "autoInit"],
        synthDef: {
            id : "tick",
            ugen: "flock.ugen.filter.moog", 
            resonance: 10,
            cutoff: 500,
            source: {
                ugen: "flock.ugen.whiteNoise"
            },
            mul: {
                ugen: "flock.ugen.asr",
                start: 0.0,
                attack: 0.1,
                sustain: 0.1,
                release: 0.5,
            }
        }
        
    });

    fluid.defaults("adam.windy", {
        gradeNames: ["flock.synth", "autoInit"],
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

    fluid.defaults("adam.amfm", {
        gradeNames: ["flock.synth", "autoInit"],
                synthDef: {
                    id: "granny",
                    ugen: "flock.ugen.sinOsc",
                    freq: {
                        ugen: "flock.ugen.sinOsc",
                        freq: 200,
                        mul: 300,
                        add: 500
                    },
                    mul: {
                        ugen: "flock.ugen.sinOsc",
                        mul: 0,
                        add: 0.5
                    }
                }
    });

    // detect node.js environement
    if (typeof module !== 'undefined' && module.exports) {
        fluid.module.register("adam", __dirname, require);
        module.exports = adam;
    }
})();

