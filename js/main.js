'user strict';
const field = document.querySelector('.field');
const cards = document.querySelectorAll('.card-back');
const allCards = document.querySelectorAll('.card');
const tries = document.querySelector('.tries');
const pairs = document.querySelector('.pairs');
const boxAlert = document.querySelector('.box-alert');
const alert = document.querySelector('.alert-text');
const alertBtn = document.querySelector('.alert-button');

let $allPairs = 6;
let $clicks = 1;
let $firstEl;
let $secondEl;
let $toCompare;
let $toCompare2;
let $pairs = 1;
let $tries = 1;

const assignPictures = () => {
    let cardsNumber = 12;
    let nums = [];
    let ranNums = [];

    for (let i = 1; i <= 2; i++) {
        for (let y = 1; y <= $allPairs; y++) {
            nums.push(y)
        }
    }

    for (nums, i = nums.length; i--;) {
        ranNums[i] = nums.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    }

    cards.forEach(el => {
        cardsNumber--;
        el.classList.add(ranNums[cardsNumber]);
        el.style.backgroundImage = 'url(/img/' + ranNums[cardsNumber] + '.jpg)';
    });
}
assignPictures();


const active = e => {

    const el = e.target.closest('.card');

    if (el.classList.contains('rotate')) {
        return;
    } else {
        el.classList.add('rotate');
    }

    $clicks === 1 ? $toCompare = el.innerHTML : $toCompare2 = el.innerHTML;
    $clicks === 1 ? $firstEl = el : $secondEl = el;


    if ($clicks === 2) {
        setTimeout(compare, 1500);
    }

    $clicks === 2 ? $clicks = 1 : $clicks++;
}

const compare = () => {
    if ($toCompare === $toCompare2) {
        $firstEl.style.transform = 'scale(.6)';
        $secondEl.style.transform = 'scale(.6)';
        pairs.innerText = $pairs;
        tries.innerText = $tries;

        if ($pairs === $allPairs) {
            showAlert();
        }

        $tries++;
        $pairs++;
    } else {
        $firstEl.classList.remove('rotate');
        $secondEl.classList.remove('rotate');
        tries.innerText = $tries;

        $tries >= 30 ? showAlert() : $tries++;
    }
}

const showAlert = () => {
    if ($pairs === $allPairs) {
        boxAlert.style.visibility = 'visible';
        alert.style.color = 'yellowgreen';
        alert.innerText = 'wygrałeś!';

    } else {
        boxAlert.style.visibility = 'visible';
        alert.style.color = 'tomato';
        alert.innerText = 'przegrałeś!';

    }
}

field.addEventListener('click', active);

