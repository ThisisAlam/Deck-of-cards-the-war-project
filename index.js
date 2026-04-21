let deckId = null
let remainingCards = 0
let card1 = []
let card2 = []  
document.getElementById('draw-cards').disabled = true; // Disable draw button until a new deck is created

document.getElementById('new-deck').addEventListener('click', async () => {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const data = await response.json();
    console.log('API response for new deck:', data);
    deckId = data.deck_id;
    console.log('New deck created:', deckId + ' with ' + data.remaining + ' cards remaining.');
    remainingCards = data.remaining;
    document.getElementById('remaining-count').textContent = remainingCards;
    
    document.getElementById('draw-cards').disabled = false; // Enable draw button now that a new deck is created
})

document.getElementById('draw-cards').addEventListener('click', async () => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
    const data = await response.json();
    console.log('API response for drawing cards:', data);
    
    remainingCards = data.remaining;
    document.getElementById('remaining-count').textContent = remainingCards;
    card1 = data.cards[0];
    card2 = data.cards[1];
    console.log('Card 1 drawn:', card1.code, 'Card 2 drawn:', card2.code);
    document.querySelector('.card-slot1').innerHTML = `<img id="computer-card" src="${card1.image}" alt="Computer's card">`;
    document.querySelector('.card-slot2').innerHTML = `<img id="user-card" src="${card2.image}" alt="Your card">`;  
    if(remainingCards === 0) {
        alert('No more cards in the deck! Please shuffle a new deck.');
        document.getElementById('draw-cards').disabled = true;
    }
})