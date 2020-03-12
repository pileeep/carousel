const slider = document.querySelector(".slider");
const buttons = document.querySelectorAll(".btn");
const options = document.querySelectorAll(".option");
const slides = document.querySelectorAll(".img");
const backgrounds = document.querySelectorAll(".bg");
var index = 1;
var op_index = 0;
var size = slides[index].clientWidth;

update();
autoSlide();
function update() {
  slider.style.transform = "translateX(" + -size * index + "px)";
  options.forEach(op => op.classList.remove("colored"));
  options[op_index].classList.add("colored");
  slides.forEach(img => img.classList.remove("active"));
  slides[op_index + 1].classList.add("active");
  backgrounds.forEach(bg => bg.classList.remove("show"));
  backgrounds[op_index].classList.add("show");
}
function slide() {
  slider.style.transition = "transform .5s ease-in-out";
  update();
}
function btnCheck() {
  if (this.id === "prev") {
    index--;
    if (op_index == 0) {
      op_index = 7;
    } else {
      op_index--;
    }
  } else if (this.id === "next") {
    index++;
    if (op_index == 7) {
      op_index = 0;
    } else {
      op_index++;
    }
  }
  slide();
}
function autoSlide() {
  index++;
  if (op_index == 7) {
    op_index = 0;
  } else {
    op_index++;
  }
  slide();
  setTimeout(autoSlide, 3000);
}
function optionSlide() {
  let i = Number(this.getAttribute("option-index"));
  index = i + 1;
  op_index = i;
  counter = 0;
  slide();
}
slider.addEventListener("transitionend", () => {
  if (slides[index].id === "last") {
    slider.style.transition = "none";
    index = slides.length - 2;
    update();
  } else if (slides[index].id === "first") {
    slider.style.transition = "none";
    index = 1;
    update();
  }
});
buttons.forEach(btn => btn.addEventListener("click", btnCheck));
options.forEach(option => option.addEventListener("click", optionSlide));
