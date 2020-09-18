class Model {
    constructor(dbName) {
        this.dbName = dbName
        this.keys = undefined
        if (!window.indexedDB) {
            throw new Error('Your browser does not support indexedDB')
        }
        window.indexedDB.deleteDatabase(this.dbName)
    }
    open() {
        return new Promise((resolve, reject) => {
            let db_ = indexedDB.open(this.dbName)
            console.log(db_)
            db_.onsuccess = (event) => {
                console.log("on success")
                resolve(event.target.result)
            }
            db_.onupgradeneeded = ((event) => {
                console.log("on upgraneeded")
                resolve(event.target.result)
            })
            db_.onerror = (event) => {
                reject(event.target.errorCode)
            }
        })
    }
    save(db, data) {
        let objectStore = db.createObjectStore(this.dbName, { keyPath: '_id' })
        this.keys.forEach((val) => {
            objectStore.createIndex(val, val)
        })
        return new Promise((resolve, reject) => {
            objectStore.transaction.oncomplete = (e) => {
                var productObjectStore = db.transaction(this.dbName, "readwrite").objectStore(this.dbName);
                data.forEach(function (product) {
                    productObjectStore.add(product);
                });
                logging('Import complete')
                resolve(true)
            }
            objectStore.transaction.onerror = (e) => {
                reject(e.target.errorCode)
            }
        })
    }
    import(data) {
        if (!Array.isArray(data)) {
            throw new Error(`Expected array json format but got ${typeof data}`)
        }
        let all_keys = [...new Set(data.reduce((acc, val) => [...acc, ...Object.keys(val)], []))]
        this.keys = all_keys
        let to_db = []
        for (let i = 0; i < data.length; i++) {
            let temp = {}
            for (let key of all_keys) {
                temp[key] = data[i][key]
            }
            to_db.push(temp)
        }
        this.open()
            .then(db => {
                return this.save(db, data)
            })

    }
    loadAllDatabase() {
        return this.open()
            .then((db) => {
                return new Promise((resolve, reject) => {
                    logging("Loading...")
                    let transation = db.transaction(this.dbName)
                    let req = transation.objectStore(this.dbName).getAll()
                    req.onsuccess = (e) => {
                        let data = e.target.result
                        let all_keys = [...new Set(data.reduce((acc, val) => [...acc, ...Object.keys(val)], []))]
                        this.keys = all_keys
                        logging("Load complete")
                        resolve(data)
                    }
                    req.onerror = (e) => {
                        logging("Load fail", true)
                        reject(e.target.errorCode)
                    }
                })
            })
    }
    toDisplay(data) {
        let keys = this.keys
        let cols = `<tr>${keys.reduce((acc, val) => acc + `<th>${val}</th>`, '')}</tr>`
        let records = data.map(sample => {
            return `<tr>${Object.keys(sample).reduce((acc, val) => {
                return acc + `<td>${sample[val]}</td>`
            }, '')}</tr>`
        })
        let text = `
            <table style="width:100%">
                ${cols}
                ${records.reduce((acc, val) => acc + val, '')}
            </table>`
        document.getElementById('result').innerHTML = text
    }
}
function logging(message, err) {
    if (!err) {
        document.getElementById('log').insertAdjacentHTML(`beforeend`, `<p>Log:${message}`)
    } else {
        document.getElementById('log').insertAdjacentHTML(`beforeend`, `<p><span style="color:red!important">Error</span>:${message}`)
    }
}

function init() {
    let product = new Model('products')
    document.getElementById("import").addEventListener("click", () => {
        let file = document.createElement("input")
        file.setAttribute("type", "file")
        file.setAttribute("accept", ".json")
        file.click()
        file.onchange = () => {
            return new Promise((resolve, reject) => {
                let reader = new FileReader()
                reader.readAsText(file.files[0])
                reader.onload = () => {
                    resolve(JSON.parse(reader.result))
                }
                reader.onerror=(ev)=>{
                    reject(ev.target.error)
                }
            })
                .then(data => {
                    window.indexedDB.deleteDatabase(this.dbName)

                    product.import(data)
                })
        }
    })
    document.getElementById('query').addEventListener('click', () => {
        product.loadAllDatabase()
            .then((data) => {
                return product.toDisplay(data)
                .catch(err=>{
                    logging(err.message,true)
                })
            })
    })
    document.getElementById("clear").addEventListener("click", () => {
        document.getElementById("log").innerHTML = ''
        logging('Clear Complete!')
        document.getElementById('result').innerHTML = ''
    })
}

init()
