const bitMask = (gmtOffset) => {
    const cities = [
        {
            name: 'Moscow',
            GMT: +3
        },
        {
            name: 'Paris',
            GMT: +2
        }, {
            name: 'Berlin',
            GMT: +2
        }, {
            name: 'Brussels',
            GMT: +2
        }, {
            name: 'Amsterdam',
            GMT: +2
        }, {
            name: 'Rome',
            GMT: +2
        }, {
            name: 'London',
            GMT: +1
        }, {
            name: 'Dublin',
            GMT: +1
        }, {
            name: 'New York',
            GMT: 12+4
        }, {
            name: 'Washington, DC',
            GMT: 12+4
        }, {
            name: 'St.Louis',
            GMT: 12+5
        }, {
            name: 'Los Angeles',
            GMT: 12+7
        }, {
            name: 'Tokyo',
            GMT: +9
        }, {
            name: 'Beijing',
            GMT: +8
        }, {
            name: 'Ho Chi Mihn City',
            GMT: +7
        }, {
            name: 'Mumbai',
            GMT: +5
        }
    ]
    if (gmtOffset >= -12 && gmtOffset <0) {
    
        gmtOffset = -gmtOffset + 12
        console.log(gmtOffset)
        gmtOffset = (gmtOffset>>>0).toString(2)
    

    }
    return cities.map(val => {
        return {
            ...val,
            GMT:(val.GMT>>>0).toString(2)
        }
    }
    ).filter(val=>{
        return (val.GMT & gmtOffset) == gmtOffset
    })
    throw Error('GMT offset is not valid!')
}
const render = (values)=>{
    return values.map(val=>{
        let gmt = parseInt(val.GMT,2)
        return `<p class="text-center">${val.name} GMT${gmt > 12?"-"+(gmt-12):"+"+gmt}</p>`
    }).join('')

}

window.onload = ()=>{
    document.getElementById('innum').addEventListener('input',(e)=>{
        let bit = parseInt(e.target.value)
        let ans = bitMask(bit)
        let val = render(ans)
        document.getElementById('output').innerHTML = val
    })
}