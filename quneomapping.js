flock.init({
            bufferSize : 256 
        });

        var cloosh = adam.cloosh();
        cloosh.play();

        var octopus = adam.octopus();
        octopus.play()

        var t  = 10;
        var r = 1.01;
        var v = 300;

        quneo = flock.midi.connection({
            openImmediately: true,
            ports: {
                name : "QUNEO"
            },
            listeners: {
                noteOn: function (msg) {
                    $("#boppad-midi-display").text(fluid.prettyPrintJSON(msg));
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
                    $("#boppad-midi-display").text(fluid.prettyPrintJSON(msg));
                    cloosh.set("env.gate", 0);
                },
                control: function (msg) {
                    $("#boppad-midi-display").text(fluid.prettyPrintJSON(msg));
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
                    */
                    if(msg.number === 0){
                        t = msg.value / 4;
                    }
                    if(msg.number === 1){
                        v = msg.value * 4 + 1;
                    }
                    if(msg.number === 2){
                        r = msg.value / 127 + 1;
                    }
                },
                pitchbend: function(msg) {
                    $("#boppad-midi-display").text(fluid.prettyPrintJSON(msg));
                },
                aftertouch: function(msg){
                    $("#boppad-midi-display").text(fluid.prettyPrintJSON(msg));
                },
            }

        });



quneo.events.onReady.addListener( function(){
    console.log("it's ready");
});

