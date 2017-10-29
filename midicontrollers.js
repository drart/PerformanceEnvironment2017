/////////////////////////////////////////////
//  Controller Utilities
/////////////////////////////////////////////
fluid.defaults("adam.midi.console", {
    listeners: {
        "noteOn.log": function(msg){
            console.log(msg);
        },
        "noteOff.log": function(msg){
            console.log(msg);
        },
        "control.log": function(msg){
            console.log(msg);
        },
        "aftertouch.log": function(msg){
            console.log(msg)
        },
        "pitchbend.log": function(msg){
            console.log(msg)
        }
    }
});

fluid.defaults("adam.midi.domlog", {
    model:{
        domElement: null
    }, 
    invokers: {
        creator: {
            funcName: "adam.midi.domlog.ready",
            args: ["{that}"]
        },
        printor: {
            func: function(that, msg){
                if(msg.type === "noteOn"){
                    $("#" + that.id + "-noteon").text(fluid.prettyPrintJSON(msg));
                }
                if(msg.type === "noteOff"){
                    $("#" + that.id + "-noteoff").text(fluid.prettyPrintJSON(msg));
                }
                if(msg.type === "control"){
                    $("#" + that.id + "-cc").text(fluid.prettyPrintJSON(msg));
                }
                if(msg.type === "aftertouch"){
                    $("#" + that.id + "-aftertouch").text(fluid.prettyPrintJSON(msg));
                }
                if(msg.type === "pitchbend"){
                    $("#" + that.id + "-pitchbend").text(fluid.prettyPrintJSON(msg));
                }
            },
            args: ["{that}", "{arguments}.0"]
        }
    },
    listeners: {
        "noteOn.domlog": "{that}.printor",
        "noteOff.domlog": "{that}.printor",
        "control.domlog": "{that}.printor",
        "aftertouch.domlog": "{that}.printor",
        "pitchbend.domlog": "{that}.printor",
        "onReady.preapredom": "{that}.creator",
    }
});

adam.midi.domlog.ready = function(that){
    that.options.domElement = $("<div/>");
    that.options.domElement.text( that.options.model.portname );
    that.options.domElement.appendTo("#midi-display");
    $("<div/>").attr("id", that.id+"-label").text(that.options.ports.input.name).appendTo(that.options.domElement);
    $("<div/>").attr("id", that.id+"-noteon").appendTo(that.options.domElement);
    $("<div/>").attr("id", that.id+"-noteoff").appendTo(that.options.domElement);
    $("<div/>").attr("id", that.id+"-cc").appendTo(that.options.domElement);
    $("<div/>").attr("id", that.id+"-aftertouch").appendTo(that.options.domElement);
    $("<div/>").attr("id", that.id+"-pitchbend").appendTo(that.options.domElement);
};

/////////////////////////////////////////////
//  Controllers
/////////////////////////////////////////////
fluid.defaults("adam.midi.quneo", {
    gradeNames: "flock.midi.connection", 
    openImmediately: true,
    ports: {
        input: {
            name : "QUNEO",
        }
    }
});

fluid.defaults("adam.midi.boppad", {
    gradeNames: "flock.midi.connection",
    openImmediately: true,
    ports: {
        input: {
            name: "BopPad"
        }
    }
});

fluid.defaults("adam.midi.bcr2000", {
    gradeNames: "flock.midi.connection",
    openImmediately: true,
    ports: {
        input: {
            name: "BCF2000 Port 1"
        }
    }
});

fluid.defaults("adam.midi.push", {
    gradeNames: "flock.midi.connection",
    openImmediately: true,
    ports: {
        input: {
            name : "Ableton Push User Port"
        }
    }
});
// ---------------------------------
// SETUP PUSH LIGHTS
// ---------------------------------
/* TODO - start by clearing them all */
/*
(function(){
    setTimeout( function(){
        abletonpush.send([176, 85, 1]); // dim play light 
        abletonpush.send([176, 50, 1]); // dim play light 
        abletonpush.send([176, 51, 1]); // dim play light 
        abletonpush.send([176, 114, 1]); // dim play light 
        abletonpush.send([176, 115, 1]); // dim play light 
        for (var i = 36; i < 100; i++){
            abletonpush.send([144, i, 100]); // dim play light 
        }
    }, 1000);
})();
*/

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


fluid.defaults("adam.midi.push.november2017", {
    gradeNames: ["adam.midi.push", "adam.midi.domlog", "adam.midi.console"],
    listeners: {
        noteOn: function(msg){
            if(msg.note > 20){
                clish.set("env.gate", 1);
                clish.set("boop.freq", flock.midiFreq(msg.note));        
            }
        },
        noteOff: function(msg){
            clish.set("env.gate", 0);
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


//// adampted from STD.dbtorms in ChucK
function dbtorms (val){
    var logten = Math.log(10);
    return  (val<=0)? 0: Math.exp( (logten * 0.05) * (val-100));
}
