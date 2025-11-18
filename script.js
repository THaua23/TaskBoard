//*-------------Variables-------------

const board = document.getElementById('board')

let dragCard
let mouseX, mouseY

let zIndex = 0

let cardColor = 'rgb(73, 134, 184)'// cor padrão do card (pode ser alterada)


//*-------------functions-------------

//cria o card
board.addEventListener('dblclick', (event) => {
    // só cria o card se o alvo do clique for o próprio board
    if (event.target === board) {
        zIndex++
        let card = document.createElement('div')
        card.classList.add('card')
        card.style.backgroundColor = cardColor
        card.draggable = true
        card.contentEditable = true
        card.style.position = 'absolute'
        card.style.top = mouseY + 'px'
        card.style.left = mouseX + 'px'
        card.style.zIndex = zIndex + 1

        // evento de arrastar o card
        card.addEventListener('dragstart', (event) => {
            dragCard = event.target
            dragCard.classList.add('drag-card')
            event.dataTransfer.effectAllowed = 'move'
        })

        // remover card com duplo clique
        card.addEventListener('dblclick', () => {
            // cria o modal
            let modal = document.createElement('div')
            modal.classList.add('modal')
            modal.innerText = 'Do you want to delete the card?'

            let btnBox = document.createElement('div')
            btnBox.classList.add('btn-box')

            let no = document.createElement('button')
            no.innerText = 'No'
            let yes = document.createElement('button')
            yes.innerText = 'Yes'

            btnBox.append(no)
            btnBox.append(yes)
            modal.append(btnBox)
            board.append(modal)

            // sistema do modal de delete
            no.addEventListener('click', () => {
                modal.remove()
            })

            yes.addEventListener('click', () => {
                modal.remove()
                card.remove()
            })
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
        zIndex++
        // pega a posição do mouse no momento do drop
        const x = event.clientX - 50
        const y = event.clientY - 50
        dragCard.style.top = y + 'px'
        dragCard.style.left = x + 'px'
        dragCard.classList.remove('drag-card')
        dragCard.style.zIndex = zIndex
    }
})

// altera a cor do card

function changeColor(color) {
    cardColor = color
}