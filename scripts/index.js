const buttonSerach = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

buttonSerach.addEventListener( "click", () => {
    modal.classList.toggle("hide")
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
} )