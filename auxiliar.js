var video = document.getElementById("video");

var timeStarted = -1;
var timePlayed = 0;
var duration = 0;
// se a duração do video foi startada
if(video.readyState > 0)
  getDuration.call(video);
//se o dado fornecido pelo video esta no status atual
else
{
  video.addEventListener('loadedmetadata', getDuration);
}
// Iniciando o evento do player
function videoStartedPlaying() {
  timeStarted = new Date().getTime()/1000;
}
function videoStoppedPlaying(event) {
  // veririfica se o tempo decorrido e igual ao tempo necessario para ser exibido
  if(timeStarted>0) {
    var playedFor = new Date().getTime()/1000 - timeStarted;
    timeStarted = -1;
    // incremendo de time no timer
    timePlayed+=playedFor;
  }
  document.getElementById("played").innerHTML = Math.round(timePlayed)+"";
  // verifica valor no parametro final e muda o status
  if(timePlayed>=duration && event.type=="ended") {
    document.getElementById("status").className="complete";
  }
}

function getDuration() {
  duration = video.duration;
  document.getElementById("duration").appendChild(new Text(Math.round(duration)+""));
  console.log("Duration: ", duration);
}

video.addEventListener("play", videoStartedPlaying);
video.addEventListener("playing", videoStartedPlaying);

video.addEventListener("ended", videoStoppedPlaying);
video.addEventListener("pause", videoStoppedPlaying);