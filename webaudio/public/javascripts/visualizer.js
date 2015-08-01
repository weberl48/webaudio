var input = document.getElementById('search');
var searchButton = document.getElementById('search-button');
var resultSection = document.getElementsByClassName('results');
searchButton.addEventListener('click', function () {
  resultSection[0].innerHTML = '';
  // search for artist based off of user input and get artist spotify id for api call
  var searchXhr = new XMLHttpRequest();
  searchXhr.open('GET', 'http://ws.spotify.com/search/1/artist.json?q=' + input.value, false);
  searchXhr.send(null);
  var parsedObj = JSON.parse(searchXhr.responseText);
  var artistId = parsedObj.artists[0].href;
  var artistName = parsedObj.artists[0].name;
  console.log(parsedObj);
  // console.log(artistId);
  // console.log(artistName);
  var artistIdParam = artistId.split(':')[2];
  //api call with artists information
  var apiXhr = new XMLHttpRequest();
  apiXhr.open('GET', 'https://api.spotify.com/v1/artists/' + artistIdParam + '/albums?album_type=album', false);
  apiXhr.send(null);
  var parsedApiObj = JSON.parse(apiXhr.responseText);
  console.log(parsedApiObj);
  var coverArtArray = [];
  var albumId = [];
  for (var i = 0; i < parsedApiObj.items.length; i++) {
    coverArtArray.push(parsedApiObj.items[i].images[1].url);
    albumId.push(parsedApiObj.items[i].id);
  }
  for (var i = 0; i < coverArtArray.length; i++) {
    var img = document.createElement('img');
    img.className = 'album'
    resultSection[0].appendChild(img);
    img.src = coverArtArray[i];
  }



  //click listener for albums
  //this section is borken needs to be fixed!!!!!!!!!!!!!!!
  var albumImages = document.getElementsByClassName('album');
  for (var i = 0; i < albumImages.length; i++) {
    albumImages[i].addEventListener('click', function () {
      var trackXhr = new XMLHttpRequest();
      // trackXhr.open('GET', 'https://api.spotify.com/v1/albums/' + albumId[i], false);
      trackXhr.open('GET', 'https://api.spotify.com/v1/tracks/3SWZ9fHtWMxwkFok5qhhpO' , false);
      // trackXhr.setRequestHeader('Access-Control-Allow-Origin','https://api.spotify.com');
      trackXhr.send(null);
      var parsedTrackObj = JSON.parse(trackXhr.responseText);
      console.log(parsedTrackObj.preview_url);
      var audio = new Audio();
      console.log(parsedTrackObj);
      audio.controls = true;
      audio.loop = true;
      audio.autoplay = false;
      // audio.crossorigin="anonymous";
      audio.src = parsedTrackObj.preview_url;
      initMp3Player();
      function initMp3Player(){
        console.log('started');
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

    });
  }
});
// var track = new XMLHttpRequest();
// track.open('GET', 'https://api.spotify.com/v1/tracks/3SWZ9fHtWMxwkFok5qhhpO' , false);
// track.send(null);
//   var parsedTrack = JSON.parse(track.responseText);
  // Create a new instance of an audio object and adjust some of its properties

  // audio.play();
  // Establish all variables that your Analyser will use
  var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
  // Initialize the MP3 player after the page loads all of its HTML into the window
  // var album = document.getElementsByClassName('album');
  // console.log(album);
  // album.addEventListener("click", initMp3Player, false);

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



  // // Create a new instance of an audio object and adjust some of its properties
  // var audio = new Audio();
  // audio.src = ' images/music.mp3';
  // audio.controls = true;
  // audio.loop = true;
  // audio.autoplay = true;
  // // Establish all variables that your Analyser will use
  // var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
  // // Initialize the MP3 player after the page loads all of its HTML into the window
  // window.addEventListener("load", initMp3Player, false);
  // function initMp3Player(){
  // 	document.getElementById('audio_box').appendChild(audio);
  // 	context = new webkitAudioContext(); // AudioContext object instance
  // 	analyser = context.createAnalyser(); // AnalyserNode method
  // 	canvas = document.getElementById('analyser_render');
  // 	ctx = canvas.getContext('2d');
  // 	// Re-route audio playback into the processing graph of the AudioContext
  // 	source = context.createMediaElementSource(audio);
  // 	source.connect(analyser);
  // 	analyser.connect(context.destination);
  // 	frameLooper();
  // }
  // // frameLooper() animates any style of graphics you wish to the audio frequency
  // // Looping at the default frame rate that the browser provides(approx. 60 FPS)
  // function frameLooper(){
  // 	window.requestAnimationFrame(frameLooper);
  // 	fbc_array = new Uint8Array(analyser.frequencyBinCount);
  // 	analyser.getByteFrequencyData(fbc_array);
  // 	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  // 	ctx.fillStyle = getRandomColor() // Color of the bars '#00CCFF';
  // 	bars = 100;
  // 	for (var i = 0; i < bars; i++) {
  // 		bar_x = i * 3;
  // 		bar_width = 2;
  // 		// bar_height = -(fbc_array[i] / 2);
  // 		//  fillRect( x, y, width, height ) // Explanation of the parameters below
  // 		// ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
  //     for(var i = 0; i < analyser.frequencyBinCount; i++) {
  //     bar_height = fbc_array[i];
  //     // ctx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)'; //different shades of red
  //     ctx.fillStyle = getRandomColor();
  //     ctx.fillRect(bar_x,canvas.height-bar_height/2,bar_width,bar_height/2);
  //
  //     bar_x += bar_width + 1;
  //   }
  // 	}
  // }
  //
  //     function getRandomColor() {
  //     var letters = '0123456789ABCDEF'.split('');
  //     var color = '#';
  //     for (var i = 0; i < 6; i++ ) {
  //         color += letters[Math.floor(Math.random() * 16)];
  //     }
  //     console.log(color);
  //     return color;
  // }
