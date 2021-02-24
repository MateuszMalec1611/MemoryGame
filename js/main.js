'user strict';
let $field;
let $allCards;
let $cards;
let $cardsBackScores;
let $allCardsScores;
let $triesText;
let $pairsText;
let $boxAlert;
let $alert;
let $alertBtn;


let $allPairs = 6; //all possible pairs to be obtained
let $clicks = 1; //increments to two clicks
let $firstEl; //first card
let $secondEl; //seckond card 
let $toCompare; //all card processed to string
let $toCompare2; //all card processed to string
let $pairs = 1; //counts pairs
let $tries = 1; //counts tries
let $scoreCard; // stores information about the number of the card that found the pair
let u = 1;


const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
    assignPictures();
}

const prepareDOMElements = () => {
    $field = document.querySelector('.field');
    $allCards = document.querySelectorAll('.card');
    $cards = document.querySelectorAll('.card-back');
    $cardsBackScores = document.querySelectorAll('.card-back-scores');
    $allCardsScores = document.querySelectorAll('.card-scores');
    $triesText = document.querySelector('.tries');
    $pairsText = document.querySelector('.pairs');
    $boxAlert = document.querySelector('.box-alert');
    $alert = document.querySelector('.alert-text');
    $alertBtn = document.querySelector('.alert-button');
}

const prepareDOMEvents = () => {
    $field.addEventListener('click', active);
    $alertBtn.addEventListener('click', reset);
}


const assignPictures = () => {
    let cardsNumber = 12;
    let nums = [];
    let ranNums = [];

    for (let i = 1; i <= 2; i++) {
        for (let y = 1; y <= $allPairs; y++) {
            nums.push(y) //assigns counts from 1 to 6 twice
        }
    }

    for (nums, i = nums.length; i--;) {
        ranNums[i] = nums.splice(Math.floor(Math.random() * (i + 1)), 1)[0]; //mixes the numbers and assigns them to a new array
    }

    $cards.forEach(el => {
        cardsNumber--;
        el.classList.add(ranNums[cardsNumber]); //assigns a class with a photo number to each card
        el.style.backgroundImage = 'url(./img/a' + ranNums[cardsNumber] + '.png)'; //assigns a random photo to the card

    });
}

const active = e => {
    if ($clicks > 2) {
        active();
    }

    const el = e.target.closest('.card');

    if (el.classList.contains('rotate')) {
        return;
    } else {
        el.classList.add('rotate');
    }

    $clicks === 1 ? $toCompare = el.innerHTML : $toCompare2 = el.innerHTML; //cards processed to string
    $clicks === 1 ? $firstEl = el : $secondEl = el; // cards assigned to the new variable

    let arr = [].slice.call(el.children); // extracting information about the card number
    $scoreCard = arr[1].classList.item(1); // assigning information about a card number to a variable

    if ($clicks === 2) { //if two cards are selected it calls a function that compares them
        setTimeout(compare, 1400);
    }
    $clicks++;
}

const compare = () => {
    if ($toCompare === $toCompare2) {
        $firstEl.style.transform = 'scale(.6)';
        $secondEl.style.transform = 'scale(.6)';
        $pairsText.innerText = `${$pairs}/6`;
        uncoveredPic();

        if ($pairs === $allPairs) {
            showAlert();
        }
        $clicks = 1;
        $pairs++;

    } else { // if the cards do not match, then flips them back
        $firstEl.classList.remove('rotate');
        $secondEl.classList.remove('rotate');
        $triesText.innerText = `${$tries}/8`;
        $tries >= 8 ? showAlert() : $tries++;
        $clicks = 1;
    }
}

const showAlert = () => {
    if ($pairs === $allPairs) {
        $boxAlert.style.visibility = 'visible';
        $alert.style.color = 'yellowgreen';
        $alert.innerText = 'wygrałeś!';

    } else {
        $boxAlert.style.visibility = 'visible';
        $alert.style.color = 'tomato';
        $alert.innerText = 'przegrałeś!';
    }
}

const uncoveredPic = () => {
    let arr1 = [];
    let arr2 = [];
    let i = 0;
    $allCardsScores.forEach(el => {
        arr1[i] = el;
        i++;
    });
    arr1[$pairs - 1].classList.add('rotate');
    i = 0;

    $cardsBackScores.forEach(el => {
        arr2[i] = el;
        i++
    });
    arr2[$pairs - 1].style.backgroundImage = 'url(./img/a' + $scoreCard + '.png)';
}

const reset = () => {
    let classToRemove;

    $allCards.forEach(el => {
        el.classList.remove('rotate');
        el.removeAttribute('style');
    });
    $cards.forEach(el => {
        classToRemove = el.classList.item(1);
        el.classList.remove(classToRemove);
    });
    $allCardsScores.forEach(el => {
        el.classList.remove('rotate');
    });
    $boxAlert.style.visibility = 'hidden';
    $pairsText.innerText = '0/6';
    $triesText.innerText = '0/8';
    $pairs = 1;
    $tries = 1;
    main();
}


document.addEventListener('DOMContentLoaded', main);