// BlackJack OBJ: Hit 21 or as close to it without going over. 
let deckId
const playerHand = {
  cards: [],
  totalHandValue: 0
}

const dealerHand = {
  cards: [],
  totalHandValue: 0
}

let numberOfCards = 2

const assignCardToHand = (pulledCard, cardNumber, handOfPlayer) => {
  console.log(pulledCard[cardNumber].value)
  //ASSIGNS THE CARD VALUE TO THE PLAYER OBJ
  switch (pulledCard[cardNumber].value) {
    case "ACE":
      handOfPlayer.totalHandValue += 11
      break

    case "JACK":
      handOfPlayer.totalHandValue += 10
      break

    case "QUEEN":
      handOfPlayer.totalHandValue += 10
      break

    case "KING":
      handOfPlayer.totalHandValue += 10
      break

    default:
      handOfPlayer.totalHandValue += Number(pulledCard[cardNumber].value)
  }

}

const callNewDeck = () => {
  let url
  url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'

  fetch(url)
    .then(response => response.json())
    .then(cardData => {
      deckId = cardData.deck_id
      //Call a shuffled deck from the api and turn it into JSON
      let drawCardsUrl = 'https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=4'
      fetch(drawCardsUrl)
        .then(response2 => response2.json())
        .then(pulledCard => {
          console.log("Pulled Cards (" + numberOfCards + ") : ")
          console.log(pulledCard.cards)
          //ASSIGNS THE CARD TO THE PLAYER'S HAND/ARRAY
          playerHand.cards.push(pulledCard.cards[0].code)
          playerHand.cards.push(pulledCard.cards[1].code)
          dealerHand.cards.push(pulledCard.cards[2].code)
          dealerHand.cards.push(pulledCard.cards[3].code)

          assignCardToHand(pulledCard.cards, 0, playerHand)
          assignCardToHand(pulledCard.cards, 1, playerHand)
          assignCardToHand(pulledCard.cards, 2, dealerHand)
          assignCardToHand(pulledCard.cards, 3, dealerHand)


          // console.log("total:")
          // console.log(playerHand.totalHandValue)
          // console.log(dealerHand.totalHandValue)
          // console.log(playerHand.cards)
          // console.log(dealerHand.cards)
        })
    })
}
const fetchPlayerHit = () => {
  drawCardsFetch(1)
}
const drawCardsFetch = (numberOfCards) => {
  let drawCardsUrl = 'https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=' + numberOfCards

  fetch(drawCardsUrl)
    .then(response2 => response2.json())
    .then(pulledCard => {
      playerHand.cards.push(pulledCard.cards[0].code)

      console.log("Pulled Cards (" + numberOfCards + ") : ")
      // console.log(pulledCard.cards)
      assignCardToHand(pulledCard.cards, 0, playerHand)
      console.log("total:")
      console.log(playerHand.totalHandValue)
      console.log(playerHand.cards)


      // let x = document.createElement("img")
      // x.setAttribute("src", pulledCard.cards[0].image);
      // document.querySelector('.cards').appendChild(x)
    })
}


document.addEventListener('DOMContentLoaded', callNewDeck)
document.querySelector('#hit-button').addEventListener('click', fetchPlayerHit)



      // document.querySelector('.cards').textContent = cardData










































/*
const deck = []
const dealer = []
const player = []
let dealerTotal = 0
let playerTotal = 0

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
    const card = cards[i] + " of " + suit[j]
  //add the new card to the deck array.
      deck.push(card)
    }
  }
  //shuffle the new deck
  shuffle()

  // +2 Cards to each player/Keep dealer hand hidden
  hit(dealer)
  hit(dealer)
  hit(player)
  hit(player)
  document.querySelector('#dealer-cards').style.visibility = "hidden"
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


// winner--- dealer wins tie
const showWinner = () => {
  console.log('won')
}

const calculate = () =>{
  console.log(dealer[0])
  for (let i = 0; i < dealer.length; i++) {
    console.log(dealer[0])
    if (dealer[i].cards === "Ace"){
      dealerTotal += 11
    }else if (dealer[i].cards ===  "Jack" || dealer[i].cards === "Queen"|| dealer[i].cards === "King"){
      dealerTotal += 10
    }

    console.log(player[0])
    dealer[i].cards += dealerTotal
    // console.log("total: " + dealerTotal)
  }

  if(dealerTotal >= 21){
      showWinner()
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

    //calculates and if >21 game over automatically -show dealer hand
    calculate()

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


// *Stand Button - Show Dealer Hand,
//Dealer hits adding new cards to the UL until >= 17
const stand = () => {
  document.querySelector('#dealer-cards').style.visibility = "visible"
  while (dealerTotal >= 17){
    // hit()
    console.log('wooo')
  }
}


// * Reset - New cards shuffle w/ all the cards back in the deck, add new cards to the players and re-hide the dealer's hand
const reset = () =>{
  deckBuild()
}




// --listen for hit, stand, reset button
document.getElementById('hit-button').addEventListener('click', hit)
document.querySelector('#stand-button').addEventListener('click', stand)
document.querySelector('#reset-button').addEventListener('click', reset)


document.addEventListener('DOMContentLoaded', deckBuild)

*/













// const headphoneBrand = "Bose"
// const headphonePower = 23
// const headphoneBatteryLife = 20

// const headphone ={
//   brand:'bose',
//   power :23, 
//   batteryLife:20}



