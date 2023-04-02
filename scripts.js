// Get the elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggleBtn = player.querySelector(".toggle");
const sliders = player.querySelectorAll(".player__slider");
const skipBtns = player.querySelectorAll("[data-skip]");
const fullscreenButton = player.querySelector(".player__button--fullscreen");

// Build functions
const playVideo = function (e) {
  video.paused ? video.play() : video.pause();
};

const updatetoggleBtn = function (e) {
  const iconUpdate = video.paused ? "►" : "❚ ❚";
  toggleBtn.textContent = iconUpdate;
};

const handlerSliders = function (e) {
  //   console.log(this.value);
  //   console.log(this.name);
  video[this.name] = this.value;
};

const handlerSkip = function (e) {
  video.currentTime += parseFloat(this.dataset.skip);
};

const handlerProgress = function (e) {
  const percent = (video.currentTime / video.duration) * 100;
  //   console.log(percent);
  progressBar.style.flexBasis = `${percent}%`;
};

const updateProgressBar = function (e) {
  //   console.log(e);
  const updatedTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = updatedTime;
};

const toggleFullscreen = function () {
  if (!document.fullscreenElement) {
    player.requestFullscreen();

    fullscreenButton.innerHTML = createMarkup("Exit Fullscreen", "compress");
  } else {
    document.exitFullscreen();

    fullscreenButton.innerHTML = createMarkup("Fullscreen", "expand");
  }
};

const createMarkup = function (title, icon) {
  return `
    <button class="player__button player__button--fullscreen" title="${title}">
        <i class="fas fa-${icon}"></i>
    </button>
    `;
};

// Add event handlers
video.addEventListener("click", playVideo);
video.addEventListener("click", updatetoggleBtn);
video.addEventListener("timeupdate", handlerProgress);
toggleBtn.addEventListener("click", playVideo);
toggleBtn.addEventListener("click", updatetoggleBtn);

sliders.forEach((slider) => slider.addEventListener("click", handlerSliders));
sliders.forEach((slider) =>
  slider.addEventListener("mousemove", handlerSliders)
);
skipBtns.forEach((skipBtn) => skipBtn.addEventListener("click", handlerSkip));

let mousedown = false;
progress.addEventListener("click", updateProgressBar);
progress.addEventListener(
  "mousemove",
  (e) => mousedown && updateProgressBar(e)
);
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

fullscreenButton.addEventListener("click", toggleFullscreen);
video.addEventListener("dblclick", toggleFullscreen);
