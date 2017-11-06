/////////////////////////////////////////////
//  Controller Mappings
/////////////////////////////////////////////
fluid.defaults("adam.midi.quneo.october2017", {
    //gradeNames: ["adam.midi.quneo", "adam.midi.console", "adam.midi.domlog"],
    gradeNames: ["adam.midi.quneo", "adam.midi.domlog"],
    listeners:{ 
        noteOn: function (msg) {
            if (msg.note >= 68 && msg.note <= 83){
                var myval = (83 - msg.note)/ (83 - 68); 
                cloosh.set("env.gate", 1);
                cloosh.set("boop.freq", msg.note * 40);
                cloosh.set("freeverb.room", myval);
                cloosh.set("freeverb.damp", 1 - myval);
                //cloosh.set("freeverb.mix", Math.sin(myval));
                cloosh.set("freeverb.width", Math.sin(myval));
            }
        },
        noteOff: function (msg) {
            cloosh.set("env.gate", 0);
        },
        control: function (msg) {
            if(msg.number === 10){
                cloosh.set("freeverb.mix", msg.value/127 );
            }
        }
    }
});


fluid.defaults("adam.midi.quneo.november2017", {
    //gradeNames: ["adam.midi.quneo", "adam.midi.console", "adam.midi.domlog"],
    gradeNames: ["adam.midi.quneo", "adam.midi.domlog"],
    listeners:{ 
        noteOn: function (msg) {
            if (msg.note >= 68 && msg.note <= 83){
                clish.set("bop.freq.add", flock.midiFreq(msg.note));        
                clish.set("bop.mul.gate", 1);
            }
        },
        noteOff: function (msg) {
            clish.set("bop.mul.gate", 0);
        },
        control: function (msg) {
            if((msg.number - 23) % 3 === 0){
                console.log(msg);
                clish.set("bop.freq.freq", msg.value/ 10);
                clish.set("bop.freq.mul", msg.value/ 10);
            }
        }
    }
});

fluid.defaults("adam.midi.push.november2017", {
    gradeNames: ["adam.midi.push", "adam.midi.domlog", "adam.midi.console"],
    listeners: {
        noteOn: function(msg){
            if(msg.note > 20){
                clish.set("bop.freq.add", flock.midiFreq(msg.note));        
                clish.set("env.gate", 1);
            }
        },
        noteOff: function(msg){
            clish.set("env.gate", 0);
        },
        aftertouch: function(msg){
            //console.log(msg);             
            //clish.set("bop.freq.freq", msg.note / 30);
            //clish.set("bop.freq.mul", msg.note / 30);
        }
    }
});

fluid.defaults("adam.midi.bcr2000.october2017", {
    gradeNames: ["adam.midi.bcr2000", "adam.midi.domlog"],
    listeners: {
        control: function (msg) {
            if(msg.number ===81){
                octopus.set("f1.mul", msg.value / 127);
            }
            if(msg.number ===82){
                octopus.set("f2.mul", msg.value / 127);
            }
            if(msg.number ===83){
                octopus.set("f3.mul", msg.value / 127);
            }
            if(msg.number ===84){
                octopus.set("f4.mul", msg.value / 127);
            }
            if(msg.number ===85){
                octopus.set("f5.mul", msg.value / 127);
            }
            if(msg.number === 89){
                octopus.scatter();
            }
            if(msg.number === 90){
                octopus.scatterratio(300,1.06,30);
            }
            if(msg.number === 91){
                octopus.scatterratio(305,1.06* 1.06,30);
            }
            if(msg.number === 92){
                octopus.scatterratio(299,1.04,30);
            }
        }
    }
});

fluid.defaults("adam.midi.bcr2000.november2017", {
    gradeNames: ["adam.midi.bcr2000", "adam.midi.domlog"],
    listeners: {
        control: function (msg) {
            if(msg.number ===81){
                octopus.set("f1.mul", msg.value / 127);
            }
            if(msg.number ===82){
                octopus.set("f2.mul", msg.value / 127);
            }
            if(msg.number ===83){
                octopus.set("f3.mul", msg.value / 127);
            }
            if(msg.number ===84){
                octopus.set("f4.mul", msg.value / 127);
            }
            if(msg.number ===85){
                octopus.set("f5.mul", msg.value / 127);
            }
            if(msg.number ===86){
                octopus.set("f6.mul", msg.value / 127);
            }
            if(msg.number ===87){
                octopus.set("f7.mul", msg.value / 127);
            }
            if(msg.number ===88){
                octopus.set("f8.mul", msg.value / 127);
            }
            if(msg.number === 89){
                octopus.scatter();
            }
            if(msg.number === 90){
                octopus.scatterratio(300,1.06,30);
            }
            if(msg.number === 91){
                octopus.scatterratio(305,1.06* 1.06,30);
            }
            if(msg.number === 92){
                octopus.scatterratio(299,1.04,30);
            }
        }
    }
});

/*
 * // the future!!!
fluid.defaults("adam.midi.bcr2000", {
    gradeNames: "flock.midi.connection",
    listeners: {
        "noteOn.domoreimportantthing": "{synth}.set(awesome.ugen, 440)",
        "noteOn.logNoteValue" : {
            priority: "after:domoreimportantthing",
        }
    }
});
*/


/////////////////////////////////////////////
//  Performance Mappings
/////////////////////////////////////////////
function october2017(){

    if (document !== undefined){
        document.getElementById('sf1-label').innerHTML = "Cymbal Drone";
        document.getElementById('sf2-label').innerHTML = "Other Drone";
        document.getElementById('sf3-label').innerHTML = "Granular Bass";
        document.getElementById('sf4-label').innerHTML = "Freezer";

        document.getElementById('sf1').addEventListener('change', function(event){
            if (this.checked){
                drones.cymbal.fadein();
            }else{
                drones.cymbal.fadeout();
            }
        });
        document.getElementById('sf2').addEventListener('change', function(event){
            if (this.checked){
                drones.newdrone.fadein();
            }else{
                drones.newdrone.fadeout();
            }
        });
        document.getElementById('sf3').addEventListener('change', function(event){
            if (this.checked){
                drones.grandrone.fadein();
            }else{
                drones.grandrone.fadeout();
            }
        });
        document.getElementById('sf4').addEventListener('change', function(event){
            if (this.checked){
                drones.freezer.fadein();
            }else{
                drones.freezer.fadeout();
            }
        });
    }

    if(window !== undefined){
        window.drones = adam.bufferBand();
        window.cloosh = adam.cloosh();
        window.octopus = adam.octopus();
        window.quneo = adam.midi.quneo.october2017();
        window.bcr2000 = adam.midi.bcr2000.october2017();
    }
}

function november2017(){
    if(window !== undefined){
        window.cloosh = adam.cloosh();
        window.clish = adam.bopper();
        window.octopus = adam.octopus();
        window.quneo = adam.midi.quneo.november2017();
        window.push = adam.midi.push.november2017();
        window.bcr2000 = adam.midi.bcr2000.november2017();
    }
    oscPort.on("message", function(msg){
        if(msg.address === "/pressurexy"){
            console.log(msg.args);
        }
    });
}
