//*-------------Variables-------------

const board = document.getElementById('board')// quadro principal

let dragCard // recebe o card arrastado
let mouseX, mouseY

let zIndex = 0

let cardColor = 'rgb(73, 134, 184)'// cor padrão do card (pode ser alterada)

const trash = document.querySelector('.trash-can')

//*-------------functions-------------

// cria o card
board.addEventListener('dblclick', (event) => {
    // só cria o card se o alvo do clique for o próprio board
    if (event.target === board) {
        zIndex++
        let card = document.createElement('div')
        card.classList.add('card')
        card.style.backgroundColor = cardColor
        card.draggable = true
        card.contentEditable = true
        card.style.top = mouseY + 'px'
        card.style.left = mouseX + 'px'
        card.style.zIndex = zIndex

        // evento de arrastar o card
        card.addEventListener('dragstart', (event) => {
            dragCard = event.target
            dragCard.classList.add('drag-card')
            event.dataTransfer.effectAllowed = 'move'

            trash.classList.add('show-trash-can')
        })

        //adciona o card no quadro
        board.append(card)
    }
})


// captura a posição do mouse
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
        zIndex++
        // pega a posição do mouse no momento do drop
        const x = event.clientX - 50
        const y = event.clientY - 50
        dragCard.style.top = y + 'px'
        dragCard.style.left = x + 'px'
        dragCard.classList.remove('drag-card')
        dragCard.style.zIndex = zIndex

        trash.classList.remove('show-trash-can')
    }
})

// altera a cor do card
function changeColor(color) {
    cardColor = color
}

// apagar card ao dropá-lo na lixeira
trash.addEventListener('drop', () => {
    let soundTrash = document.getElementById('sound-trash')
    soundTrash.volume = 0.05
    soundTrash.playbackRate = 1.5 //velocidade da música
    soundTrash.play()
    dragCard.remove()
})
