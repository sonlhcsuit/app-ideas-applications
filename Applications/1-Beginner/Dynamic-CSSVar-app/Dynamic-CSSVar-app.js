let username = 'testuser'
let password = 'mypassword'
function init() {
    document.getElementById("usr").addEventListener("input", (event) => {
        if (event.target.value.includes(" ")) {
            event.target.classList.add("bg-warning")
            event.target.classList.add("text-light")
        } else {
            event.target.classList.remove("bg-warning")
            event.target.classList.remove("text-light")
        }
    })
    document.getElementById("pas").addEventListener("input", (event) => {
        if (event.target.value.includes(" ")) {
            event.target.classList.add("bg-warning")
            event.target.classList.add("text-light")
        } else {
            event.target.classList.remove("bg-warning")
            event.target.classList.remove("text-light")
        }
    })
    document.getElementById("can").addEventListener("click",()=>{
        document.getElementById("pas").value = ''
        document.getElementById("pas").classList.remove("bg-warning")
        document.getElementById("pas").classList.remove("bg-danger")

        document.getElementById("pas").classList.remove("text-light")
        
        document.getElementById("usr").value = ''
        document.getElementById("usr").classList.remove("bg-warning")
        document.getElementById("usr").classList.remove("bg-danger")

        document.getElementById("usr").classList.remove("text-light")

    })
    document.getElementById("log").addEventListener("click",(e)=>{
        let usr = document.getElementById("usr")
        let pas = document.getElementById("pas")
        if(usr.value != username){
            usr.classList.remove("bg-warning")
            usr.classList.add("bg-danger")
            usr.classList.add("text-light")

        }else{
            usr.classList.remove("bg-danger")
            pas.classList.remove("text-light")

        }
        if(pas.value != password){
            pas.classList.remove("bg-warning")
            pas.classList.add("bg-danger")
            pas.classList.add("text-light")

        }else{
            pas.classList.remove("text-light")

            pas.classList.remove("bg-danger")
        }
    })
}
init()