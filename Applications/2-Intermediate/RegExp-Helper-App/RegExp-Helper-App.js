window.onload = function () {
    document.getElementById("front").value = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar turpis lectus, vitae volutpat mauris scelerisque eu. Quisque vulputate, eros sit amet volutpat porttitor, enim augue vestibulum libero, at ornare orci libero a risus. Phasellus nunc mauris, lacinia faucibus justo et, rutrum pellentesque nulla. Mauris ipsum nulla, blandit in venenatis non, pretium eu tortor. Nam quis tincidunt mauris. Ut hendrerit sodales pellentesque. Nullam id eros ut odio ultrices egestas. Mauris ut faucibus orci. Mauris vel euismod felis. Donec lacinia, tortor quis dictum ultrices, nibh ante rutrum eros, nec consequat velit enim sit amet odio. Aliquam eu venenatis tortor. Nam faucibus ligula ac risus interdum, et tristique odio sodales.`
    document.getElementById("rg").addEventListener("input", function () {
        let text = this.value
        if (text != '') {
            let flags = document.getElementById('flag').value
            let rg = new RegExp(text, flags)
            let ct = document.getElementById("front").value
            let new_ct = ct.replaceAll(rg,(sub)=>{
                return `</p><span>${sub}</span><p>`
            })
            document.getElementById('back').innerHTML = `<p>${new_ct}</p>`
        }

    })

}