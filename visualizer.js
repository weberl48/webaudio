// Create a new instance of an audio object and adjust some of its properties
var audio = new Audio();
audio.src = 'music.mp3';
audio.controls = true;
audio.loop = true;
audio.autoplay = true;
// Establish all variables that your Analyser will use
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
// Initialize the MP3 player after the page loads all of its HTML into the window
window.addEventListener("load", initMp3Player, false);
function initMp3Player(){
	document.getElementById('audio_box').appendChild(audio);
	context = new webkitAudioContext(); // AudioContext object instance
	analyser = context.createAnalyser(); // AnalyserNode method
	canvas = document.getElementById('analyser_render');
	ctx = canvas.getContext('2d');
	// Re-route audio playback into the processing graph of the AudioContext
	source = context.createMediaElementSource(audio);
	source.connect(analyser);
	analyser.connect(context.destination);
	frameLooper();
}
// frameLooper() animates any style of graphics you wish to the audio frequency
// Looping at the default frame rate that the browser provides(approx. 60 FPS)
function frameLooper(){
	window.requestAnimationFrame(frameLooper);
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
	ctx.fillStyle = getRandomColor() // Color of the bars '#00CCFF';
	bars = 100;
	for (var i = 0; i < bars; i++) {
		bar_x = i * 3;
		bar_width = 2;
		// bar_height = -(fbc_array[i] / 2);
		//  fillRect( x, y, width, height ) // Explanation of the parameters below
		// ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
    for(var j = 0; j < analyser.frequencyBinCount; j++) {
    bar_height = fbc_array[j];
    // ctx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)'; //different shades of red
    ctx.fillStyle = getRandomColor();
    ctx.fillRect(bar_x,canvas.height-bar_height/2,bar_width,bar_height/2);

    bar_x += bar_width + 1;
  }
	}
}

    function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(color);
    return color;
}
