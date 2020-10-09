const renderCommand = (command) => {
    return `<p class="prefix">${command}</p>`
}
const renderResult = (result) => {
    return `<p>${result}</p>`
}
const parseCommand = (command) => {
    const cmds = command.split(' ')
    if (cmds[0] != 'cal') throw new Error(`${cmds[0]} command is not supported!`)
    if (cmds[1] == '--help' || cmds[1] == '-h') return [{ command: 'help' }]
    cmds.shift()
    const result = []
    let i = 0
    let flag = ''
    let main_cmd = ''
    while (true) {
        // console.log(cmds[i])
        switch (cmds[i]) {
            case 'multiple':
            case 'minus':
            case 'add':
                result.push({
                    command: cmds[i],
                    sub: '',
                    numbers: []
                })
                break
            case '-f':
                flag = true
                break
            case 'even':
                if (!result[result.length - 1].sub) {
                    result[result.length - 1].sub = 'even'
                    break
                } else {
                    throw new Error(`${result[result.length - 1].sub} has been set but ${cmds[i]} was given!`)
                }
            case 'odd':
                if (!result[result.length - 1].sub) {
                    result[result.length - 1].sub = 'odd'
                    break
                } else {
                    throw new Error(`${result[result.length - 1].sub} has been set but ${cmds[i]} was given!`)
                }
            default:
                if (flag) {
                    result[result.length - 1].numbers.push(parseFloat(cmds[i]))
                    flag = false
                } else {
                    result[result.length - 1].numbers.push(parseInt(cmds[i]))
                }
        }
        i++
        if (i >= cmds.length) {
            break
        }
    }
    return result
}
const executeCommand = (commands) => {
    if(commands[0].command == 'help'){
        return `
        - add [sub] [numbers]: to add numbers <br/>
        - multiple [sub] [numbers]: to multiple numbers <br/>
        - minus [sub] [numbers]: first number minus remain numbers <br/>
        - -f: to specific number is flag or not <br/>
        - sub: 'even' or 'odd' - select odd or even number only, not with float <br/>
        `
    }
    switch (commands[0].command) {
        case 'add':
            if (!commands[0].sub) {
                return commands[0].numbers.reduce((sum, val) => {
                    return sum + val
                }, 0)
            } else if (commands[0].sub == 'odd') {
                return commands[0].numbers.reduce((sum, val) => {
                    val = val % 2 == 1 ? val : 0
                    return sum + val
                }, 0)
            } else if (commands[0].sub == 'even') {
                return commands[0].numbers.reduce((sum, val) => {
                    val = val % 2 == 0 ? val : 0
                    return sum + val

                }, 0)
            }
        case 'multiple':
            if (!commands[0].sub) {
                return commands[0].numbers.reduce((prod, val) => {
                    return prod * val
                }, 1)
            } else if (commands[0].sub == 'odd') {
                return commands[0].numbers.reduce((prod, val) => {
                    val = val % 2 == 1 ? val : 1
                    return prod * val
                }, 1)
            } else if (commands[0].sub == 'even') {
                return commands[0].numbers.reduce((prod, val) => {
                    val = val % 2 == 0 ? val : 1
                    return prod * val

                }, 1)
            }
        case 'minus':
            if (!commands[0].sub) {
                let remain = commands[0].numbers[0]
                command[0].numbers.shift()
                return commands[0].numbers.reduce((remain, val) => {
                    return remain - val
                }, remain)
            } else if (commands[0].sub == 'odd') {
                let remain = commands[0].numbers[0]
                commands[0].numbers.shift()
                return commands[0].numbers.reduce((remain, val) => {
                    val = val % 2 == 1 ? val : 0
                    return remain - val
                }, remain)
            } else if (commands[0].sub == 'even') {
                let remain = commands[0].numbers[0]
                commands[0].numbers.shift()
                return commands[0].numbers.reduce((remain, val) => {
                    val = val % 2 == 0 ? val : 0
                    return remain - val

                }, remain)
            }
    }

}
window.onload = () => {
    document.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            // let cmdStr = 'cal multiple odd -f 8.99 9 9 9 7'
            let cmdStr = document.getElementById('cmd').value.trim()
            try {
                let cmds = parseCommand(cmdStr)
                document.getElementById('cmd').value = ''
                console.log(cmds)
                let result = executeCommand(cmds)
                document.getElementById('log').insertAdjacentHTML('beforeend', renderCommand(cmdStr))
                document.getElementById('log').insertAdjacentHTML('beforeend', renderResult(result))
                document.getElementById('cmd').value = ''
                e.preventDefault()
            } catch (err) {
                document.getElementById('cmd').value = ''
                document.getElementById('log').insertAdjacentHTML('beforeend', renderCommand(cmdStr))
                document.getElementById('log').insertAdjacentHTML('beforeend', renderResult(err.message))
                e.preventDefault()
            }

        }

    })
}