
/* Initial Conditions */
let deckId = null
let remainingCards = 0
let card1 = null
let card2 = null  
let cardOneValue = 0
let cardTwoValue = 0
let cardOneValueEachCard = 0
let cardTwoValueEachCard = 0
const valueMap = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "JACK": 11,
  "QUEEN": 12,
  "KING": 13,
  "ACE": 14
}
document.getElementById('draw-cards').disabled = true; // Disable draw button until a new deck is created

/* Functions */
function winOrLose(){
    if(remainingCards === 0) {
        if(cardOneValue>cardTwoValue){
            document.getElementById('status-text').textContent='STATUS: COMPUTER IS THE WINNER'
        } else if(cardOneValue<cardTwoValue){
            document.getElementById('status-text').textContent='STATUS: YOU ARE THE WINNER'
        } else {
            document.getElementById('status-text').textContent='STATUS: GAME IS A TIE'
        }
        alert('No more cards in the deck! Please shuffle a new deck.');
        document.getElementById('draw-cards').disabled = true;
    }
}
function cardValues(cardValue){
    return  valueMap[cardValue]
}
async function newDeckCard(){
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const data = await response.json();
    console.log('API response for new deck:', data);
    deckId = data.deck_id;
    console.log('New deck created:', deckId + ' with ' + data.remaining + ' cards remaining.');
    remainingCards = data.remaining;
    document.getElementById('remaining-count').textContent = remainingCards;
    document.getElementById('draw-cards').disabled = false; // Enable draw button now that a new deck is created
}
async function drawCards(){
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
    const data = await response.json();
    console.log('API response for drawing cards:', data);
    
    remainingCards = data.remaining;
    document.getElementById('remaining-count').textContent = remainingCards;
    card1 = data.cards[0];
    card2 = data.cards[1];
    console.log('Card 1 drawn:', card1.code, 'Card 2 drawn:', card2.code);

    document.getElementById('computer-card').src = `${card1.image}`;
    document.getElementById('user-card').src = `${card2.image}`;  
    
    cardOneValue += cardValues(card1.value)
    cardTwoValue += cardValues(card2.value)
    cardOneValueEachCard = cardValues(card1.value)
    cardTwoValueEachCard = cardValues(card2.value)
    console.log(cardOneValue)
    console.log(cardTwoValue)
    document.getElementById('total-computer-score').textContent = cardOneValue
    document.getElementById('total-user-score').textContent = cardTwoValue
    document.getElementById('computer-score').textContent = cardOneValueEachCard
    document.getElementById('user-score').textContent = cardTwoValueEachCard
    if(cardOneValue>cardTwoValue){
        document.getElementById('status-text').textContent='STATUS: COMPUTER IS WINNING'
    } else if(cardOneValue<cardTwoValue){
        document.getElementById('status-text').textContent='STATUS: YOU ARE WINNING'
    } else {
        document.getElementById('status-text').textContent='STATUS: IT\'S A TIE GAME'
    }
    winOrLose()
}

/* Handle buttons */
document.getElementById('new-deck').
addEventListener('click', newDeckCard)

document.getElementById('draw-cards').
addEventListener('click', drawCards)

const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme");
});

document.body.classList.add("deck-loaded");

// remove effect after a short time
setTimeout(() => {
    document.body.classList.remove("deck-loaded");
}, 800);