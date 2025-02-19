const cardBody = document.getElementsByClassName('card__body')[0];
const expandBtn = document.getElementById("expand_btn");
const arrowBtns = document.getElementsByClassName('arrow_btn');

let isTriggered = false;

let swiper;

document.addEventListener('DOMContentLoaded', () => {
    initializeSwiper();
    onUpdate(); 
});


const initializeSwiper = () => {
    swiper = new Swiper('.swiper', {
        slidesPerView: 1.25,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        hashNavigation: {
            watchState: true,
        },
    });
};


const onUpdate = () => {
    const matchMobileQuery = window.matchMedia('(min-width:320px) and (max-width: 767px)');
    const childrens = cardBody.children.length;

    if (!matchMobileQuery.matches) {

        if (swiper) {
            swiper.destroy(true, true);
            swiper = null;
        }

        const card = document.getElementsByClassName('card')[0];

        const swiperSlides = document.getElementsByClassName('swiper-slide');
        for (const slide of swiperSlides) {
            slide.classList.remove('swiper-slide');
            slide.classList.remove('swiper-slide-active');
        }

        const swiperWrapper = document.getElementsByClassName('swiper-wrapper')[0];
        if (swiperWrapper !== undefined) {
            swiperWrapper.classList.remove('swiper-wrapper');
            card.style.display = 'flex';
        }
    } else {

        const card = document.getElementsByClassName('card')[0];
        const listItems = document.getElementsByClassName('card__btn__list');


        for (const listItem of listItems) {
            listItem.classList.add('swiper-slide');
        }


        cardBody.classList.add('swiper-wrapper');

        card.style.display = 'block';


        if (!swiper) {
            initializeSwiper();
        }
    }


    for (let i = 0; i < childrens; i++) {
        cardBody.children[i].style.display = 'flex';
    }

    if (!matchMobileQuery.matches && !isTriggered) {
        const columnSize = window.getComputedStyle(cardBody).gridTemplateColumns.split(' ').length * 2;
        for (let i = columnSize; i <= childrens - 1; i++) {
            cardBody.children[i].style.display = 'none';
        }
    }

    if (matchMobileQuery.matches) {

        for (let i = 0; i < arrowBtns.length; i++) {
            arrowBtns[i].style.display = 'none';
        }
    } else {
        for (let i = 0; i < arrowBtns.length; i++) {
            arrowBtns[i].style.display = 'flex';
        }


        if (isTriggered) {
            expandBtn.querySelector('img').setAttribute('src', 'images/iconUp.svg');
            expandBtn.getElementsByClassName('textcontent')[0].innerHTML = 'Скрыть';
        } else {
            expandBtn.querySelector('img').setAttribute('src', 'images/expandd.svg');
            expandBtn.getElementsByClassName('textcontent')[0].innerHTML = 'Показать все';
        }
    }
};


window.addEventListener('resize', () => {
    onUpdate();
});


expandBtn.addEventListener('click', () => {
    isTriggered = !isTriggered;
    onUpdate();
});
