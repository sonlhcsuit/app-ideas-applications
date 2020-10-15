// const products_data = [{
//     "id": 0,
//     "name": "this is name of product 0",
//     "description": "this is description",
//     "image": "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
//     "no_": 10
// }, {
//     "id": 1,
//     "name": "this is name of product 1",
//     "description": "this is description",
//     "image": "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
//     "no_": 10
// }, {
//     "id": 2,
//     "name": "this is name of product 2",
//     "description": "this is description",
//     "image": "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
//     "no_": 10
// }, {
//     "id": 3,
//     "name": "this is name of product 3",
//     "description": "this is description",
//     "image": "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
//     "no_": 10
// }, {
//     "id": 4,
//     "name": "this is name of product 4",
//     "description": "this is description",
//     "image": "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
//     "no_": 10
// }, {
//     "id": 5,
//     "name": "this is name of product 5",
//     "description": "this is description",
//     "image": "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
//     "no_": 10
// }, {
//     "id": 6,
//     "name": "this is name of product 6",
//     "description": "this is description",
//     "image": "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
//     "no_": 10
// }, {
//     "id": 7,
//     "name": "this is name of product 7",
//     "description": "this is description",
//     "image": "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
//     "no_": 10
// }, {
//     "id": 8,
//     "name": "this is name of product 8",
//     "description": "this is description",
//     "image": "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
//     "no_": 10
// }, {
//     "id": 9,
//     "name": "this is name of product 9",
//     "description": "this is description",
//     "image": "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
//     "no_": 10
// }, {
//     "id": 10,
//     "name": "this is name of product 10",
//     "description": "this is description",
//     "image": "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
//     "no_": 10
// }, {
//     "id": 11,
//     "name": "this is name of product 11",
//     "description": "this is description",
//     "image": "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
//     "no_": 10
// }, {
//     "id": 12,
//     "name": "this is name of product 12",
//     "description": "this is description",
//     "image": "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
//     "no_": 10
// }, {
//     "id": 13,
//     "name": "this is name of product 13",
//     "description": "this is description",
//     "image": "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
//     "no_": 10
// }, {
//     "id": 14,
//     "name": "this is name of product 14",
//     "description": "this is description",
//     "image": "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
//     "no_": 10
// }, {
//     "id": 15,
//     "name": "this is name of product 15",
//     "description": "this is description",
//     "image": "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
//     "no_": 10
// }]
const receipt_data = [{
    "id": 0,
    "products": [
        {
            "prdid": 0,
            "no": 1,
            "unit": 1
        },
    ],
    "buyer": 'son',
    "total": 0,
    "date": null
}]
const product = 'productsDB'
const receipt = 'receiptsDB'
class Model {
    constructor(dbName) {
        if (!window.indexedDB) {
            throw new Error('Your browser does not support indexedDB')
        }
        this.dbName = dbName

        // window.indexedDB.deleteDatabase(this.dbName)
    }
    loadOversion() {
        return new Promise((resolve, reject) => {
            let DBOpenRequest = indexedDB.open(this.dbName)
            // console.log(DBOpenRequest)
            DBOpenRequest.onsuccess = (event) => {
                // console.log("on success load version")
                let version = event.target.result.version
                event.target.result.close()
                resolve(version)
            }
            DBOpenRequest.onerror = (event) => {
                let errCode = event.target.errorCode
                event.target.result.close()
                reject(errCode)
            }
        })
    }
    open(withVerion) {
        return new Promise((resolve, reject) => {
            let DBOpenRequest;
            if (withVerion) {
                DBOpenRequest = indexedDB.open(this.dbName, withVerion + 1)
            } else {
                DBOpenRequest = indexedDB.open(this.dbName)
            }
            if (withVerion == 1) {
                DBOpenRequest.onupgradeneeded = ((event) => {
                    console.log("on upgraneeded")
                    resolve(event.target.result)
                })
            } else {
                DBOpenRequest.onupgradeneeded = ((event) => {
                    event.target.transaction.oncomplete = () => {
                        resolve(event.target.result)
                        // console.log('for updated')
                    }
                    console.log("on upgraneeded")
                })
            }
            DBOpenRequest.onsuccess = (event) => {
                console.log("on success")
                resolve(event.target.result)
            }
            DBOpenRequest.onerror = (event) => {
                reject(event.target.errorCode)
            }
        })
    }
    get() {
        return this.open()
            .then(db => {
                console.log(db.version, 170)
                return new Promise((resolve, reject) => {
                    let transation = db.transaction(this.dbName)
                    let req = transation.objectStore(this.dbName).getAll()
                    req.onsuccess = (e) => {
                        let data = e.target.result
                        // logging("Load complete")
                        // console.log(data)
                        resolve(data)
                    }
                    req.onerror = (e) => {
                        // logging("Load fail", true)
                        reject(e.target.errorCode)
                    }
                })

            })
    }
    update(items) {
        this.loadOversion()
            .then(version => {
                return this.open(version)
                    .then(db => {
                        let transaction = db.transaction(this.dbName, "readwrite")
                        let objectStore = transaction.objectStore(this.dbName)
                        items.forEach(function (item) {
                            objectStore.put(item);
                        });
                        console.log(db.version)
                        console.log('updated')
                    })
            })
        // console.log(db.transaction)

    }
    load(items) {
        this.loadOversion()
            .then(version => {
                // console.log(version)
                return this.open(version).
                    then(db => {
                        let objectStore = db.createObjectStore(this.dbName, { keyPath: 'id' })
                        Object.keys(items[0]).forEach(element => {
                            objectStore.createIndex(element, element)
                        });
                        items.forEach(function (item) {
                            objectStore.add(item);
                        });
                        console.log('created')
                    })
            })
    }
}
window.onload = function () {
    let productDB = new Model(product)
    let receiptDB = new Model(receipt)
    localStorage.clear()
    receiptDB.get()
        .then(receipts => {
            document.getElementById('receipt').addEventListener('click', function () {
                let html = receipts.map(generateReceipt).join('')
                document.getElementById("rows").innerHTML = html
            })
            document.getElementById('cartsection').addEventListener("click", () => {
                let receipt = createReceipt(JSON.parse(localStorage.getItem('cart')) || [])
                receipts.push(receipt)
                localStorage.clear()
                receiptDB.update(receipts)
            })
        })
    // let ca = createReceipt([0, 0, 1, 2, 4, 2, 1])
    // console.log(ca)

    productDB.get()
        .then(data => {
            let html = data.map(generateProduct).join('')
            document.getElementById('rows').insertAdjacentHTML("afterbegin", html)
            data.forEach(val => {
                document.getElementById(`prd${val.id}`).addEventListener("click", function () {
                    addToCart(this.id.replace('prd', ''))
                    console.log('add', this.id)
                })
            })
        })

}
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.push(id)
    localStorage.setItem('cart', JSON.stringify(cart))
    document.getElementById('cart').innerHTML = cart.length
}
function generateProduct({ image, id, name, description }) {
    return `<div class="card col-3" >
                <img class="card-img-top" src="${image}">
                <div class="card-body">
                    <h5 class="card-title">
                        ${name}
                    </h5>
                    <p class="card-text">
                        ${description}
                    </p>
                    <button id="prd${id}"class="btn btn-primary">Add to cart</button>
                </div>
            </div>`
}
function generateReceipt({ products, id }) {
    let html = products.map(val => {
        return `<li>Product Id:${val.prdid}, quantity: ${val.no}</li`
    }).join('')
    return ` <div class="media col-12 border m-md-2">
                <div class="media-body">
                    <h5 class="mt-0">Receipt No.${id}</h5>
                    <ul>${html}</ul>
                </div>
            </div>`
}
function createReceipt(cart) {

    let products = [...new Set(cart)].map(vale => {
        return {
            prdid: vale,
            no: cart.filter(val => val == vale).length,
            unit: 1
        }
    })
    return {

        id: 0,
        products: products,
        buyer: 'son',
        total: 0,
        date: Date.now()
    }
}