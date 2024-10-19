const wrapper = document.querySelector(".wrapper"),
  musicImg = wrapper.querySelector(".img-area img"),
  musicName = wrapper.querySelector(".song-details .name"),
  musicArtist = wrapper.querySelector(".song-details .artist"),
  playPauseBtn = wrapper.querySelector(".play-pause"),
  prevBtn = wrapper.querySelector("#prev"),
  nextBtn = wrapper.querySelector("#next"),
  mainAudio = wrapper.querySelector("#main-audio"),
  progressArea = wrapper.querySelector(".progress-area"),
  progressBar = progressArea.querySelector(".progress-bar"),
  musicList = wrapper.querySelector(".music-list"),
  moreMusicBtn = wrapper.querySelector("#more-music"),
  closemoreMusic = musicList.querySelector("#close");

let musicIndex = Math.floor(Math.random() * allMusic.length + 1);
isMusicPaused = true;

window.addEventListener("load", () => {
  loadMusic(musicIndex);
  playingSong();
});

function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `images/${allMusic[indexNumb - 1].src}.jpg`;
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

//função de tocar a música
function playMusic() {
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

//Função para pausar a música
function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play-arrow";
  mainAudio.pause();
}

//Função para ir a música anterior
function prevMusic() {
  musicIndex--;
  musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}

//Função para avançar a próxima musica
function nextMusic() {
  musicIndex++;
  musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}

//Adiciona um ouvinte de evento para o botão de play/pause
playPauseBtn.addEventListener("click", () => {
  const isMusicPlay = wrapper.classList.contains("paused");
  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
});

//Adiciona um ouvinte de eventos para o botão de música anterior
prevBtn.addEventListener("click", () => {
  prevMusic();
});

//Adiciona um ouvinte de eventos para o botão de próxima música
nextBtn.addEventListener("click", () => {
  nextMusic();
});

/*Adicionar um ouvinte de um evento para o elemento de audio pricipal 
para atualizar o progresso da musica*/
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth} % `;

  let musicCurrentTime = wrapper.querySelector(".current-time"), muiscDuration = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", () => {
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);

    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    muiscDuration.innerText = `${totalMin} : ${totalSec}`;
  });

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);

  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }

  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});
/*Atualiza o tempo da musica atual de acordo com a largura da barra de progresso ao clicar nela*/
progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = mainAudio.duration;

  mainAudio.currentTime = (clickedOffsetX / progressWidth) + songDuration;
  playMusic();
  playingSong();
});

//Troca icone de loop, shuffle e repeat ao clicar no botão correspondente  
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
  let getText = repeatBtn.innerText;

  switch (getText) {
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "PlayBack shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
})
