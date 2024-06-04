let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        name : 'My love for you',
        music : 'yt1s.com - pov youre falling for them again and again desi edit audios.mp3'
    },


];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i&lt;6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate(&#039;#&#039;);
    let Color2 = populate(&#039;#&#039;);
    var angle = &#039;to right&#039;;

    let gradient = &#039;linear-gradient(&#039; + angle + &#039;,&#039; + Color1 + &#039;, &#039; + Color2 + &quot;)&quot;;
    document.body.style.background = gradient;
}


function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds &lt; 10) {currentSeconds = &quot;0&quot; + currentSeconds; }
        if(durationSeconds &lt; 10) { durationSeconds = &quot;0&quot; + durationSeconds; }
        if(currentMinutes &lt; 10) {currentMinutes = &quot;0&quot; + currentMinutes; }
        if(durationMinutes &lt; 10) { durationMinutes = &quot;0&quot; + durationMinutes; }

        curr_time.textContent = currentMinutes + &quot;:&quot; + currentSeconds;
        total_duration.textContent = durationMinutes + &quot;:&quot; + durationSeconds;
    }
}