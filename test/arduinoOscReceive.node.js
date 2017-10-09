var osc = require("osc");

/*******************
 * OSC Over Serial *
 *******************/

// Instantiate a new OSC Serial Port.
var serialPort = new osc.SerialPort({
    devicePath: process.argv[2] || "/dev/cu.usbmodem22131"
});

// Listen for the message event and map the OSC message to the synth.
serialPort.on("message", function (oscMessage) {
    console.log(oscMessage);
});

// Open the port.
serialPort.open();
