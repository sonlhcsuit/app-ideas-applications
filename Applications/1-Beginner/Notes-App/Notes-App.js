let notes = [{
    id: '',
    time: '',
    contetn: ''
}]

function geneHTMLForNotes({ id, time, HTMLcontent }) {
    return `<div class="border my-md-3" style="border-radius: 15px;width: 50%;height: 25%;">
            <div style="height: 10%;background-color: aqua;border-radius: 15px 15px 0px 0px;"
                class="d-flex align-items-center bg">
                <p class="m-md-0 ml-md-2 text-light" style="font-style: italic;">${time}</p>
                <span class="ml-auto fa fa-check fa-2x text-success"></span>
                <span class="mx-md-2 fa fa-trash fa-2x text-danger"></span>
            </div>
            <div id="${id}" style="height: 90%;overflow: auto;" class="w-100 p-md-2" contenteditable>
                ${HTMLcontent}
            </div>
        </div>`
}
function init(){
    document.getElementById('add').addEventListener("click",()=>{
        let note = {
            time: new Date(Date.now()).toISOString(),
            id:notes.length,
            content:''
        }
        document.getElementById("notes").insertAdjacentHTML("beforeend",geneHTMLForNotes(note))
    })
}
init()
var converter = new showdown.Converter()
var text = '# hello, markdown!'
var html = converter.makeHtml(text);
console.log(html)