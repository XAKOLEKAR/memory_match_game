let currentLevel = 1;
const maxLevel = 20;
let moveCount = 0;
let timeElapsed = 0;
let timerInterval;

let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let matchedPairs = 0;

const imageUrls = [
  'https://img.icons8.com/color/100/apple.png',
  'https://img.icons8.com/color/100/banana.png',
  'https://img.icons8.com/color/100/strawberry.png',
  'https://img.icons8.com/color/100/orange.png',
  'https://img.icons8.com/color/100/grapes.png',
  'https://img.icons8.com/color/100/pear.png',
  'https://img.icons8.com/color/100/pineapple.png',
  'https://img.icons8.com/color/100/watermelon.png',
  'https://img.icons8.com/color/100/kiwi.png',
  'https://img.icons8.com/color/100/peach.png',
  'https://img.icons8.com/color/100/cherries.png',
  'https://img.icons8.com/color/100/lemon.png',
  'https://img.icons8.com/color/100/coconut.png',
  'https://img.icons8.com/color/100/blueberry.png',
  'https://img.icons8.com/color/100/mango.png',
  'https://img.icons8.com/color/100/fig.png',
  'https://img.icons8.com/color/100/pomegranate.png',
  'https://img.icons8.com/color/100/dragon-fruit.png',
  'https://img.icons8.com/color/100/papaya.png',
  'https://img.icons8.com/color/100/avocado.png',
  'https://img.icons8.com/color/100/dog.png',
  'https://img.icons8.com/color/100/cat.png',
  'https://img.icons8.com/color/100/elephant.png',
  'https://img.icons8.com/color/100/lion.png',
  'https://img.icons8.com/color/100/panda.png',
  'https://img.icons8.com/color/100/tiger.png',
  'https://img.icons8.com/color/100/koala.png',
  'https://img.icons8.com/color/100/monkey.png',
  'https://img.icons8.com/color/100/fox.png',
  'https://img.icons8.com/color/100/rabbit.png',
  'https://img.icons8.com/color/100/wolf.png',
  'https://img.icons8.com/color/100/bear.png',
  'https://img.icons8.com/color/100/duck.png',
  'https://img.icons8.com/color/100/owl.png',
  'https://img.icons8.com/color/100/chicken.png',
  'https://img.icons8.com/color/100/penguin.png',
  'https://img.icons8.com/color/100/parrot.png',
  'https://img.icons8.com/color/100/swan.png',
  'https://img.icons8.com/color/100/cow.png',
  'https://img.icons8.com/color/100/sheep.png',
  'https://img.icons8.com/color/100/goat.png',
  'https://img.icons8.com/color/100/mouse.png',
  'https://img.icons8.com/color/100/rat.png',
  'https://img.icons8.com/color/100/deer.png',
  'https://img.icons8.com/color/100/frog.png',
  'https://img.icons8.com/color/100/hedgehog.png',
  'https://img.icons8.com/color/100/squirrel.png',
  'https://img.icons8.com/color/100/hamster.png',
  'https://img.icons8.com/color/100/turtle.png',
  'https://img.icons8.com/color/100/camel.png',
  'https://img.icons8.com/color/100/horse.png',
  'https://img.icons8.com/color/100/dolphin.png',
  'https://img.icons8.com/color/100/octopus.png',
  'https://img.icons8.com/color/100/shark.png',
  'https://img.icons8.com/color/100/whale.png',
  'https://img.icons8.com/color/100/seal.png',
  'https://img.icons8.com/color/100/starfish.png',
  'https://img.icons8.com/color/100/crocodile.png',
  'https://img.icons8.com/color/100/snail.png',
  'https://img.icons8.com/color/100/bee.png',
  'https://img.icons8.com/color/100/butterfly.png',
  'https://img.icons8.com/color/100/unicorn.png',
  'https://img.icons8.com/color/100/owl.png',
  'https://img.icons8.com/color/100/whale.png',
  'https://img.icons8.com/color/100/shark.png',
  'https://img.icons8.com/color/100/fox.png',
  'https://img.icons8.com/color/100/zebra.png',
  'https://img.icons8.com/color/100/peacock.png',
  'https://img.icons8.com/color/100/lobster.png',
  'https://img.icons8.com/color/100/sloth.png'
];

function restartFromLevel1() {
  currentLevel = 1;
  startGame();
}

function startGame() {
  clearInterval(timerInterval);
  timeElapsed = 0;
  moveCount = 0;
  matchedPairs = 0;
  hasFlippedCard = false;
  lockBoard = false;
  document.getElementById('timer').textContent = 0;
  document.getElementById('moves').textContent = 0;
  document.getElementById('level').textContent = currentLevel;
  document.getElementById('popup').style.display = 'none';

  const board = document.getElementById('game-board');
  board.classList.add('fade-out');

  setTimeout(() => {
    board.classList.remove('fade-out');
    board.innerHTML = '';

    let gridSize = currentLevel === 1 ? 2 :
                   currentLevel <= 4 ? 4 :
                   currentLevel <= 7 ? 6 :
                   currentLevel <= 11 ? 8 :
                   currentLevel <= 15 ? 10 : 12;

    let totalCards = gridSize * gridSize;
    let pairCount = totalCards / 2;

    let chosenIcons = [];
    while (chosenIcons.length < pairCount) {
      chosenIcons = chosenIcons.concat(imageUrls);
    }
    chosenIcons = chosenIcons.slice(0, pairCount);

    let cardIcons = [...chosenIcons, ...chosenIcons];
    cardIcons.sort(() => 0.5 - Math.random());

    board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    cardIcons.forEach(url => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.icon = url;
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front"><img src="${url}" alt="" /></div>
          <div class="card-back">?</div>
        </div>
      `;
      card.addEventListener('click', () => flipCard(card));
      board.appendChild(card);
    });

    timerInterval = setInterval(() => {
      timeElapsed++;
      document.getElementById('timer').textContent = timeElapsed;
    }, 1000);
  }, 400);
}

function flipCard(card) {
  if (lockBoard || card.classList.contains('flipped')) return;

  document.getElementById('flip-sound').play();
  card.classList.add('flipped');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = card;
    return;
  }

  secondCard = card;
  moveCount++;
  document.getElementById('moves').textContent = moveCount;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.icon === secondCard.dataset.icon) {
    document.getElementById('match-sound').play();
    matchedPairs++;

    if (matchedPairs === (document.querySelectorAll('.card').length / 2)) {
      clearInterval(timerInterval);
      document.getElementById('popup').style.display = 'flex';
    }

    resetBoard();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetBoard();
    }, 800);
  }
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function nextLevel() {
  if (currentLevel < maxLevel) {
    currentLevel++;
  } else {
    currentLevel = 1;
  }
  startGame();
}

window.onload = startGame;
