const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger = document.querySelector(".hamburger-img");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);

menuItems.forEach(
  function (menuItem) {
    menuItem.addEventListener("click", toggleMenu);
  }
)



// BUNMI's FAQ CODE

const contents = document.getElementsByClassName('content');
for (i = 0; i<contents.length; i++){
 let faqContent = contents[i];
 function openContent(){
this.classList.toggle('active');
}
faqContent.addEventListener('click', openContent)
}



// Linking the get started button with the registration page
$("#get-started-btn").on("click", () => {
  window.location.href = "/reg page/reg.html"
})

// Linking the signin link with the login page
$("#sign-in").on("click", () => {
  window.location.href = "/SignIn Page/login.html"
})

// BUNMI's FAQ CODE

// const openMenu = document.getElementById("answers")
// const openBtn = document.getElementById("open-btn")
// // const openFaq = document.querySelector(".open")
// // const closeMenu = document.getElementById("close")
// // const closeFaq = document.querySelector(".close")

// function openButton() {
//   openMenu.classList.add("open-answer")
  // ) {
  //   openBtn.classList.remove("close-btn")
  //   openMenu.classList.add("open-button")
  // }
// }

// function closeButton() {
//   openMenu.classList.remove("open-answer")
// }

// openBtn.addEventListener("click", toggleFaq)

// const btns = document.querySelectorAll(".btn")

// btns.forEach(btn => {
//   btn.addEventListener('click', () =>{

//   })
// })