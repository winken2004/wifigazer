		// 2. This code loads the IFrame Player API code asynchronously.
		var tag = document.createElement('script');
		
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		
		// 3. This function creates an <iframe> (and YouTube player)
		//    after the API code downloads.
		var player;
		
		function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '200',
          width: '200',
          videoId: '7OS3z2Hs5I0',
		  playerVars: {
		    autohide: 0,
            controls: 1,
            disablekb: 1,
			fs: 1,
			allowfullscreen: 1
			},
		  events: {
            'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
          }
        });
		}
		
		// 4. The API will call this function when the video player is ready.
		function onPlayerReady(event) {
			//null 
		}
		
		function onPlayerStateChange(event) {
			//null
		}
		function play() {
          if (player) {
            player.playVideo();
          }
        }
		function pause() {
          if (player) {
            player.pauseVideo();
          }
		function load(){//cant use omfg!! call it directly
		  if(player) {
		    player.loadVideoById("IIdmUqUzrxo");
			}
		  }
        }