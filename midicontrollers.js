fluid.defaults("adam.midi.controller", {
    gradeNames: "flock.midi.controller",
    openImmediately: true,
    ports: {
        name: "{that}.model.portname"
    },
    model: {
        portname: null,
        domElement: null
    },
    invokers: {
        create:{
            funcName: "adam.midi.controller.create",
            args: ["{that}"]
        },
        domlognoteon:{
            funcName: "adam.midi.controller.domlognoteon",
            args: ["{that}.id", "{arguments}.0"]
        }
    },
    listeners: {
        /*
        "{that}.connection.onReady": function(){
            console.log("fkljalfd");
        },
        */
        "noteOn.log": function(msg){
            console.log(msg);
        },
        "noteOn.domlog" : "{that}.domlognoteon",
        "control.log": function(msg){
            console.log(msg);
        },
        "onCreate.log": "{that}.create",
    }
});

adam.midi.controller.create = function(that){
    that.options.domElement = $("<div/>");
    that.options.domElement.text( that.options.model.portname );
    that.options.domElement.appendTo("body");
    $("<div/>").attr("id", that.id+"-noteon").appendTo(that.options.domElement);
    $("<div/>").attr("id", that.id+"-noteoff").appendTo(that.options.domElement);
    $("<div/>").attr("id", that.id+"-cc").appendTo(that.options.domElement);
};

adam.midi.controller.domlognoteon = function(id, msg){
    console.log(id);
    $("#"+id + "-noteon").text(fluid.prettyPrintJSON(msg));
};

/////////////////////////////////////////////
fluid.defaults("adam.midi.quneo", {
    gradeNames: "adam.midi.controller",
    model: {
        portname: "QUNEO",
    },

});


fluid.defaults("adam.midi.quneo.october2017", {
    gradeNames: "adam.midi.quneo",
    invokers:{
        removelogs: {
            func: function(that){
                that.removeListener("control.log");
                that.removeListener("noteOn.log");
                that.removeListener("noteOff.log");
            },
            args: ["{that}"]
        }
    },
    listeners:{ 
        //"after:onCreate": "{that}.removelogs",
        noteOn: function (msg) {
            //$("#boppad-midi-display").text(fluid.prettyPrintJSON(msg));
            if (msg.note >= 68 && msg.note <= 83){
                var myval = (83 - msg.note)/ (83 - 68); 
                cloosh.set("env.gate", 1);
                cloosh.set("boop.freq", msg.note * 40);
                cloosh.set("freeverb.room", myval);
                cloosh.set("freeverb.damp", 1 - myval);
                //cloosh.set("freeverb.mix", Math.sin(myval));
                cloosh.set("freeverb.width", Math.sin(myval));
            }
            /*
            if(msg.note === 25){
                octopus.scatter();
            }
            if(msg.note === 26){
                octopus.scatterratio(v,r,t);
            }
            */
        },
        noteOff: function (msg) {
            //$("#boppad-midi-display").text(fluid.prettyPrintJSON(msg));
            cloosh.set("env.gate", 0);
        },
        control: function (msg) {
            //$("#boppad-midi-display").text(fluid.prettyPrintJSON(msg));
            if(msg.number === 10){
                cloosh.set("freeverb.mix", msg.value/127 );
            }
            /*
            if(msg.number === 6){
                octopus.set("f1.mul", msg.value/ 127);
                octopus.set("f5.mul", msg.value/ 127);
            }
            if(msg.number === 7){
                octopus.set("f2.mul", msg.value/ 127);
                octopus.set("f6.mul", msg.value/ 127);
            }
            if(msg.number === 8){
                octopus.set("f3.mul", msg.value/ 127);
                octopus.set("f7.mul", msg.value/ 127);
            }
            if(msg.number === 9){
                octopus.set("f4.mul", msg.value/ 127);
                octopus.set("f8.mul", msg.value/ 127);
            }
            if(msg.number === 0){
                t = msg.value / 4;
            }
            if(msg.number === 1){
                v = msg.value * 4 + 1;
            }
            if(msg.number === 2){
                r = msg.value / 127 + 1;
            }
            */
        }
    }
});




