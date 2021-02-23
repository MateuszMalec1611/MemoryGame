const card = document.querySelector('.field');


const active = (e) => {
    const el = e.target.closest('.card');
    el.classList.add('rotate');    
}

card.addEventListener('click', active);
