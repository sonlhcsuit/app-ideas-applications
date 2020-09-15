this._selected = undefined
const people = [
    { name: "Luu Hoang Son Zeros", role: "CEO", street: "253 Dien Bien Phu", city: "Ho Chi Minh City", state: "N/A", country: "Viet Nam", telephone: "1234555555", birthday: "03/06/1975", avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg", quote: "The purpose of our lives is to be happy." },
    { name: "Luu Hoang Son Ones", role: "CTO", street: "253 Dien Bien Phu", city: "Ho Chi Minh City", state: "N/A", country: "Viet Nam", telephone: "1234555555", birthday: "03/06/1975", avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg", quote: "The purpose of our lives is to be happy." },
    { name: "Luu Hoang Son Twos", role: "CFO", street: "253 Dien Bien Phu", city: "Ho Chi Minh City", state: "N/A", country: "Viet Nam", telephone: "1234555555", birthday: "03/06/1975", avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg", quote: "The purpose of our lives is to be happy." },

    { name: "Luu Hoang Son Threes", role: "CAO", street: "253 Dien Bien Phu", city: "Ho Chi Minh City", state: "N/A", country: "Viet Nam", telephone: "1234555555", birthday: "03/06/1975", avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg", quote: "The purpose of our lives is to be happy." },
    { name: "Luu Hoang Son ", role: "Technical Leader", street: "253 Dien Bien Phu", city: "Ho Chi Minh City", state: "N/A", country: "Viet Nam", telephone: "1234555555", birthday: "03/06/1975", avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg", quote: "The purpose of our lives is to be happy." },
    { name: "Luu Hoang Son", role: "Technical Leader", street: "253 Dien Bien Phu", city: "Ho Chi Minh City", state: "N/A", country: "Viet Nam", telephone: "1234555555", birthday: "03/06/1975", avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg", quote: "The purpose of our lives is to be happy." },
    { name: "Luu Hoang Son", role: "Researcher", street: "253 Dien Bien Phu", city: "Ho Chi Minh City", state: "N/A", country: "Viet Nam", telephone: "1234555555", birthday: "03/06/1975", avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg", quote: "The purpose of our lives is to be happy." },
    { name: "Luu Hoang Son", role: "Researcher", street: "253 Dien Bien Phu", city: "Ho Chi Minh City", state: "N/A", country: "Viet Nam", telephone: "1234555555", birthday: "03/06/1975", avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg", quote: "The purpose of our lives is to be happy." },
    { name: "Luu Hoang Son", role: "Researcher", street: "253 Dien Bien Phu", city: "Ho Chi Minh City", state: "N/A", country: "Viet Nam", telephone: "1234555555", birthday: "03/06/1975", avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg", quote: "The purpose of our lives is to be happy." },

];

function generateCard({ name, role, quote, id, street, city, country, telephone, avatar }) {
    return `
        <div id="card-${id}" class="card text-center col-4 p-md-0 my-md-2">
            <div class="card-header w-100">
                ${role}
            </div>
            <img style="width: fit-content;margin: auto;" src="${avatar}">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${quote}</p>
                <a id="btn-${id}" class="btn btn-primary">More Information</a>
            </div>
        </div>
    `
}

function init() {
    for (let i = 0; i < people.length; i++) {
        document.getElementById("ideal").insertAdjacentHTML("beforeend", generateCard({ ...people[i], id: i }))
        document.getElementById(`card-${i}`).data = { ...people[i], id: i }
        document.getElementById(`btn-${i}`).addEventListener("click", (e) => {
            let data = e.target.parentElement.parentElement.data
            let cluster = parseInt((data.id) / 3)
            if (this._selected == e.target.id) {
                this._selected = undefined
                document.getElementById(`cluster-${cluster}`).remove(this)
            } else {

                this._selected = e.target.id
                // console.log(this._selected)
                // console.log(cluster)
                if (document.getElementById(`cluster-${cluster}`)) {
                    document.getElementById(`cluster-${cluster}`).remove(this)
                    document.getElementById(`card-${cluster * 3 + 3 - 1}`).insertAdjacentHTML("afterend", geneDetails({ ...data, cluster: cluster }))

                } else {
                    document.getElementById(`card-${cluster * 3 + 3 - 1}`).insertAdjacentHTML("afterend", geneDetails({ ...data, cluster: cluster }))
                }
            }


        })
    }

}

function geneDetails({ name, quote, street, city, country, telephone, avatar, cluster }) {
    return `
        <div id="cluster-${cluster}" class="media border my-md-3 p-md-3 col-12">
            <img class="align-self-center mr-3"
                src="${avatar}"
                alt="Generic placeholder image">
            <div class="media-body">
                <h5 class="mt-0">${name}</h5>
                <p><i>${street}, ${city}, ${country}</i></p>
                <p class="mb-2"><b>Tel. </b>${telephone}</p>
                <p> ${quote} </p
                
            </div>
        </div>
    `
}
init()
