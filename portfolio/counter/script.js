//  impostazioni counter

let counterNumber = document.querySelector(".counter-number");
let decriment = document.getElementById("decriment-button");
let incriment = document.getElementById("incriment-button");
let restart = document.getElementById("restart-button")

let count = 0;

incriment.addEventListener("click", () => {
  count++;
  counterNumber.innerText = count;
});

decriment.addEventListener("click", () => {
  count--;
  if (count < 0) {
    count = 0;
  }
  counterNumber.innerText = count;
});

restart.addEventListener("click", () => {
  count = 0;
  counterNumber.innerHTML = count;
});



//  funzioni cambio colore

document.querySelector(".settings-button").onclick = () => {
  document.querySelector(".color-switcher").classList.toggle("active");
};

let themeButton = document.querySelectorAll(".theme-button");

themeButton.forEach(color => {
  color.addEventListener("click", () => {
    let dataColor = color.getAttribute("data-color");
    document.querySelector(":root").style.setProperty("--main-color", dataColor);
  })
})