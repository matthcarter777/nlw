function populationsUFs(){
    const ufSelector = document.querySelector('select[name=uf]')

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {
        
        for( let state of states) {
            ufSelector.innerHTML += `<option value="${state.id}">${state.nome}</option>` 
        }
    })
}

populationsUFs()

function getCities(event) {
    const citySelector = document.querySelector('select[name=city]')
    const stateInput   = document.querySelector('input[name=state]')
    
    const ufValue = event.target.value
    
    const indexOSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelector.innerHTML = "<option value>Selecione a cidade</option>"
    citySelector.disabled = true
    fetch(url).then(res => res.json()).then( cities => {
        
        for ( let city of cities){
            citySelector.innerHTML += `<option value="${city.nome}">${city.nome}</option>` 
        }

        citySelector.disabled = false
    })
}

document.querySelector('select[name=uf]').addEventListener("change", getCities)

/** itens de coleta */

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')

let selectItems = []

function handleSelectedItem(){
    const itemLi = event.target
    
    // add or remove classe on JS 
    itemLi.classList.toggle("selected")
    
    const itemId = event.target.dataset.id

    const alreadySelected = selectItems.findIndex( (item) => {
        const itemFound = item == itemId
        return itemFound
    })

    if( alreadySelected >= 0){
        const filteredItems = selectItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent 
        })

        selectItems = filteredItems
    } else {
        selectItems.push(itemId)   
    }

    collectedItems.value = selectItems
}