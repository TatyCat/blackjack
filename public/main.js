// BlackJack OBJ: Hit 21 or as close to it without going over. 
let deckId
let numberOfCards
let dealerFirstHitCard
let dealerFirstHitCardValue
let dealerSecondHitCard
let dealerSecondHitCardValue



const playerHand = {
  cards: [],
  totalHandValue: 0
}

const dealerHand = {
  cards: [],
  totalHandValue: 0
}

const renderCardsToScreen = (player, playerHand) => {
  const listContainer = document.createElement('ul');
  document.querySelector(`#${player}-cards`).appendChild(listContainer);
  const listElement = document.createElement('li');

  playerHand.cards.forEach(cardImg => {
    listContainer.appendChild(listElement);

    const newCardImg = document.createElement("img")
    newCardImg.setAttribute("src", `${cardImg}`)
    document.querySelector(`#${player}-cards ul li`).appendChild(newCardImg)
  })
}

const assignCardToHand = (pulledCard, cardNumber, handOfPlayer) => {
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

const assignDealerCard = (input) => {
  //ASSIGNS THE CARD VALUE TO THE Dealer OBJ
  switch (input) {
    case "ACE":
      dealerHand.totalHandValue += 11
      break

    case "JACK":
      dealerHand.totalHandValue += 10
      break

    case "QUEEN":
      dealerHand.totalHandValue += 10
      break

    case "KING":
      dealerHand.totalHandValue += 10
      break

    default:
      dealerHand.totalHandValue += Number(input)
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
      let drawCardsUrl = 'https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=6'
      fetch(drawCardsUrl)
        .then(response2 => response2.json())
        .then(pulledCard => {
          //ASSIGNS THE CARD TO THE PLAYER'S HAND/ARRAY
          playerHand.cards.push(pulledCard.cards[0].image)
          playerHand.cards.push(pulledCard.cards[1].image)
          dealerHand.cards.push(pulledCard.cards[2].image)
          dealerHand.cards.push(pulledCard.cards[3].image)
          //Two extra cards in hand in case of dealer stand & assign card fetched to var
          dealerFirstHitCard = pulledCard.cards[4].image
          dealerFirstHitCardValue = pulledCard.cards[4].value
          dealerSecondHitCard = pulledCard.cards[5].image
          dealerSecondHitCardValue = pulledCard.cards[5].value

          assignCardToHand(pulledCard.cards, 0, playerHand)
          assignCardToHand(pulledCard.cards, 1, playerHand)
          assignCardToHand(pulledCard.cards, 2, dealerHand)
          assignCardToHand(pulledCard.cards, 3, dealerHand)

          renderCardsToScreen("player", playerHand)

          calculateTotal()
        })
    })
}


const calculateTotal = () => {
  if (playerHand.totalHandValue > 21) {
    declareWinner("Dealer")
  }
}

const declareWinner = (winnerChoosen) => {
  document.querySelector("#winners-circle").innerText = "WOO " + winnerChoosen + " WON THE GAME!!!!"
  console.log("WOO " + winnerChoosen + " WON THE GAME!!!!")

  console.log(playerHand.totalHandValue)
  console.log(dealerHand.totalHandValue)
}

const fetchPlayerHit = () => {
  drawCardsFetch(1)
}

const dealerStandHit = () => {
  console.log(dealerHand.totalHandValue)
  //assign card fetched to vars
  assignDealerCard(dealerFirstHitCardValue)
  dealerHand.cards.push(dealerFirstHitCard)
  console.log(dealerHand.cards)

  if (dealerHand.totalHandValue < 17) {
    dealerHand.cards.push(dealerSecondHitCard)
    assignDealerCard(dealerSecondHitCardValue)
  }
  if (dealerHand.totalHandValue > 17) {
    compareHandsForWinner
  }
}

const drawCardsFetch = (numberOfCards) => {
  let drawCardsUrl = 'https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=' + numberOfCards

  fetch(drawCardsUrl)
    .then(response2 => response2.json())
    .then(pulledCard => {
      //ASSIGNS THE CARD TO THE PLAYER'S HAND/ARRAY
      playerHand.cards.push(pulledCard.cards[0].image)
      assignCardToHand(pulledCard.cards, 0, playerHand)
      // console.log("fetched a Card.")
      newCardImg = document.createElement("img")
      newCardImg.setAttribute("src", pulledCard.cards[0].image)
      document.querySelector(`#player-cards ul li`).appendChild(newCardImg)

      calculateTotal()

    })
}

const compareHandsForWinner = () => {
  let p1 = 21 - playerHand.totalHandValue
  let d2 = 21 - dealerHand.totalHandValue

  console.log("compare p & dealer:")
  console.log(p1)
  console.log(d2)

  if (d2 > 0) {
    if (p1 < d2) {
      declareWinner("You")
    } else {
      declareWinner("THE DEALER")
    }
    // if dealer has a negative d2 number or is grossly over 21, 
  } else if (d2 < 0 || dealerHand.totalHandValue > 22) {
    declareWinner("You")
  }
}

playerStand = () => {
  if (dealerHand.totalHandValue < 17) {
    dealerStandHit()
  }
  if (dealerHand.totalHandValue > 17) {
    compareHandsForWinner()
  }
}

resetGame = () => {
  document.querySelector("#winners-circle").innerText = ""
}

document.addEventListener('DOMContentLoaded', callNewDeck)
document.querySelector('#hit-button').addEventListener('click', fetchPlayerHit)
document.querySelector('#stand-button').addEventListener('click', playerStand)
document.querySelector('#reset-button').addEventListener('click', resetGame)


// const headphoneBrand = "Bose"
// const headphonePower = 23
// const headphoneBatteryLife = 20

// const headphone ={
//   brand:'bose',
//   power :23, 
//   batteryLife:20}



