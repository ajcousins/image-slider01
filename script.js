console.log("test");

const menuButton = document.querySelector(".menuButton");
const menu = document.querySelector(".menu");

menuButton.addEventListener("click", () => {
  menuButton.classList.toggle("clicked");
  menu.classList.toggle("visible");
});

// Image Slider

const images = [
  "Images/Fili-2016_(113).JPG",
  "Images/Fili-2016_(144).JPG",
  "Images/Fili-2016_(173).JPG",
  "Images/IMG_0219.JPG",
];

const btnNext = document.querySelector(".next");
btnNext.addEventListener("click", () => {
  console.log("Next");
});

const btnPrev = document.querySelector(".prev");
btnPrev.addEventListener("click", () => {
  console.log("Prev");
});
