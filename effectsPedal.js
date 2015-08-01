var ctx = new AudioContext();
var dest = ctx.destionation;
var osc = ctx.createOscillator();
var source = ctx.createBufferSource();
decode("music.mp3",decodedBuffer => {
  source.buffer = decodedBuffer;
  source.connect(ctx.destination);
  source.start(0);
});
//connecting nodes
osc.connect(gain);
gain.connect(dest);
osc.start(0);

//source node form importing audio files
function getBuffer (url,callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET",url,true);
  xhr.responsetype = 'arraybuffer';
  xhr.onload = function () {
    callback(xhr.respnose);
  };
  xhr.send();
}
//decoding audio data
function decode (url,cb) {
  getBuffer(url, function (buffer){
    ctx.decodeAudioData(buffer,cb);
  });
}

var a = ctx.createAnalyser();
a.fftSize = 512;
// a.frequencyBinCount == 256
var freq = new Uint8Array(256);
//every 20ms pass in byte array
setInterval(function() {
  a.getByteFrequencyData(freq);
}, 20);

var BUFFER_SIZE = 2048;
var p = ctx.creatScriptProcessor(
  BUFFER_SIZE
);
p.onaudioprocess = function(e) {

};
