// BlackJack OBJ: Hit 21 or as close to it without going over. 

const deck = []
const dealer = []
const player = []

// OnLoad: 
// Build a Deck
const deckBuild = () => {  
  // initiaize the card deck arrays.
  const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Ace", "Jack", "Queen", "King"]
  const suit = ["Spades", "Hearts", "Diamonds", "Clubs"]
  //create all the cards
  for (let i = 0; i < suit.length; i++){ 
    for (let j = 0; j < cards.length; j++){ //each suit gets a card set 
      const card = { //for each card type and suit, assign it to the object 'cards'
        suit: suit[i],
        cards: cards[j]
      }

  //add the new card to the deck array.
      deck.push(card)
    }
  }
  //shuffle the new deck
  shuffle()

  //2 cards per player
  hit(dealer)
  hit(dealer)
  hit(player)
  hit(player)
  
}

// Shuffle the Deck
const shuffle = () => {
  for(let i = deck.length - 1; i>= 0; i--){
    const j = Math.floor(Math.random() * (i + 1))
    const iCard = deck[i]
    const jCard = deck[j]
    deck[i] = jCard
    deck[j] = iCard
  }
}



const hit = (giveCardTo) => {
  // *Hit Button - give 1 (global) card to p2
  let getAcard = deck.shift()
  let newCard = getAcard.cards + "_of_" + getAcard.suit
  let addLi = document.createElement('li')
  let addImg = document.createElement('img')


  //append the new card to the UI
  if (giveCardTo === dealer){
    let deCardAddLiElement = document.querySelector('#dealer-cards ul')
    deCardAddLiElement.appendChild(addLi)

    dealer.push(newCard)

    let deCardAddImgElement = document.querySelector('#dealer-cards ul li')
    deCardAddImgElement.appendChild(addImg)
    addImg.src = "images/" + newCard + ".svg"
    deCardAddImgElement.appendChild(addImg)
    
  }else{
    let plCardAddLiElement = document.querySelector('#player-cards ul')
    plCardAddLiElement.appendChild(addLi)

    player.push(newCard)

    let plCardAddImgElement = document.querySelector('#player-cards ul li')
    plCardAddImgElement.appendChild(addImg)
    addImg.src = "images/" + newCard + ".svg"
    plCardAddImgElement.appendChild(addImg)
  }
}

const stand = () => {
  
}

const reset = () =>{

}
  
  
  // +2 Cards to each payer/Keep dealer hand hidden
  // Hit Each Player Twice
  // *Hit Button - Adds 1 (global) card to p2
  //calculates and if >21 game over automatically -show dealer hand


// --listen for hit, stand, reset button
document.getElementById('hit-button').addEventListener('click', hit)
document.querySelector('#stand-button').addEventListener('click', stand)
document.querySelector('#reset-button').addEventListener('click', reset)


document.addEventListener('DOMContentLoaded', deckBuild)



// *Stand Button - Show Dealer Hand, Dealer hits adding new cards to the UL until >= 17
// winnder--- dealer wins tie
// * Reset - New cards shuffle w/ all the cards back in the deck, add new cards to the players and re-hide the dealer's hand


// document.querySelector('h1.hello-world').textContent = 'Hello, World!'
