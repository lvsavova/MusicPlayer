function Player()
{
	var AudioContext = window.AudioContext || window.webkitAudioContext;
	this.audiocon = new AudioContext();
	this.gainNode = this.audiocon.createGain();
	this.gainNode.connect(this.audiocon.destination);
	this.bufferSource;
	this.gainNode.value = 50;
	
	this.bIsLoading = false;
	
	this.CloseBufferSource = function name(params) {
		
	}
	
	this.PlayerSetSource = function(src)
	{	
		var request = new XMLHttpRequest();
		request.open('GET', src, true);
		request.responseType = 'arraybuffer';

		thisClojure = this;	
		request.onload = function()
		{
			thisClojure.audiocon.decodeAudioData(
				request.response, 
				
				function(srcData)
				{
					thisClojure.bufferSource = thisClojure.audiocon.createBufferSource();
					thisClojure.bufferSource.buffer = srcData;
					thisClojure.bufferSource.connect(thisClojure.audiocon.destination);
					thisClojure.PlayerTogglePlay();
					
				},
				function() { alert("AudioContext SetSource Failed!") }
			);
		}

		request.send();
	}
	
	this.OnBufferLoaded = function() {
		
	}
	
	this.PlayerTogglePlay = function()
	{
		if(this.bufferSource)
			this.bufferSource.start(0);
	}
	
	
}