fluid.defaults("adam.midi.quneo.october2017test", {
    gradeNames: "adam.midi.quneo",
    listeners: {
        noteOn: function(msg){
            //console.log(msg);
            //bop.set("bop.freq", Math.pow(2, (msg.note-69)/12) * 440 );
            //bop.set("bop.mul.gate", 1);
            //$("#quneo-noteon").text(fluid.prettyPrintJSON(msg));
        },
        noteOn: function (msg) {
        },
        noteOff: function (msg) {
            //console.log(msg);
            //bop.set("bop.mul.gate", 0);
            //$("#quneo-noteoff").text(fluid.prettyPrintJSON(msg));
        },
        control: function (msg) {
            //console.log(msg);
            //bop.set("bop.mul.gate", 0);
            //$("#quneo-cc").text(fluid.prettyPrintJSON(msg));
        },
        //pitchbend: function(msg) {
        //    //console.log(msg);
        //},
        //aftertouch: function(msg){
            //console.log(msg);
        //    $("#quneo-aftertouch").text(fluid.prettyPrintJSON(msg));
        //}
    }
});


fluid.defaults("adam.midi.boppad", {
    gradeNames: "adam.midi.controller",
    model: {
        portname: "BopPad"
    }
});

fluid.defaults("adam.midi.bcr2000", {
    gradeNames: "adam.midi.controller",
    model: {
        portname: "BCF2000 Port 1"
    }
});


var quneo = adam.midi.quneo.october2017();
var boppad = adam.midi.boppad();
var bcr2000 = adam.midi.bcr2000();



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

var abletonpush = flock.midi.connection({
    // This should only be used if you know the port you want to use
    // ahead of time. Otherwise, the system.ports object should be bound to a UI
    // of some kind and the user should be allowed to select their ports.
    // When a selection has been made, invoke .open() on this connection.
    // Remember that the whole system is asynchronous, which means you have to wait
    // for the ready() event to get the current list of ports.
    openImmediately: true,
    // This option is highly configurable. In the simplest case,
    // you can specify a "manufacturer" properity, a port "name" property (e.g. QUNEO), or both.
    // If you want more complex routings, you can specify "inputs" and "outputs" objects,
    // which can contain "manufacturer" and "name" properties. This allows
    // you to route input signals from a different device than the output.
    // You can even specify arrays for the "input" and "output" properties 
    // if you want to listen for MIDI message on multiple ports or send broadcast
    // messages to multiple device.
    // But for most simple cases, you'll just want to refer to the device either 
    // by port name or manufacturer.
    ports: {
        name : "Ableton Push User Port"
    },

    listeners: {
        noteOn: function (msg) {
            abletonNoteOns(msg);
        },
        noteOff: function () {
            synth.set("mod.mul.gate", 0);
        },
        control: function (msg) {
            abletonCCs(msg);
        },
        pitchbend: function(msg) {
            console.log(msg);
        },
        aftertouch: function(msg){
            console.log(msg);
        }
    }
 
});

// map knobs to glitchseq
// TODO load glitchseq
var abletonCCs = function(msg){
    // push knobs
    if (msg.number < 79 && msg.number > 70){
	// glitchseq
         glitches[msg.number - 71].prob = msg.value / 127;
         console.log(msg.value / 127);
    }
    // play button
    if (msg.number === 85){
        glitchseq.play();
        buster.play();
        gibble.play();
        gobble.play();

        abletonpush.send([176, 85, 127]); // dim play light 
    }
};

var abletonNoteOns = function(msg){
    //knob touches
    if (msg.note > 11){
    
    }
    // grid buttons 
    if(msg.note > 35 ){
        var vel = msg.velocity/ 127;
        synth.set({
            "carrier.freq": flock.midiFreq(msg.note),
            "mod.mul.gate": 1.0,
            "mod.mul.sustain": vel
        });
        //console.log(msg.note);
        //console.log(synth.get("carrier.freq"));
    }
};





