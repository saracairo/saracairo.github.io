const closedFace = document.querySelector(".closed");
const openFace = document.querySelector(".open");

closedFace.addEventListener("click", () => {
  if (openFace.classList.contains("open")) {
    openFace.classList.add("active");
    closedFace.classList.remove("active");
  }
});
// (se openFace contiene la classe "open" risulta vero, aggiungi a openFace la classe "active" e toglila a closedFace)

openFace.addEventListener("click", () => {
  if (closedFace.classList.contains("closed")) {
    closedFace.classList.add("active");
    openFace.classList.remove("active");
  }
});