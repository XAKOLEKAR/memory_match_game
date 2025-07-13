const icons = [
  'https://img.icons8.com/color/96/apple.png',
  'https://img.icons8.com/color/96/orange.png',
  'https://img.icons8.com/color/96/grapes.png',
  'https://img.icons8.com/color/96/watermelon.png',
  'https://img.icons8.com/color/96/strawberry.png',
  'https://img.icons8.com/color/96/cherry.png',
  'https://img.icons8.com/color/96/kiwi.png',
  'https://img.icons8.com/color/96/pineapple.png'
];

let gameBoard = document.getElementById('game-board');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;

let flipSound, matchSound;

window.onload = () => {
  flipSound = document.getElementById('flip-sound');
  matchSound = document.getElementById('match-sound');
  startGame();
};

function startGame() {
  gameBoard.innerHTML = '';
  matchedPairs = 0;
  document.getElementById('win-popup').style.display = 'none';

  const iconPairs = [...icons, ...icons];
  iconPairs.sort(() => 0.5 - Math.random());

  iconPairs.forEach(icon => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"><img src="${icon}" alt="icon"></div>
        <div class="card-back">?</div>
      </div>
    `;

    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
  });
}

function flipCard(card) {
  if (lockBoard) return;
  if (card === firstCard) return;

  flipSound.play();
  card.classList.add('flipped');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = card;
    return;
  }

  secondCard = card;
  checkForMatch();
}

function checkForMatch() {
  const isMatch =
    firstCard.querySelector('.card-front img').src ===
    secondCard.querySelector('.card-front img').src;

  isMatch ? handleMatch() : unflipCards();
}

function handleMatch() {
  matchSound.play();
  firstCard.removeEventListener('click', () => flipCard(firstCard));
  secondCard.removeEventListener('click', () => flipCard(secondCard));
  matchedPairs++;

  if (matchedPairs === icons.length) {
    setTimeout(() => {
      document.getElementById('win-popup').style.display = 'flex';
    }, 500);
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 800);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}