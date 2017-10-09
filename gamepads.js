// https://github.com/360Controller/360Controller
var pads = navigator.getGamepads();
var controller = pads[0];
if (controller !== null){
	console.log(controller);
}else {
	console.log("no gamepad controllers found");
}
