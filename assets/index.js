let paramString = document.URL.split('?')[1];
let queryString = new URLSearchParams(paramString);
var year = "2021"
for (let pair of queryString.entries()) {
   if(pair[0]==="year") {
     year=pair[1];
   }
}



// code from the Youtube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player, instantiated=0, seconds = 0;
function onPlayerReady(event) {
  player.setVolume(100);
}

// code for scrolling images
var scroll = 0;

function prev(){
  if(scroll==0){
    scroll = 5;}
  else {
    scroll = scroll-1;}
}

function next(){
  if(scroll==5){
    scroll = 0;}
  else {
    scroll = scroll+1;}
}

// code for skipping to time
function seek(sec){
  if(player){
    seconds = sec;
    player.seekTo(seconds, true);
  }
}
function tileGen(){
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    var db = JSON.parse(this.responseText)

    //load title
    var title = document.getElementsByClassName("title")[0].children[0];
    title.innerHTML=db.title;

    //load player
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: db.videoID,
        playerVars: {rel:0, modestbranding:1, fs:0, autoplay:0},
        events: {
          'onReady': onPlayerReady
        }
      });
    }
    //load content
    var content = document.getElementsByClassName("text")[0].children[0];
    for(pg in db.description) {
      content.innerHTML += db.description[pg] + "<br><br>";
    }

    //load chapters
    var root = document.getElementsByClassName("wrapper")[0].children[0];
    var button = document.getElementsByClassName("right-arrow")[0];
    for( i in db.values) {
      var element = document.createElement("div");
      element.classList.add("item");

      var link = document.createElement("a");
      link.onclick=`seek(${db.values[i].time})`
      element.appendChild(link);

      var img = document.createElement("img");
      img.src = `assets/21thium/pic${i}.png`;
      img.alt = db.values[i].alt;
      link.appendChild(img);

      root.insertBefore(element, button);
    }
  }
  xhttp.open("GET", `assets/${year}.json`);
  xhttp.send();

}
