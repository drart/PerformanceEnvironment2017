flock.init();

var as = flock.enviro.shared.audioSystem;

//http://alxgbsn.co.uk/wavepad/
// Create the new gain node and set some parameters on it.
var myAudioAnalyzer = as.context.createAnalyser();
// do I need this anymore?
//as.insertOutputNode(myAudioAnalyzer);

var animateSpectrum = function () {
    mySpectrum = requestAnimationFrame(animateSpectrum, document.getElementById('spectral'));
    drawSpectrum();
};

var drawSpectrum = function () {
    var canvas = document.getElementById('spectral'),
        ctx = canvas.getContext('2d'),
        //canvasSize = isSmallViewport ? 256 : 512,
        //multiplier = isSmallViewport ? 1 : 2,
        //width = canvasSize,
        //height = canvasSize,
        bar_width = 10,
        freqByteData,
        barCount,
        magnitude,
        i;

    //canvas.width = canvasSize - 10;
    //canvas.height = canvasSize - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#1d1c25';

    freqByteData = new Uint8Array(myAudioAnalyzer.frequencyBinCount);
    myAudioAnalyzer.getByteFrequencyData(freqByteData);
    barCount = Math.round(canvas.width / bar_width);

    for (i = 0; i < barCount; i += 1) {
        magnitude = freqByteData[i];
        // some values need adjusting to fit on the canvas
        ctx.fillRect(bar_width * i, canvas.height, bar_width - 1, -magnitude );
    }
}
/*
var synth = flock.synth({
    synthDef:{
        id: "moogy",
        ugen: "flock.ugen.filter.moog",
        source: {
            id: "testy",
            ugen: "flock.ugen.sin",
            mul: {
                id: "freqy",
                ugen: "flock.ugen.dust",
                density: 10,
                mul: 0.3,
                add: 0.5
            }
        },
        resonance: 10,
        cutoff: 1000,
    }
});

synth.pause();
*/
$('#onoff').on("change", function(){
    if ( $(this).prop('checked') ){
        //synth.play();
        animateSpectrum();
    }else{
        //synth.pause();
    }
});
