const apikey = '832d15161d88957'
const url = 'https://i.redd.it/q7qj7sxkasl21.jpg'
fetch(`https://api.ocr.space/parse/imageurl?apikey=${apikey}&url=${url}`)
    .then(res => res.json())
    .then(res => {
        let rg = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/gim
        let text = res.ParsedResults[0].ParsedText
        document.write(`match value: ${text}`)
    })