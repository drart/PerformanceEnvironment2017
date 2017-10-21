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
                        levels: [0, 0.45, 0],
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
                funcName: "adam.octopus.scatterfreqs", 
                args: ["{arguments}.0", "{that}"]
            },
            scatterratio: {
                funcName: "adam.octopus.ratiofader",
                args: ["{arguments}.0", "{arguments}.1", "{arguments}.2", "{that}"]
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

    adam.octopus.scatterfreqs = function(t, that){
        var that = that;
        var freqs = [];
        for (var i = 0 ; i<  8; i++){
            //octopus.set("f"+(i+1)+".freq", Math.random() * 1000);
            freqs[i] = (typeof  that.get("f"+(i+1)+".freq") !== 'object') ? that.get("f"+(i+1)+".freq"): that.get("f"+(i+1)+".freq.end");
        }
        //console.log(freqs);
        t  = t || 10;
        //console.log(t);
        freqs.sort(function(){return .5 - Math.random()})
        //console.log(freqs);
        for ( var i = 0 ; i < 8; i++){
            //var temp = Math.floor(Math.random() * freqs.length);
            var x = freqs.pop();
            var yy = (typeof  that.get("f"+(i+1)+".freq") !== 'object') ? that.get("f"+(i+1)+".freq"): that.get("f"+(i+1)+".freq.end");
            var xx = {ugen:"flock.ugen.line", start: yy, end:x, duration: t};
            console.log(xx);
            that.set("f"+(i+1)+".freq", xx);
        }
    }

    adam.octopus.ratiofader = function (v,r,t,that){
        var that = that;
        t = t || 1;
        for ( var i = 0; i < 8; i++){
            var yy = (typeof  that.get("f"+(i+1)+".freq") !== 'object') ? that.get("f"+(i+1)+".freq"): that.get("f"+(i+1)+".freq.end");
            var xx = {ugen:"flock.ugen.line", start: yy, end:v, duration: t};
            that.set("f"+(i+1)+".freq", xx);
            v *= r;
            console.log( that.get("f"+(i+1)+".freq"));
        }
    }

    // from hexapod
    fluid.defaults("adam.stereoclick", {
        gradeNames: ["flock.synth", "autoInit"], 
        invokers: {
            split: {
                funcName: "adam.stereoclick.split", 
                args: ["{that}"]
            },
            slide: {
                funcName: "adam.stereoclick.slide",
                args: ["{that}", "{arguments}.0", "{arguments}.1", "{arguments}.2"]
            },
            splitsimple: {
                func: "{that}.set",
                args: ["cr.source.phase", 0.5]
            }
        },
        synthDef: [
        {
            id: "cl",
            ugen: "flock.ugen.filter.biquad.lp",
            freq: {
                ugen: "flock.ugen.sinOsc",
                freq: 0.2, 
                add: 5000, 
                mul: 1200,
            },
            source: {
                ugen: "flock.ugen.impulse",
                freq: 3,
            }
        },
        {
            id: "cr",
            ugen: "flock.ugen.filter.biquad.lp",
            freq: {
                ugen: "flock.ugen.sinOsc",
                add: 4000, 
                mul: 1000, 
                freq: 0.25
            }, 
            source: {
                ugen: "flock.ugen.impulse",
                freq: 3,
            }
        } 
        ]
    });
    adam.stereoclick.split = function(that){
        that.set("cr.source.phase", 0.5);
    }
    
    adam.stereoclick.slide = function(that, start, end, duration){
        var d = duration || 10;
        var e = end || 0.5;
        var s = start || 0;

        var liner = {
            "ugen" : "flock.ugen.line",
            "duration" : d,
            "start" : s,
            "end" : e 
        };
        console.log(liner);
        that.set("cr.source.phase", liner);
    }
    
    // new overriding     
    fluid.defaults("adam.superstereoclick", {
        gradeNames: ['adam.stereoclick'] ,
        invokers : {
            splitsimple: {
                args: ["cr.source.phase", 0.1] 
             }
        }
    });

    fluid.defaults("adam.bass.randomstereo", {
        gradeNames: ["flock.synth", "autoInit"], 
            synthDef: [{
                ugen: "flock.ugen.square",
                id: "tester",
                freq: {
                    ugen: "flock.ugen.lfNoise",
                    freq: 0.25,
                    mul: 20,
                    add: 30
                },
                mul: {
                    ugen: "flock.ugen.envGen",
                    envelope: {
                        type: "flock.envelope.sin",
                        duration: 2
                    },
                    gate: {
                        ugen: "flock.ugen.lfPulse",
                        width: 0.5,
                        freq: 0.25
                    }
                }
            },
            {
                ugen: "flock.ugen.saw",
                id: "tester",
                freq: {
                    ugen: "flock.ugen.lfNoise",
                    freq: 0.25,
                    mul: 20,
                    add: 30
                },
                mul: {
                    ugen: "flock.ugen.envGen",
                    envelope: {
                        type: "flock.envelope.sin",
                        duration: 2
                    },
                    gate: {
                        ugen: "flock.ugen.lfPulse",
                        width: 0.5,
                        freq: 0.25
                    }
                }
            }
            ]
    });

    fluid.defaults("adam.lowgranny", {
    gradeNames: ["flock.synth", "autoInit"], 
       synthDef: {
           ugen: "flock.ugen.granulator",
           numGrains: {
               ugen: "flock.ugen.lfSaw",
               freq: 0.17283,
               add: 20,
               mul: 19
           },
           grainDur: {
               ugen: "flock.ugen.lfSaw",
               add: 0.5,
               mul: 0.4,
               freq: 0.0184
           },
           delayDur: 8,
           mul: 0.5,
           source: {
               ugen: "flock.ugen.filter.biquad.lp",
               q: 2,
               freq: {
                   ugen: "flock.ugen.sin",
                   rate: "control",
                   freq: {
                       ugen: "flock.ugen.lfSaw",
                       add: 500,
                       mul: 200,
                       freq: 0.018214124
                   },
                   phase: 0,
                   mul: 1000,
                   add: 2000
               },
               source: {
                   ugen: "flock.ugen.lfSaw",
                   freq: {
                       ugen: "flock.ugen.sin",
                       freq: 0.08263,
                       mul: 100,
                       add: 300,
                   },
                   mul: 0.25
               }
           }
       }
    });

    fluid.defaults("adam.bass.stereodistortionphasing", {
        gradeNames: ["flock.synth", "autoInit"],
        synthDef: [{
                ugen: "flock.ugen.distortion.deJonge",
                amount: {
                    ugen: "flock.ugen.sin",
                    mul: 99,
                    add: 100,
                    freq: 0.1,
                },
                source: {
                    ugen: "flock.ugen.sawOsc",
                    freq: {
                        ugen: "flock.ugen.sin",
                        add: 45, 
                        freq: .25
                    }, 
                    mul: 0.01
                }
            },
            {
                ugen: "flock.ugen.distortion.deJonge",
                amount: {
                    ugen: "flock.ugen.sin",
                    mul: 49,
                    add: 50,
                    freq: 0.11,
                },
                source: {
                    ugen: "flock.ugen.sawOsc",
                    freq: 45.3456, 
                    mul: 0.01
                }   
            }]
    });

    ///////////////////////////////
    /// buffers
    ///////////////////////////////
    fluid.defaults("adam.bufferPlayingSynth", {
        gradeNames: "flock.synth",
        bufferUrl: "fluid.mustBeOverridden",
        synthDef: {
            id: "mysample",
            ugen: "flock.ugen.playBuffer",
            buffer: {
                url: "{that}.options.bufferUrl"
            },
            loop: 1,
            start: 0,
            end: 1,
            mul: 0
        },
        model: {
            fadein: {
                ugen: "flock.ugen.line",
                start: 0, 
                end: 1, 
                duration: 30
            },
            fadeout: {
                ugen: "flock.ugen.line",
                start: 1, 
                end: 0, 
                duration: 30
            }
        },
        invokers: {
            fadein: {
                func: "{that}.set",
                args: ["mysample.mul",  "{that}.model.fadein"]
            },
            fadeout: {
                func: "{that}.set",
                args: ["mysample.mul",  "{that}.model.fadeout"]
            }
        }
    });

    fluid.defaults("adam.bufferBand", {
        gradeNames: "flock.band",
        components: {
            grandrone: {
                type: "adam.bufferPlayingSynth",
                options: {
                    bufferUrl: "grandrone.wav"
                }
            },
            freezer: {
                type: "adam.bufferPlayingSynth",
                options: {
                    bufferUrl: "freezer.wav"
                }
            },
            newdrone: {
                type: "adam.bufferPlayingSynth", 
                options: {
                    bufferUrl: "newdrone.wav"
                }
            },
            cymbal: {
                type: "adam.bufferPlayingSynth", 
                options: {
                    bufferUrl: "cymballike.wav"
                }
            }
        }
    });

    // detect node.js environement
    if (typeof module !== 'undefined' && module.exports) {
        fluid.module.register("adam", __dirname, require);
        module.exports = adam;
    }
})();

