// бургер меню
const body = document.body;
const navIcon = document.querySelector(".header__burger");
const navLinks = document.querySelectorAll(".header__item");
const nav = document.querySelector("nav");

if (navIcon) {
  navIcon.addEventListener("click", () => {
    body.classList.toggle("lock");
    navIcon.classList.toggle("menu_active");
    nav.classList.toggle("menu_active");
  });
}

if (navLinks.length > 0) {
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (nav.classList[0] === "menu_active") {
        body.classList.remove("lock");
        navIcon.classList.remove("menu_active");
        nav.classList.remove("menu_active");
      }
    });
  });
}

// слайдер
const sliderWrapper = document.querySelector(".slider__wrapper");
const sliderLine = document.querySelector(".slider__line");
const btnLeft = document.querySelector("#slider-btn-left");
const btnRight = document.querySelector("#slider-btn-right");

let count = 0;
let visibleArea;
let numberToClick;
let widthToMove;

const sliderLineWidth = 1992.45;

function getSliderMoveInfo() {
  sliderLine.style.transform = "translateX(0px)";

  count = 0;

  disableButton(btnLeft, true);
  disableButton(btnRight, false);

  visibleArea = sliderLine.offsetWidth;

  if (window.innerWidth > 768) {
    numberToClick = 3;
  } else {
    numberToClick = 6;
  }
  widthToMove = (sliderLineWidth - visibleArea) / numberToClick;
}

getSliderMoveInfo();

window.addEventListener("resize", () => {
  getSliderMoveInfo();
  body.classList.remove("lock");
  navIcon.classList.remove("menu_active");
  nav.classList.remove("menu_active");
});

// console.log(visibleArea, numberToClick, parseFloat(widthToMove.toFixed(4)));

function disableButton(btn, disabled) {
  if (disabled) {
    btn.disabled = true;
  } else {
    btn.disabled = false;
  }
}

function moveRight() {
  count++;
  sliderLine.style.transform = `translateX(${-widthToMove * count}px)`;

  if (count > 0) disableButton(btnLeft, false);
  if (count === numberToClick) disableButton(btnRight, true);
  console.log(count);
  console.log(numberToClick);
}

function moveLeft() {
  count--;
  sliderLine.style.transform = `translateX(${-widthToMove * count}px)`;

  if (count < numberToClick) disableButton(btnRight, false);
  if (count === 0) disableButton(btnLeft, true);
  console.log(count);
  console.log(numberToClick);

  console.log(widthToMove * count);
}

btnRight.addEventListener("click", moveRight);
btnLeft.addEventListener("click", moveLeft);

// таймер
const days = document.querySelector("#days");
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");

const newYear = Date.UTC(2025, 0, 1, 0, 0, 0);

function setTimer() {
  const timeNow = new Date().getTime();
  const diffSec = (newYear - timeNow) / 1000;

  if (diffSec > 0) {
    const d = Math.floor(diffSec / 60 / 60 / 24);
    const h = Math.floor((diffSec / 60 / 60) % 24);
    const m = Math.floor((diffSec / 60) % 60);
    const s = Math.floor(diffSec % 60);

    days.innerHTML = d;
    hours.innerHTML = h;
    minutes.innerHTML = m;
    seconds.innerHTML = s;
  } else {
    days.innerHTML = 0;
    hours.innerHTML = 0;
    minutes.innerHTML = 0;
    seconds.innerHTML = 0;
    clearInterval(timerInterval);
  }
}

const timerInterval = setInterval(setTimer, 1000);
setTimer();

// секция gifts
const giftsWrapper = document.querySelector(".gifts__wrapper");

