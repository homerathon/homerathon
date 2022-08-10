let paramString = document.URL.split('?')[1];
let queryString = new URLSearchParams(paramString);
var year = "2021"
for (let pair of queryString.entries()) {
  //ok so i'm lazy, sue me
   if(pair[0]==="year" && (
     pair[1] == 2020 ||
     pair[1] == 2021 ||
     pair[1] == 2022
   )) {
     year=pair[1];
   }
}



// code from the Youtube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player, instantiated=0, seconds = 0, ready=false;
function onYouTubeIframeAPIReady() {
  ready=true;
}

function onPlayerReady(event) {
  player.setVolume(100);
}

// code for scrolling images
var scroll = 0;

function prev(){
  var primaStyle = document.getElementsByClassName("prima")[0].style.marginLeft;
  if(scroll<=0){}
  else {
    scroll--;
    document.getElementsByClassName("prima")[0].style.marginLeft = `${-(scroll*32.2)+3.1}vw`
  }
}

function next(){
  var primaStyle = document.getElementsByClassName("prima")[0].style.marginLeft;
  var last = document.getElementsByClassName("item");
  last = last[last.length-1];
  if(last.offsetLeft+last.offsetWidth<document.body.offsetWidth){}
  else {
    scroll++;
    document.getElementsByClassName("prima")[0].style.marginLeft = `${-(scroll*32.2)+3.1}vw`
  }
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
    title.syle.fontSize = db.titlesize + "vw";
    title.syle.lineHeight = (db.titlesize-.5) + "vw";


    //load player
    if(ready) {
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
    else {
       onYouTubeIframeAPIReady=function(){
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
      if(i == 0) element.classList.add("prima");

      var link = document.createElement("button");
      link.seektime = db.values[i].time;
      link.onclick=function(){seek(this.seektime);}
      element.appendChild(link);

      var img = document.createElement("img");
      img.src = `assets/assets-${year}/pic${i}.png`;
      img.alt = db.values[i].alt;
      link.appendChild(img);

      root.insertBefore(element, button);
    }
  }
  xhttp.open("GET", `assets/${year}.json`);
  xhttp.send();

}
