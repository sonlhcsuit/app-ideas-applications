window.onload = function () {
    document.addEventListener('keyup', function (event) {
        console.log(event.key)
        let value = document.getElementById('inp').value
        let size = 150
        if (event.key == 'Enter') {
            console.log(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${value}`)
            document.getElementById('out').src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${value}`
        }
        event.preventDefault()

    })
}