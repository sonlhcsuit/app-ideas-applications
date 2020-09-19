let notes = [{
    id: '',
    time: '',
    // html: '',
    md: '# hello, markdown!'
}]
var converter = new showdown.Converter()
// var text = '# hello, markdown!'
// var html = converter.makeHtml(text);
// console.log(html)

function geneHTMLForNotes({ id, time, md }) {
    return ` <div id="pa${id}"class="border my-md-3 mx-md-auto" style="border-radius: 15px;width: 50%;height: 25%;">
                <div style="height: 20%;background-color: aqua;border-radius: 15px 15px 0px 0px;"
                    class="d-flex align-items-center bg">
                    <p class="m-md-0 ml-md-2 text-dark" style="font-style: italic;">${time}</p>
                    <span class="ml-auto fa fa-check fa-2x text-success"></span>
                    <span class="mx-md-2 fa fa-trash fa-2x text-danger"></span>
                </div>
                <div id="${id}" style="height: 80%" class="w-100 p-md-2" contenteditable>
                    ${converter.makeHtml(md)}
                </div>
            </div>`
}
function renderMD(event) {
    // switchTo('textarea', event.target.id)
    let id = event.target.id
    event.target.value = notes[id - 1].md
}
function UpdateMD(event) {
    let id = event.target.id
    let new_md = event.target.value
    notes[id - 1].md = new_md
    // switchTo('div', id)
}
function switchTo(type, id) {
    console.log('sw')
    if (type == 'textarea') {
        document.getElementById(id).parentNode.removeChild(document.getElementById(id))
        document.getElementById(`pa${id}`).insertAdjacentHTML('beforeend', `
        <textarea id="${id}" style="height: 80%;overflow-y: scroll;" class="w-100 p-md-2">${notes[id - 1].md}</textarea>
        `)
        // document.getElementById(id).addEventListener("focus", renderMD)
        document.getElementById(id).addEventListener("blur", (e)=>{
            UpdateMD(e)
            switchTo('div',id)
            console.log("blir")
        })
        return
    }
    if (type == 'div') {
        document.getElementById(id).parentNode.removeChild(document.getElementById(id))
        document.getElementById(`pa${id}`).insertAdjacentHTML('beforeend', `
        <div id="${id}" style="height: 80%;overflow-y: scroll;" class="w-100 p-md-2">${converter.makeHtml(notes[id - 1].md)}</div>
        `)
        document.getElementById(id).addEventListener("click", (e)=>{
            switchTo('textarea', id)
            // e.target.focus()
            console.log("click & focus")
        })
        return

    }
}
function init() {
    document.getElementById('add').addEventListener("click", () => {
        let note = {
            time: new Date(Date.now()).toLocaleDateString(),
            id: notes.length+1,
            md: ''
        }
        notes.push(note)
        document.getElementById("notes").insertAdjacentHTML("beforeend", geneHTMLForNotes(note))
        document.getElementById(note.id).addEventListener("click", ()=>{
            switchTo('div',note.id)
        })
    })
    document.getElementById('1').addEventListener("click", ()=>{
        switchTo('div',1)
    })

}
init()