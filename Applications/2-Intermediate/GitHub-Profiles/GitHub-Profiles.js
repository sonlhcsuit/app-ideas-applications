function generateUser({avatar_url,name,login,public_repos,url,public_gists}){
    return `<div class="card col-md-4 m-md-5">
                <img class="card-img-top" src="${avatar_url}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${login}</p>
                    <ul>
                        <li>
                            Public Repository: ${public_repos}
                        </li>
                        <li>
                            Public Gist: ${public_gists}
                        </li>
                    </ul>
                    <a href="${url}" class="btn btn-primary">More Infomation</a>
                </div>
            </div>`
}
window.onload = ()=>{
    document.getElementById('search').addEventListener("click",()=>{
        let user = document.getElementById('stext').value
        fetch(`https://api.github.com/users/${user}`)
        .then(res=>res.json())
        .then(res=>{
            let data = generateUser(res)
            document.getElementById('rows').insertAdjacentHTML("afterbegin",data)
        })
    })
}