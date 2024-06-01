const cardsContainer = document.getElementById('cards');
let flippedCards = [];
let matchedPairs = 0;

// Array of symbols for the cards (con códigos Unicode)
const symbols = ['\uD83D\uDC31', '\uD83D\uDC36', '\uD83D\uDC2D', '\uD83D\uDC39', '\uD83D\uDC30', '\uD83E\uDD8A', '\uD83D\uDC3B', '\uD83D\uDC3C'];

// Duplicate symbols to create pairs
const symbolsPair = symbols.concat(symbols);

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Generate cards
function generateCards() {
  shuffle(symbolsPair);
  symbolsPair.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.innerHTML = `<span class="symbol">${symbol}</span>`;
    cardsContainer.appendChild(card);
  });
}

// Flip card
function flipCard(card) {
  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    const symbol1 = card1.dataset.symbol;
    const symbol2 = card2.dataset.symbol;

    if (symbol1 === symbol2) {
      matchedPairs++;
      if (matchedPairs === symbols.length) {
        setTimeout(() => {
          alert('¡Has ganado!');
        }, 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
      }, 1000);
    }

    flippedCards = [];
  }
}

// Event listener for card clicks
cardsContainer.addEventListener('click', function(e) {
  const clickedElement = e.target;
  if (clickedElement.classList.contains('card') && !clickedElement.classList.contains('flipped')) {
    flipCard(clickedElement);
  }
});

// Generate cards when the page loads
generateCards();
