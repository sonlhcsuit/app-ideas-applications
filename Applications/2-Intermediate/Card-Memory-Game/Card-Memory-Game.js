let selected = []
let data = []
const pokemon = (id) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(res => {
            return res.sprites.other.dream_world.front_default
        })
}
const generateCard = ({ image, id }) => {
    return `<div class="flip-card col-md-3 h-25" id="${id}" >
                <div class="flip-card-inner" >
                    <div class="flip-card-front">
                        <img class="w-100 h-100"src="https://upload.wikimedia.org/wikipedia/en/3/3b/Pokemon_Trading_Card_Game_cardback.jpg" alt="Avatar">
                    </div>
                    <div class="flip-card-back">
                        <img class="w-100 h-100" src="${image}"
                            alt="Avatar" style="width:300px;height:300px;">
                    </div>
                </div>
            </div>`
}
// document.getElementById('').firstElementChild
function select() {
    this.firstElementChild.classList.toggle('flip')
    if (selected.indexOf(this.id) == -1) { // not exists
        selected.push(this.id)
    } else { // exists
        if (selected.indexOf(this.id) == 0) {
            selected.shift()
        } else {
            selected.pop()
        }
    }
    console.log(selected)
    if (selected.length == 2) {
        console.log(data)
        isMatch()
    }
}
function isMatch() {
    setTimeout(() => {
        if (data[selected[0]] == data[selected[1]]) {
            document.getElementById(selected[0]).removeEventListener("click", select)
            document.getElementById(selected[1]).removeEventListener("click", select)
            document.getElementById(selected[0]).firstElementChild.firstElementChild.firstElementChild.src = 'https://www.clipartmax.com/png/middle/454-4547746_checkered-flag-icon-clipart-auto-racing-racing-flags-finish-flag-icon-png.png'
            document.getElementById(selected[1]).firstElementChild.firstElementChild.firstElementChild.src = 'https://www.clipartmax.com/png/middle/454-4547746_checkered-flag-icon-clipart-auto-racing-racing-flags-finish-flag-icon-png.png'
            console.log('match')
        }
        document.getElementById(selected[0]).firstElementChild.classList.toggle('flip')
        document.getElementById(selected[1]).firstElementChild.classList.toggle('flip')
        selected = []
        // console.log('flipped')
        // console.log(selected)
    }, 600)
}
function generateData(threshold) {
    let data = []
    for (let i = 0; i < Math.floor(threshold / 2); i++) {
        let val = Math.floor((1 + Math.random() * 600))
        data.push(val)
        data.push(val)
    }
    return data.sort(() => {
        return .5 - Math.random()
    })
}


let a = document.getElementById('card')
const init = () => {
    data = generateData(16)
    promised_ = data.map(pokemon)
    Promise.all(promised_).then(pokes => {
        return pokes.map((val, index) => {
            return {
                image: val,
                id: index
            }
        })
    })
        .then(pokes => {
            document.getElementById('block').insertAdjacentHTML("beforeend", pokes.map(generateCard).join(''))
            const cards = document.querySelectorAll('.flip-card')
            cards.forEach(card => {
                card.addEventListener("click", select)
            })
        })
    // console.log(data)
    // const cards = document.querySelectorAll('.flip-card')
    // cards.forEach(card => {
    //     card.addEventListener("click", select)
    // })
}
init()