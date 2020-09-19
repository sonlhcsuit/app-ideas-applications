let addBTN = document.getElementById("add")
let calBTN = document.getElementById("cal")

let x_ = document.getElementById("x")
let y_ = document.getElementById("y")
let list = []
let _x = [50, 80, 95, 33, 61, 43, 55, 48, 50, 5]
let _y = [58, 97, 81, 51, 67, 15, 61, 24, 75, 16]
for (let i = 0; i < _x.length; i++) {
    list.push({
        x: _x[i],
        y: _y[i]
    })
}
function renderTable(data) {
    return data.map(val => {
        return ` <tr>
    <td>${val.x}</td>
    <td>${val.y}</td>
    </tr>`
    }).join("")
}
function displayTable(data) {
    let tab = document.getElementById("tab")
    tab.innerHTML = ''
    tab.insertAdjacentHTML("beforeend", `<tr>
    <th>X</th>
    <th>Y</th>
</tr>`)
    tab.insertAdjacentHTML("beforeend", renderTable(data))
}
function getPearsonCorrelation(x, y) {
    var shortestArrayLength = 0;

    if (x.length == y.length) {
        shortestArrayLength = x.length;
    } else if (x.length > y.length) {
        shortestArrayLength = y.length;
        console.error('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
    } else {
        shortestArrayLength = x.length;
        console.error('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
    }

    var xy = [];
    var x2 = [];
    var y2 = [];

    for (var i = 0; i < shortestArrayLength; i++) {
        xy.push(x[i] * y[i]);
        x2.push(x[i] * x[i]);
        y2.push(y[i] * y[i]);
    }

    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_x2 = 0;
    var sum_y2 = 0;

    for (var i = 0; i < shortestArrayLength; i++) {
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += xy[i];
        sum_x2 += x2[i];
        sum_y2 += y2[i];
    }

    var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
    var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
    var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
    var step4 = Math.sqrt(step2 * step3);
    var answer = step1 / step4;

    return answer;
}
function init() {
    addBTN.addEventListener("click", () => {
        let x = parseInt(x_.value)
        let y = parseInt(y_.value)
        if (x && y) {
            list.push({
                x: x, y: y
            })
            displayTable(list)
        } else {
            alert("X or Y must be filled with number")
        }
    })
    calBTN.addEventListener("click", () => {
        let coef = getPearsonCorrelation([...list.map(({ x }) => x)], [...list.map(({ y }) => y)])
        alert(coef)
    })
    document.getElementById("clr").addEventListener("click", () => {
        list = []
    })
    displayTable(list)
}
init()