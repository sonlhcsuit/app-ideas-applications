function encrypt(word, keyword) {
    var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.!?,:;'/ ";
    var encryptWord = "";
    for (var i = 0; i < word.length; i++) {
        encryptWord += alphabet.charAt((alphabet.indexOf(word.charAt(i)) + alphabet.indexOf(keyword.charAt(i % keyword.length))) % alphabet.length);
    }
    return encryptWord;
}

function decrypt(word, keyword) {
    var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.!?,:;'/ ";
    var decryptWord = "";
    for (var i = 0; i < word.length; i++) {
        decryptWord += alphabet.charAt(((alphabet.indexOf(word.charAt(i)) + alphabet.length) - alphabet.indexOf(keyword.charAt(i % keyword.length))) % alphabet.length);
    }
    return decryptWord;
}

function init() {
    document.getElementById("inp").addEventListener("input", (event) => {
        let data = event.target.value
        let key = document.getElementById("key").value
        if (document.getElementById("en").checked) {
            document.getElementById("out").value = encrypt(data, key)

        } else {
            console.log("de")
            document.getElementById("out").value = decrypt(data, key)

        }
    })
}
init()