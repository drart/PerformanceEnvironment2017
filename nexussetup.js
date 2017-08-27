nx.onload = function(){

	if(!nx.isTouchDevice){
            tilt1.canvas.hidden = true;
	};

	// set this up if myos?	
	multislider1.setNumberOfSliders(3);
	multislider1.canvas.hidden = true;

    document.getElementById("onoff").onclick = function(val){
        if (this.checked){
            thing1.play();
        }else{
            thing1.pause();
        }
    };
};
