// we will be having 12 cards for the memory game
// we will be storing cards in the following array
const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png' 
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png' 
    }
]

// now we need to get those cards in a random order
// we are using a *trick* to sort the array randomly
cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')

// displaying the result
const resultDisplay = document.querySelector('#result')

// making an array of chosen cards
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []

// creating the game board
function createBoard () {
    for (let i = 0; i < cardArray.length; ++i) {
        // create image 
        const card = document.createElement('img')
        // setting the attributes of the image 
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)

        // card listening to mouse clicks 
        card.addEventListener('click', flipCard)

        // adding the cards into the div 'grid'
        gridDisplay.appendChild(card)
    }
}

createBoard()

function checkMatch () {
    const cards = document.querySelectorAll('#grid img')

    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]

    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert('You have clicked the same image!')
    } else if (cardsChosen[0] === cardsChosen[1]) {
        alert('You found a match!')
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    } else {
        alert('Not a match, try again...')
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
    }

    
    cardsChosen = []
    cardsChosenIds = []

    // updating the score
    resultDisplay.textContent = cardsWon.length

    if (cardsWon.length === (cardArray.length / 2)) {
        resultDisplay.textContent = 'Congratulations! You found them all!'
    }
}

// function to flip the card when we click it
function flipCard () {
    //getting the data of the card clicked
    const cardId = this.getAttribute('data-id')
    
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)

    // setting the image to the clicked card
    this.setAttribute('src', cardArray[cardId].img)

    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)  // calling the checkMatch function after 500ms
    }
}