fetch("../../gifts.json")
  .then((data) => data.json())
  .then((array) => {
    const cloneArr = [...array];
    cloneArr.sort(() => Math.random() - 0.5);
    const randomCardsArr = cloneArr.slice(0, 4);

    function generateGiftsItem() {
      for (let i = 0; i < randomCardsArr.length; i++) {
        const option = randomCardsArr[i].category.split(" ")[1].toLowerCase();
        const div = document.createElement("div");
        div.className = "gifts__item";
        div.innerHTML = `
          <img src="../../assets/images/ball-${option}.svg" alt="ball" draggable="false">
          <div class="gifts__item-bottom">
            <h3 class="gifts__item-subtitle gifts__item-subtitle_${option}">${randomCardsArr[i].category}</h3>
            <h2 class="gifts__item-title">${randomCardsArr[i].name}</h2>
          </div>
        `;
        giftsWrapper.append(div);
      }
    }
    generateGiftsItem();

    // модалка
    const modal = document.querySelector("#modal");
    const modalContent = document.querySelector(".modal__content");
    const giftsCards = document.querySelectorAll(".gifts__item");

    giftsCards.forEach((card) => {
      card.addEventListener("click", (e) => {
        const clickedElem = e.target;
        const card = clickedElem.closest(".gifts__item");
        modalOpen(card);
      });
    });

    function modalOpen(element) {
      modal.classList.add("modal_active");
      createModal(element);
      document.body.classList.add("lock");
    }

    function createModal(element) {
      const cardName = element.querySelector(".gifts__item-title").textContent;
      const cardObj = array.find((card) => card.name === cardName);
      const option = cardObj.category.split(" ")[1].toLowerCase();

      modalContent.innerHTML = `
        <img src="../../assets/images/ball-${option}.svg" alt="ball" class="modal__img" draggable="false">
          <div class="modal__bottom">
            <h3 class="modal__subtitle modal__subtitle_${option}">${cardObj.category}</h3>
            <h2 class="modal__title">${cardObj.name}</h2>
            <p class="modal__descr">${cardObj.description}</p>
            <div class="modal__text">Adds superpowers to:</div>
            <div class="modal__powers-wrapper">
              <div class="modal__powers-item">
                <div class="modal__power-name">Live</div>
                <div class="modal__power-number">${cardObj.superpowers.live}</div>
                <div class="modal__power-icons" id="${cardObj.superpowers.live.slice(1)}"></div>
              </div>
              <div class="modal__powers-item">
                <div class="modal__power-name">Create</div>
                <div class="modal__power-number">${cardObj.superpowers.create}</div>
                <div class="modal__power-icons" id="${cardObj.superpowers.create.slice(1)}"></div>
              </div>
              <div class="modal__powers-item">
                <div class="modal__power-name">Love</div>
                <div class="modal__power-number">${cardObj.superpowers.love}</div>
                <div class="modal__power-icons" id="${cardObj.superpowers.love.slice(1)}"></div>
              </div>
              <div class="modal__powers-item">
                <div class="modal__power-name">Dream</div>
                <div class="modal__power-number">${cardObj.superpowers.dream}</div>
                <div class="modal__power-icons" id="${cardObj.superpowers.dream.slice(1)}"></div>
              </div>
            </div>
          </div>
          <button class="modal__close-btn"><img src="../../assets/icons/close.svg" alt="close-button" draggable="false"></button>
      `;

      const modalPowerIcons = document.querySelectorAll(".modal__power-icons");

      function addSnowflakeIcons(elements) {
        for (let i = 0; i < elements.length; i++) {
          let count = +elements[i].id;
          let iconsBox = "";

          for (let j = 0; j < 5; j++) {
            if (count > 0) {
              iconsBox += '<img src="../../assets/icons/snowflake.svg" alt="snowflake" class="modal__icon">';
              count -= 100;
            } else {
              iconsBox += '<img src="../../assets/icons/snowflake.svg" alt="snowflake" class="modal__icon modal__icon_opacity">';
            }
          }
          elements[i].insertAdjacentHTML("beforeend", iconsBox);
        }
      }
      addSnowflakeIcons(modalPowerIcons);

      const modalCloseBtn = document.querySelector(".modal__close-btn");

      function modalClose() {
        modal.classList.remove("modal_active");
        document.body.classList.remove("lock");
      }

      if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", modalClose);
      }

      modal.addEventListener('click', function (e) {
        if (!e.target.closest('.' + modal.classList[0] + '__content')) {
          console.log(modal.classList[0]);
          modalClose();
        }
      });
    }
  });
