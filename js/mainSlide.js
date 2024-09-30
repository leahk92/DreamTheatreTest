$(function () {
   // let slides = $('.slide');
   // let indicators = $('.indicators li');
   let slides = $(".slide"),
      indicators = $(".indicators li"),
      activeSlideIndex = 0;

   slides.eq(activeSlideIndex).addClass("active");
   indicators.eq(activeSlideIndex).addClass("active");

   indicators.click(function () {
      let index = $(this).index();
      activeSlideIndex = index;
      updateSlide();
   });

   function updateSlide() {
      slides.removeClass("active");
      indicators.removeClass("active");
      slides.eq(activeSlideIndex).addClass("active");
      indicators.eq(activeSlideIndex).addClass("active");
   }
});

var slides = document.querySelectorAll(".slide");
var btns = document.querySelectorAll(".indicator");
let currentSlide = 1;

// var manualNav = function (manual) {
//    slides.forEach((slide) => {
//       slide.classList.remove("active");
//       btns.forEach((btn) => {
//          btn.classList.remove("active");
//       });
//    });
//    slides[manual].classList.add("active");
//    btns[manual].classList.add("active");
// };
// btns.forEach((btn, i) => {
//    btn.addEventListener("click", () => {
//       manualNav(i);
//       currentSlide = 1;
//    });
// });

// 슬라이드 자동 넘김
var repeat = function (activeClass) {
   let active = document.getElementsByClassName("active");
   let i = 1;

   var repeater = () => {
      setTimeout(function () {
         [...active].forEach((activeSlide) => {
            activeSlide.classList.remove("active");
         });
         slides[i].classList.add("active");
         btns[i].classList.add("active");
         i++;

         if (slides.length == i) {
            i = 0;
         }
         if (i >= slides.length) {
            return;
         }
         repeater();
      }, 5000);
   };
   repeater();
};
repeat();
