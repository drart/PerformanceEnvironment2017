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

    fluid.defaults("adam.dusty", {
        gradeNames: ["flock.synth", "autoInit"],
        synthDef: {
            ugen: "flock.ugen.dust",
            density: {
                ugen: "flock.ugen.sinOsc",
                freq: .05,
                mul: 50,
                add: 50,
            },
            mul: 0.25
        }
    });

    fluid.defaults("adam.cloosh", {
        gradeNames: ["flock.synth", "autoInit"],
        synthDef: {
            id: "freeverb",
            ugen: "flock.ugen.freeverb",
                source: {
                    id: "boop",
                    ugen: "flock.ugen.sinOsc",
                    freq: 500,
                mul: {
                    id : "env",
                    ugen: "flock.ugen.envGen",
                    rate: "control",
                    envelope: {
                        levels: [0, 1, 0],
                        times: [0.01, 0.5],
                        curve: ["exponential", "exponential"]
                    }
                }
            }
        }  
    });
    
    fluid.defaults("adam.octopus", {
        gradeNames: ["flock.synth", "autoInit"],
        invokers: {
            scatter: {
                funcName: "adam.octopus.scatterfreqs"
            },
            scatterratio: {
                funcName: "adam.octopus.ratiofader"
            }
        },
        synthDef: [
            {
                id: "f1",
                ugen: "flock.ugen.sinOsc",
                freq: 300,
                mul: 0.0
            },
            {
                id: "f2",
                ugen: "flock.ugen.sinOsc",
                freq: 302,
                mul: 0.
            },
            {
                id: "f3",
                ugen: "flock.ugen.sinOsc",
                freq: 303,
                mul: 0.
            },
            {
                id: "f4",
                ugen: "flock.ugen.sinOsc",
                freq: 305,
                mul: 0.
            },
            {
                id: "f5",
                ugen: "flock.ugen.sinOsc",
                freq: 307,
                mul: 0.
            },
            {
                id: "f6",
                ugen: "flock.ugen.sinOsc",
                freq: 308,
                mul: 0.
            },
            {
                id: "f7",
                ugen: "flock.ugen.sinOsc",
                freq: 311,
                mul: 0.
            },
            {
                id: "f8",
                ugen: "flock.ugen.sinOsc",
                freq: 314,
                mul: 0.
            }
        ]
    });


    adam.octopus.scatterfreqs = function(t){
        var freqs = [];
        for (var i = 0 ; i<  8; i++){
            //octopus.set("f"+(i+1)+".freq", Math.random() * 1000);
            freqs[i] = (typeof  octopus.get("f"+(i+1)+".freq") !== 'object') ? octopus.get("f"+(i+1)+".freq"): octopus.get("f"+(i+1)+".freq.end");
        }
        console.log(freqs);
        t  = t || 10;
        console.log(t);
        for ( var i = 0 ; i < 8; i++){
            //var temp = Math.floor(Math.random() * freqs.length);
            freqs.sort(function(){return .5 - Math.random()})
            var x = freqs.pop();
            var yy = (typeof  octopus.get("f"+(i+1)+".freq") !== 'object') ? octopus.get("f"+(i+1)+".freq"): octopus.get("f"+(i+1)+".freq.end");
            var xx = {ugen:"flock.ugen.line", start: yy, end:x, duration: t};
            console.log(xx);
            octopus.set("f"+(i+1)+".freq", xx);
        }
    }
    adam.octopus.ratiofader = function (v,r,t){
        t = t || 1;
        for ( var i = 0; i < 8; i++){
            var yy = (typeof  octopus.get("f"+(i+1)+".freq") !== 'object') ? octopus.get("f"+(i+1)+".freq"): octopus.get("f"+(i+1)+".freq.end");
            var xx = {ugen:"flock.ugen.line", start: yy, end:v, duration: t};
            octopus.set("f"+(i+1)+".freq", xx);
            v *= r;
            console.log( octopus.get("f"+(i+1)+".freq"));
        }
    }



    // detect node.js environement
    if (typeof module !== 'undefined' && module.exports) {
        fluid.module.register("adam", __dirname, require);
        module.exports = adam;
    }
})();

