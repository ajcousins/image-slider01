const menuButton = document.querySelector(".menuButton");
const menu = document.querySelector(".menu");

menuButton.addEventListener("click", () => {
  menuButton.classList.toggle("clicked");
  menu.classList.toggle("visible");
});

// Image Slider

// Buttons

const buttons = {
  btnNext: document.querySelector(".next"),
  btnPrev: document.querySelector(".prev"),
  addListeners() {
    this.btnNext.addEventListener("click", () => {
      carousel.moveToNextSlide();
      timerObj.resetTimer();
    });
    this.btnPrev.addEventListener("click", () => {
      carousel.moveToPrevSlide();
      timerObj.resetTimer();
    });
  },
};
buttons.addListeners();

const carousel = {
  carouselSlide: document.querySelector(".carousel-slide"),
  images: document.querySelectorAll(".slides"),
  imgWidth: 800,
  currentImg: 1,
  xCoord: 0,
  moveToNextSlide() {
    if (this.currentImg > this.images.length - 2) return;
    this.carouselSlide.classList.add("moveAnimation");
    this.currentImg += 1;
    this.carouselSlide.addEventListener("transitionend", () => {
      if (this.currentImg === this.images.length - 1) this.setToStart();
    });
    this.xCoord = this.imgWidth * this.currentImg;
    this.carouselSlide.style.transform = `translateX(-${this.xCoord}px)`;
    radioButtonsObj.updateRadioButtons(this.currentImg);
  },
  moveToPrevSlide() {
    if (this.currentImg < 1) return;
    this.carouselSlide.classList.add("moveAnimation");
    this.currentImg -= 1;
    this.carouselSlide.addEventListener("transitionend", () => {
      if (this.currentImg === 0) this.setToEnd();
    });
    this.xCoord = this.imgWidth * this.currentImg;
    this.carouselSlide.style.transform = `translateX(-${this.xCoord}px)`;
    radioButtonsObj.updateRadioButtons(this.currentImg);
  },
  setToEnd() {
    this.currentImg = this.images.length - 2;
    this.xCoord = this.imgWidth * this.currentImg;
    this.carouselSlide.classList.remove("moveAnimation");
    this.carouselSlide.style.transform = `translateX(-${this.xCoord}px)`;
  },
  setToStart() {
    this.currentImg = 1;
    this.xCoord = this.imgWidth * this.currentImg;
    this.carouselSlide.classList.remove("moveAnimation");
    this.carouselSlide.style.transform = `translateX(-${this.xCoord}px)`;
  },
  moveToImg(index) {
    this.currentImg = index + 1;
    this.xCoord = this.imgWidth * this.currentImg;
    this.carouselSlide.style.transform = `translateX(-${this.xCoord}px)`;
    //radioButtonsObj.updateRadioButtons(this.currentImg);
  },
};
// Set initial image to second:
carousel.carouselSlide.style.transform = `translateX(-${carousel.imgWidth}px)`;

const radioButtonsObj = {
  radioButtons: Array.from(document.querySelectorAll(".radioBtn")),
  addListeners() {
    for (let i = 0; i < this.radioButtons.length; i++) {
      this.radioButtons[i].addEventListener("click", () => {
        this.removeActiveBtns();
        this.radioButtons[i].classList.add("checked");
        carousel.moveToImg(i);
        timerObj.resetTimer();
      });
    }
  },
  removeActiveBtns() {
    for (button of this.radioButtons) {
      button.classList.remove("checked");
    }
  },
  updateRadioButtons(index) {
    let i = index - 1;
    if (i < 0) i = this.radioButtons.length - 1;
    if (i > this.radioButtons.length - 1) i = 0;
    this.removeActiveBtns();
    this.radioButtons[i].classList.add("checked");
  },
};
radioButtonsObj.addListeners();

const timerObj = {
  waitTime: 5000,
  clock: 0,
  timer() {
    let counter = 0;
    this.clock = setInterval(() => {
      counter++;
      carousel.moveToNextSlide();
    }, this.waitTime);
  },
  resetTimer() {
    clearInterval(this.clock);
    this.timer();
  },
};
timerObj.timer();
