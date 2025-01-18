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

window.addEventListener("resize", () => {
  body.classList.remove("lock");
  navIcon.classList.remove("menu_active");
  nav.classList.remove("menu_active");
  checkScroll();
});
// карточки секции gifts
const tabs = document.querySelectorAll(".gifts__tab");

const allWrapper = document.querySelector("#category-all");
const workWrapper = document.querySelector("#category-work");
const healthWrapper = document.querySelector("#category-health");
const harmonyWrapper = document.querySelector("#category-harmony");

fetch("../../gifts.json")
  .then((data) => data.json())
  .then((array) => {
    const categoryAllMixed = [...array];
    categoryAllMixed.sort(() => Math.random() - 0.5);
    const categoryWorkArr = [...array].filter((item) => item.category === "For Work");
    const categoryHealthArr = [...array].filter((item) => item.category === "For Health");
    const categoryHarmonyArr = [...array].filter((item) => item.category === "For Harmony");

    function generateGiftsItem(arr, wrapper) {
      for (let i = 0; i < arr.length; i++) {
        const option = arr[i].category.split(" ")[1].toLowerCase();
        const div = document.createElement("div");
        div.className = "gifts__item";
        div.innerHTML = `
          <img src="../../assets/images/ball-${option}.svg" alt="ball">
          <div class="gifts__item-bottom">
            <h3 class="gifts__item-subtitle gifts__item-subtitle_${option}">${arr[i].category}</h3>
            <h2 class="gifts__item-title">${arr[i].name}</h2>
          </div>
        `;
        wrapper.append(div);
      }
    }

    generateGiftsItem(categoryAllMixed, allWrapper);
    generateGiftsItem(categoryWorkArr, workWrapper);
    generateGiftsItem(categoryHealthArr, healthWrapper);
    generateGiftsItem(categoryHarmonyArr, harmonyWrapper);

    function activeCategory(wrapper, tab) {
      document.querySelectorAll(".gifts__category-wrapper").forEach((category) => (category.style.display = "none"));
      document.querySelectorAll(".gifts__tab").forEach((btn) => (btn.disabled = false));
      wrapper.style.display = "flex";
      document.querySelector(`#${tab}`).disabled = true;
    }

    activeCategory(allWrapper, "all");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        switch (tab.id) {
          case "all":
            activeCategory(allWrapper, tab.id);
            break;
          case "work":
            activeCategory(workWrapper, tab.id);
            break;
          case "health":
            activeCategory(healthWrapper, tab.id);
            break;
          case "harmony":
            activeCategory(harmonyWrapper, tab.id);
            break;
          default:
            console.log("Unknown category");
        }
      });
    });

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

      modal.addEventListener("click", function (e) {
        if (!e.target.closest("." + modal.classList[0] + "__content")) {
          console.log(modal.classList[0]);
          modalClose();
        }
      });
    }
  });

// кнопка скролла
const scrollBtn = document.querySelector(".arrow-up-btn");

function checkScroll() {
  if (window.scrollY >= 300 && window.innerWidth <= 768) {
    scrollBtn.classList.add("arrow-up-btn_active");
  } else {
    scrollBtn.classList.remove("arrow-up-btn_active");
  }
}

window.addEventListener("scroll", checkScroll);

scrollBtn.addEventListener("click", () => {
  window.scrollTo(0, 0);
});
