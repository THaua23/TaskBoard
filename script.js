//*-------------Variables-------------

const board = document.getElementById('board')

let dragCard
let mouseX, mouseY

let cardColor = 'rgb(73, 134, 184)'// cor padrão do card (pode ser alterada)


//*-------------functions-------------

//cria o card
board.addEventListener('dblclick', (event) => {
    // só cria o card se o alvo do clique for o próprio board
    if (event.target === board) {
        let card = document.createElement('div')
        card.classList.add('card')
        card.style.backgroundColor = cardColor
        card.draggable = true
        card.contentEditable = true
        card.style.position = 'absolute'
        card.style.top = mouseY + 'px'
        card.style.left = mouseX + 'px'

        // evento de arrastar o card
        card.addEventListener('dragstart', (event) => {
            dragCard = event.target
            dragCard.classList.add('drag-card')
            event.dataTransfer.effectAllowed = 'move'
        })

        // remover card com duplo clique
        card.addEventListener('dblclick', () => {
            card.remove()
        })

        board.append(card)
    }
})


//captura a posição do mouse
board.addEventListener('mousemove', (event) => {
    mouseX = event.clientX - 50
    mouseY = event.clientY - 50
})

// permitir drop
board.addEventListener('dragover', (event) => {
    event.preventDefault()
})

// soltar o card
board.addEventListener('drop', (event) => {
    event.preventDefault() // sempre necessário
    if (dragCard) {
        // pega a posição do mouse no momento do drop
        const x = event.clientX - 50
        const y = event.clientY - 50
        dragCard.style.top = y + 'px'
        dragCard.style.left = x + 'px'
        dragCard.classList.remove('drag-card')
    }
})

// altera a cor do card

function changeColor(color) {
    cardColor = color
}


//TODO Fazer modo mobile 