// ---------------------------------
// SETUP PUSH LIGHTS
// ---------------------------------
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

/* TODO
- start by clearing them all
*/

/*
var boppad = flock.midi.connection({
    openImmediately: true,
    ports: {
        name : "BopPad"
    },
    listeners: {
        noteOn: function (msg) {
            //console.log(msg);
            //bop.set("bop.mul.gate", 1);
            $("#boppad-noteon").text(fluid.prettyPrintJSON(msg));
        },
        noteOff: function (msg) {
            //console.log(msg);
            //bop.set("bop.mul.gate", 0);
            $("#boppad-noteoff").text(fluid.prettyPrintJSON(msg));
        },
        control: function (msg) {
            //console.log(msg);
            //bop.set("bop.mul.gate", 0);
            $("#boppad-cc").text(fluid.prettyPrintJSON(msg));
        },
        pitchbend: function(msg) {
            console.log(msg);
        },
        aftertouch: function(msg){
            //console.log(msg);
            $("#boppad-aftertouch").text(fluid.prettyPrintJSON(msg));
        }
    }
 
});

var quneo = flock.midi.connection({
    openImmediately: true,
    ports: {
        name : "QUNEO"
    },
    listeners: {
        noteOn: function (msg) {
            //console.log(msg);
            //bop.set("bop.freq", Math.pow(2, (msg.note-69)/12) * 440 );
            //bop.set("bop.mul.gate", 1);
            $("#quneo-noteon").text(fluid.prettyPrintJSON(msg));
        },
        noteOff: function (msg) {
            //console.log(msg);
            //bop.set("bop.mul.gate", 0);
            $("#quneo-noteoff").text(fluid.prettyPrintJSON(msg));
        },
        control: function (msg) {
            //console.log(msg);
            //bop.set("bop.mul.gate", 0);
            $("#quneo-cc").text(fluid.prettyPrintJSON(msg));
        },
        pitchbend: function(msg) {
            //console.log(msg);
        },
        aftertouch: function(msg){
            //console.log(msg);
            $("#quneo-aftertouch").text(fluid.prettyPrintJSON(msg));
        }
    }
});
var akai = flock.midi.connection({
    openImmediately: true,
    ports: {
        name : "LPD8 MIDI 1"
    },
    listeners: {
        noteOn: function (msg) {
            //console.log(msg);
            //bop.set("bop.freq", msg.note* 200);
            //bop.set("bop.mul.gate", 1);
            $("#akai-noteon").text(fluid.prettyPrintJSON(msg));
        },
        noteOff: function (msg) {
            //console.log(msg);
            //bop.set("bop.mul.gate", 0);
            $("#akai-noteoff").text(fluid.prettyPrintJSON(msg));
        },
        control: function (msg) {
            //console.log(msg.number);
            //bop.set("bop.mul.gate", 0);
            $("#akai-cc").text(fluid.prettyPrintJSON(msg));
            //synths.set(Number( msg.number -1 ).toString() + '.mul', msg.value/ 127);
        },
        pitchbend: function(msg) {
            console.log(msg);
        },
        aftertouch: function(msg){
            $("#akai-aftertouch").text(fluid.prettyPrintJSON(msg));
            //console.log(msg);
        }
    }
});

var bcr2000 = flock.midi.connection({
    openImmediately: true,
    ports: {
        name : "BCF2000 Port 1"
    },
    listeners: {
        noteOn: function (msg) {
            $("#bcr2000-noteon").text(fluid.prettyPrintJSON(msg));
        },
        noteOff: function (msg) {
            $("#bcr2000-noteoff").text(fluid.prettyPrintJSON(msg));
        },
        control: function (msg) {
            $("#bcr2000-cc").text(fluid.prettyPrintJSON(msg));
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
        },
        pitchbend: function(msg) {
            console.log(msg);
        },
        aftertouch: function(msg){
            $("#bcr2000-aftertouch").text(fluid.prettyPrintJSON(msg));
        }
    }
});

*/
