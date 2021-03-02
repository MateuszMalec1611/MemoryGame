const params = {
  WON: 'won',
  LOST: 'lost'
}

class MemoryGame {
  constructor(cardsNumber, tries, time) {
    this.cardsNumber = cardsNumber;
    this.maxTries = tries;
    this.time = time;
    this.allPairs = cardsNumber / 2;
    this.board = document.querySelector('.field');
    this.uncoverdCardsBox = document.querySelector('.cards-box');
    this.clicks = 0;
    this.pairs = 0;
    this.tries = 0;
    this.firstCardNode;
    this.timer;
    this.isActive = true;

    this.pairsText = document.querySelector('.pairs');
    this.triesText = document.querySelector('.tries');
    this.timerText = document.querySelector('.timer');

    this.boxAlert = document.querySelector('.box-alert');
    this.alert = document.querySelector('.alert-text');
    this.resetBtn = document.querySelector('.reset-button');
    this.alertBtn = document.querySelector('.alert-button');
  }

  init() {
    this.prepareCards();
    setTimeout(() => {
      this.hideCards();
      this.setTime();
      this.prepareDOMEvents();
    }, 1500);
  }

  setTime = () => {
    this.timer = setInterval(() => {
      this.time--;
      if (this.time === 0) {
        clearInterval(this.timer);
        this.showAlert(params.LOST);
      }
      if (this.time === 6) this.timerText.style.color = 'orange';
      if (this.time === 3) this.timerText.style.color = 'tomato';
      this.timerText.textContent = this.time;
    }, 1000);
  }

  prepareCards = () => {
    const cards = this.board.children;
    let duplicateNum = 1;

    for (let i = 0; i < this.cardsNumber; i++) {
      const randomNum = Math.floor(Math.random() * 12);
      const cardBack = cards[i].lastElementChild;
      cards[i].style.order = randomNum;

      if (i > 5) {
        cardBack.style.backgroundImage = `url(img/a${duplicateNum}.png)`
        cards[i].setAttribute('data-id', duplicateNum);
        duplicateNum++;
      } else {
        cardBack.style.backgroundImage = `url(img/a${i + 1}.png)`
        cards[i].setAttribute('data-id', i + 1);
      }
    }
  }

  prepareDOMEvents = () => {
    this.board.addEventListener('click', this.rotateCard);
    this.resetBtn.addEventListener('click', this.reset);
    this.alertBtn.addEventListener('click', this.reset);
  }

  hideCards = () => {
    this.board.classList.remove('show-all');
    this.isActive = true;
  }

  rotateCard = event => {
    const card = event.target.closest('.card');
    if (!card || this.clicks > 1 || card.classList.contains('rotate') || this.board.classList.contains('show-all')) return;

    this.clicks++;

    if (this.clicks === 1) {
      card.classList.add('rotate');
      return this.firstCardNode = card;
    }

    if (this.clicks === 2) {
      card.classList.add('rotate');
      setTimeout(this.compareCards, 100, card);
    }
  }

  compareCards = secondCard => {
    const firstCardId = this.firstCardNode.dataset.id;
    const secondCardId = secondCard.dataset.id;

    if (firstCardId === secondCardId) {
      this.pairs++;
      this.clicks = 0;
      this.pairsText.textContent = `${this.pairs}/${this.allPairs}`;
      [secondCard, this.firstCardNode].forEach(el => el.classList.add('found'));
      this.uncoveredPic(firstCardId, this.pairs);

      if (this.allPairs === this.pairs) {
        clearInterval(this.timer);
        this.showAlert(params.WON);
      }

    } else {

      setTimeout(() => {
        [secondCard, this.firstCardNode].forEach(el => el.classList.remove('rotate'));
        this.clicks = 0;
        this.tries++
        this.triesText.textContent = `${this.tries}/${this.maxTries}`;

        if (this.tries === this.maxTries) {
          clearInterval(this.timer);
          this.showAlert(params.LOST);
        }
      }, 900);
    }
  }

  showAlert = param => {
    switch (param) {
      case params.WON:
        console.log(`jestem`);
        this.boxAlert.style.visibility = 'visible';
        this.alert.style.color = 'yellowgreen';
        this.alert.innerText = 'wygrałeś!';
        break;
      case params.LOST:
        this.boxAlert.style.visibility = 'visible';
        this.alert.style.color = 'tomato';
        this.alert.innerText = 'przegrałeś!';
        break;

      default:
        break;
    }
  }

  uncoveredPic = (cardId, pairNumber) => {
    const boxChilds = this.uncoverdCardsBox.children;
    const boxToUncover = boxChilds[pairNumber - 1];
    const boxImageWrapper = boxToUncover.lastElementChild;

    boxImageWrapper.style.backgroundImage = `url(img/a${cardId}.png)`
    boxToUncover.classList.add('rotate');
  }

  reset = () => {
    if (this.isActive === false) return;
    const cards = this.board.children;
    const cardsBack = this.uncoverdCardsBox.children;
    
    for (let i = 0; i < this.cardsNumber; i++) {
      cards[i].classList.remove('rotate');
      cards[i].classList.remove('found');
      if (i < 6) cardsBack[i].classList.remove('rotate');
    }
    this.board.classList.add('show-all');
    this.boxAlert.style.visibility = 'hidden';
    this.pairs = 0;
    this.tries = 0;
    this.time = 10;
    this.timerText.style.color = 'greenyellow';
    this.timerText.textContent = this.time;
    this.pairsText.textContent = `0/${this.allPairs}`;
    this.triesText.textContent = `0/${this.maxTries}`;
    
    this.isActive = false;
    clearInterval(this.timer);
    this.init();
  }
}


const newGame = new MemoryGame(12, 3, 10);
newGame.init();