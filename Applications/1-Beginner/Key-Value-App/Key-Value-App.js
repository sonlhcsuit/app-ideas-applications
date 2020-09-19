document.addEventListener("keydown",(event)=>{
    // console.log(event.key)
    render(event)
})
function render({key,location,which,code}){
    document.getElementById("big").innerHTML = key
    
    document.getElementById("key").innerHTML = key
    document.getElementById("location").innerHTML = location

    document.getElementById("which").innerHTML = which

    document.getElementById("code").innerHTML = code

}