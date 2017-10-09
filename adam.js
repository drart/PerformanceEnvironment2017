//////
// Simple Sine Synth
//////
(function(){
    var adam = fluid.registerNamespace("adam");
 
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

    fluid.module.register("adam", __dirname, require);
    module.exports = adam;
})();
