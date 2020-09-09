const path = require('path');
const fs = require('fs');
const level = [`1-Beginner`,`2-Intermediate`,`3-Advanced`]
const mdDirs = level.map(val=>path.join(__dirname,'Projects',val))


// auto create html/css/js file
// const typesOfFile = [ "html","css","js"]
// const all_p = mdDirs.map(val=>{
//     return new Promise((resolve,reject)=>{
//         fs.readdir(val,(err,files)=>{
//             if(!err){
//                 // console.log(val)
//                 resolve(files)
//             }
//             reject(err)
//         })
//     })
//     // read all file names from `1-Beginner`,`2-Intermediate`,`3-Advanced` in Projects perspectively
// })
// function createFile(filename, dir) {
//     return new Promise((resolve, reject) => {
//         if (fs.existsSync(path.join(dir, path.dirname(filename)))) {
//             resolve(path.join(dir, path.dirname(filename)))
//         } else {
//             fs.mkdir(path.join(dir, path.dirname(filename)), (err) => {
//                 if (!err) {
//                     resolve(path.join(dir, path.dirname(filename)))
//                 }
//                 reject(err)
//             })
//         }

//     })
//         .then((_path => {
//             return new Promise((resolve,reject)=>{
//                 let filepath = path.join(_path,path.basename(filename))
//                 fs.writeFile(filepath,'',(err)=>{
//                     if(!err){

//                         resolve(`${filepath} is created!`)
//                     }
//                     reject(err)
//                 })
//             })
//         }))

// }


// Promise.all(all_p)
// .then(val=>{
//    return val.map(files=>{
//        return files.map(file=>{
//            return file.replace(".md","")
//        })
//    })
//    // remove .md extension
// })
// .then(sets=>{
//     return sets.map((files,index)=>{
//         return files.map(file=>{
//             return path.join(level[index],file,file)
//         })
//     }).flat()

//     // create path /1-beginner/name/name 
// })
// .then(paths=>{
//     console.log(paths)
//     // from /1-beginner/name/name -> into /1-beginner/name/name.html(.css and .js)
//     // to 3 files html css and js 
//     return paths.map(_path=>{
//         return typesOfFile.map(type=>{
//             return `${_path}.${type}`
//         })
//     }).flat()
// })
// .then(val=>{
//     return Promise.all(val.map(file=>{
//         // console.log(path.join(__dirname,'Applications'))
//         return createFile(file,path.join(__dirname,'Applications'))
//         // return path.join(__dirname,'Applications')
//     }))
//     .then(()=>{
//         console.log("Done")
//     })
// })
// .catch(err=>{
//     console.log(err.message)
// })





function genHTML(css, js) {
    let exampleHTML = `
<!DOCTYPE html>
<html>

<head>
    <link href="./${css}" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
        integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
        integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
        crossorigin="anonymous"></script>
</head>

<body>

</body>
<script src="./${js}">

</script>

</html>
`
    return exampleHTML
}

function get_names(level){
    return new Promise((resolve,reject)=>{
        fs.readdir(path.join(__dirname, 'Applications', level), (err, files) => {
            if (!err) {
                resolve(files)
            }
            reject(err)
        })
    })

}
Promise.all(level.map(le=>{
    return get_names(le)
    .then(names=>{
        return names.map(name=>{
            let html = path.join(__dirname, 'Applications', le,name,`${name}.html`)
            return new Promise((resolve,reject)=>{
                fs.writeFile(html,genHTML(`${name}.css`,`${name}.js`),(err)=>{
                    if(!err){
                        resolve("success")
                    }
                    reject(err)
                })
            })
        })
    })
}))
.then(()=>{
    console.log("Done")
})
.catch(er=>{
    console.log(er)
})