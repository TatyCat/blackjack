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
// document.querySelector('.cards').textContent = map.playerHand.card{}


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
          console.log(pulledCard)
          //ASSIGNS THE CARD TO THE PLAYER'S HAND/ARRAY
          playerHand.cards.push(pulledCard.cards[0].code)
          playerHand.cards.push(pulledCard.cards[1].code)
          dealerHand.cards.push(pulledCard.cards[2].code)
          dealerHand.cards.push(pulledCard.cards[3].code)
          //Two extra cards in hand in case of dealer stand & assign card fetched to var
          dealerFirstHitCard = pulledCard.cards[4].code
          dealerFirstHitCardValue = pulledCard.cards[4].value
          dealerSecondHitCard = pulledCard.cards[5].code
          dealerSecondHitCardValue = pulledCard.cards[5].value

          assignCardToHand(pulledCard.cards, 0, playerHand)
          assignCardToHand(pulledCard.cards, 1, playerHand)
          assignCardToHand(pulledCard.cards, 2, dealerHand)
          assignCardToHand(pulledCard.cards, 3, dealerHand)

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
  console.log("WOO " + winnerChoosen + " WON THE GAME!!!!")

  console.log(playerHand.totalHandValue)
  console.log(dealerHand.totalHandValue)
}

const fetchPlayerHit = () => {
  drawCardsFetch(1)
}

const dealerStandHit = () => {
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
      playerHand.cards.push(pulledCard.cards[0].code)
      assignCardToHand(pulledCard.cards, 0, playerHand)
      console.log("fetched a Card.")
      calculateTotal()
    })
}

const compareHandsForWinner = () => {
  let p1 = 21 - playerHand.totalHandValue
  let p2 = 21 - dealerHand.totalHandValue

  console.log("compare p & dealer:")
  console.log(p1)
  console.log(p2)
  if (p2 >= 0) {
    if (p1 < p2) {
      declareWinner("You")
    } else {
      declareWinner("THE DEALER")
    }
  } else {
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


document.addEventListener('DOMContentLoaded', callNewDeck)
document.querySelector('#hit-button').addEventListener('click', fetchPlayerHit)
document.querySelector('#stand-button').addEventListener('click', playerStand)


// const headphoneBrand = "Bose"
// const headphonePower = 23
// const headphoneBatteryLife = 20

// const headphone ={
//   brand:'bose',
//   power :23, 
//   batteryLife:20}



