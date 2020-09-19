const validLogin = () => {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let mail = document.getElementById("mail").value
    let usernameRegex = /[\D\S^\-]/gi
    let passwordRegex = /[A-Z\/!@#$%^&*()_+\-]{11,}/gi
    let gmailRegex = /[a-zA-Z\.0-9]+@gmail\.com/gi
    let flag = true


    if (usernameRegex.test(username)) {
        document.getElementById("username").classList.remove("is-invalid")
        document.getElementById("username").classList.add("is-valid")

    } else {
        document.getElementById("username").classList.add("is-invalid")
        document.getElementById("username").classList.remove("is-valid")
        flag = false

    }
    if (passwordRegex.test(password)) {
        document.getElementById("password").classList.remove("is-invalid")
        document.getElementById("password").classList.add("is-valid")

    } else {
        document.getElementById("password").classList.add("is-invalid")
        document.getElementById("password").classList.remove("is-valid")

        flag = false
    }
    if (gmailRegex.test(mail)) {
        console.log("as")
        document.getElementById("mail").classList.remove("is-invalid")
        document.getElementById("mail").classList.add("is-valid")

    } else {
        document.getElementById("mail").classList.add("is-invalid")
        document.getElementById("mail").classList.remove("is-valid")

        flag = false

    }
    if (flag) {
        console.log("Valid")
    } else {
        console.log('Invalid')
    }


}

document.getElementById("btn").addEventListener("click", validLogin)