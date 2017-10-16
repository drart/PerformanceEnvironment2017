var glitchticks = 0;
var glitches = [];

for(var i = 1; i < 9; i++){
    glitches.push( flock.synth({
        synthDef:{
            ugen: "flock.ugen.playBuffer",
            buffer: {
                url: "glitchseq/beat" + i + ".wav"
            },
            trigger: {
                id: "trig",
                ugen: "flock.ugen.valueChangeTrigger"
            }
        }
    }));
    glitches[i-1].prob = 1;
}


function scatt(){
    glitches.sort(function(){return .5 - Math.random()});
}

function rands(){
    for( var i = 0; i < glitches.length; i++){
        glitches[i].prob = Math.random();
    }
}

var glitchseq = flock.synth({
    synthDef: {
        ugen: "flock.ugen.triggerCallback",
        trigger: {
            id: "pulse",
            ugen: "flock.ugen.impulse",
            freq: 4
        },
        options: {
            callback: {
                func: function(){
                    if (glitches[glitchticks % glitches.length].prob > Math.random()){
                        glitches[glitchticks % glitches.length].set("trig.source", 1);
                    }
                    glitchticks++;
                }
            }
        }
    }
});
