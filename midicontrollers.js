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
        name : "BCF2000 MIDI 1"
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
        },
        pitchbend: function(msg) {
            console.log(msg);
        },
        aftertouch: function(msg){
            $("#bcr2000-aftertouch").text(fluid.prettyPrintJSON(msg));
        }
    }
});
