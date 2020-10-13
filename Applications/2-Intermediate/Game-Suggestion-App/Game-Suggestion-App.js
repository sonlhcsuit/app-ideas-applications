function generateGame() {
    return `<div class="w-100 bg bg-primary" style="height: 90%;">
                <div class="w-100 text-light p-auto d-flex" style="height: 10%;">
                    <p style="display: block; width: fit-content; height: fit-content; " class="m-auto"> Some game</p>
                </div>
            </div>`
}
function generateVote({ id, value }) {
    return `<div class="input-group m-md-2" id="${id}">
                    <div class="input-group-prepend">
                        <div class="input-group-text">0</div>
                    </div>
                <input type="text" class="form-control" disabled value="${value}">
            </div>`
}

function init() {
    let votes = []
    document.addEventListener('keyup', function (e) {
        // console.log(e.key)
        if (e.key == 'Enter') {
            let value = document.getElementById('add').value
            document.getElementById('add').value = ''
            if (value != '') {
                document.getElementById('form').insertAdjacentHTML("afterbegin", generateVote({ id: votes.length , value }))
                
            }
            votes.push(value)

        }
    })
    document.getElementById('start').addEventListener('click', function () {
        this.classList.toggle('is-valid')
        for(let i = 0;i<votes.length;i++){
            document.getElementById(`${i}`).addEventListener("click",function(){
                let ct = this.firstElementChild.firstElementChild.innerHTML
                ct = parseInt(ct)
                ct++
                this.firstElementChild.firstElementChild.innerHTML = ct
            })
        }
    })
}
window.onload = init