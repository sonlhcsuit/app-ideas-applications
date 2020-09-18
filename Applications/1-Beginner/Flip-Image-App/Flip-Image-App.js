let deg = 0
document.getElementById("clicker").addEventListener("click",()=>{
    document.getElementById("img").classList.remove(`rotate${deg}`)
    deg = (deg + 90)%360
    document.getElementById("img").classList.add(`rotate${deg}`)
})