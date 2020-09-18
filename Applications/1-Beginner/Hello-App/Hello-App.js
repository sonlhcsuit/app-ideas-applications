let mail = "example@gmail.com"
let pass = 'example'
function fillData() {
    document.getElementById('mail').value = mail
    document.getElementById('pass').value = pass
}
function init() {
    fillData()
    document.getElementById('btn').addEventListener("click", () => {
        if (document.getElementById('mail').value == mail && document.getElementById('pass').value == pass) {
            renderHello()
        }
    })
}
function renderHello(){
    return fetch('https://www.cloudflare.com/cdn-cgi/trace')
    .then(res => res.text())
    .then(data => {
        return data.split("\n").filter(val => /^ip\=[\d\.]+$/gi.test(val))
    })
    . then(ip => {
        ip = ip.join('').split('=')[1]
        return fetch(`https://fourtonfish.com/hellosalut/?ip=${ip}`)
        .then(data=>data.json())
        .then((data)=>{
            document.getElementById('hi').innerHTML = `${data.hello} my love!`
            alert(`${data.hello} my love!`)
        })
    })
}
init()
