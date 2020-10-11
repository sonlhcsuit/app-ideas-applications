const apiKey = '21f0308b8d69a931212b'
let compact = 1
function generateCompact(from, to) {
    return fetch(`https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=${apiKey}`)
        .then(res => res.json())
        .then(res => {
            compact = res[`${from}_${to}`]

        })
}
function updateCompact() {
    let from = document.getElementById('from').value
    let to = document.getElementById('to').value
    generateCompact(from, to)
}

window.onload = () => {
    document.getElementById('from').addEventListener('change', updateCompact)
    document.getElementById('to').addEventListener('change', updateCompact)

    document.getElementById('innum').addEventListener('input', function () {
        let val = parseFloat(this.value)
        document.getElementById('num').innerHTML = val ? val*compact :'Where magic happens'
    })


    fetch('https://free.currconv.com/api/v7/currencies?apiKey=do-not-use-this-key')
        .then(res => res.json())
        .then(res => {
            let curs = res.results
            let data = []
            for (let curr in res.results) {
                data.push(curs[curr])
            }
            // console.log(data)
            data = data.map(val => {
                return `<option>${val.id}</option>`
            }).join('')
            document.getElementById('from').insertAdjacentHTML('beforeend', data)
            document.getElementById('to').insertAdjacentHTML('beforeend', data)

        })
}