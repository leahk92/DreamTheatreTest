const mainHead = document.querySelector("#nav-menu");
// const logo = document.querySelector(".logo");
const headerTop = mainHead.querySelector(".hd_top");

window.addEventListener("scroll", function () {
   if (this.scrollY > 200) {
      mainHead.classList.add("slidedown");
      headerTop.hidden = true;
   } else {
      mainHead.classList.remove("slidedown");
      headerTop.hidden = false;
   }
});
