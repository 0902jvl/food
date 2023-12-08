window.addEventListener("DOMContentLoaded", () => {
    // Tabs
    const tabs = document.querySelectorAll(".tabheader__item");
    const tabsContent = document.querySelectorAll(".tabcontent");
    const tabParent = document.querySelector(".tabheader__items");

    function hideTabsContent() {
        tabsContent.forEach((item) => {
            item.style.display = "none";
        });
        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active")
        });
    };

    function showTabsContent(i = 0) {
        tabsContent[i].style.display = "block";
        tabs[i].classList.add("tabheader__item_active");
    };

    hideTabsContent();
    showTabsContent();

    tabParent.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });


    // Timer
    const deadLine = "2023-12-31";

    function getTimeRemaining(endtime) {
        let day;
        let hour;
        let minutes;
        let seconds;
        const t = Date.parse(new Date(endtime)) - Date.parse(new Date());
        if (t <= 0) {
            day = 0;
            hour = 0;
            minutes = 0;
            seconds = 0;
        } else {
            day = Math.floor(t / (1000 * 60 * 60 * 24));
            hour = Math.floor(t / (1000 * 60 * 60) % 24);
            minutes = Math.floor(t / (1000 * 60) % 60);
            seconds = Math.floor(t / (1000) % 60);
        }
        return {
            "total": t,
            "day": day,
            "hour": hour,
            "minutes": minutes,
            "seconds": seconds
        };
    }
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector("#days");
        const hours = timer.querySelector("#hours");
        const minutes = timer.querySelector("#minutes");
        const seconds = timer.querySelector("#seconds");
        const setTimer = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.day);
            hours.innerHTML = getZero(t.hour);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(setTimer);
            }
        }
    }

    setClock(".timer", deadLine);

    // Modal
    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector(".modal");
    const modalClose = document.querySelector("[data-close]");

    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(trigerTimer);
    };

    modalTrigger.forEach((btn) => {
        btn.addEventListener("click", openModal);
    });

    function clousModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    };
    modalClose.addEventListener("click", clousModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            clousModal();
        }
    });

    document, addEventListener("keydown", (event) => {
        if (event.code.toLowerCase() === "escape" && modal.classList.contains("show")) {
            clousModal();
        }
    });

    // const trigerTimer = setTimeout(openModal, 5000);

    window.addEventListener("scroll", () => {
        if (window.scrollY + document.documentElement.clientHeight == window.scrollHeight) {
            openModal();

        }
    });

    // Использум классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement("div");
            if (this.classes.length === 0) {
                this.element = "menu__item";
                element.classList.add(this.element);
            } else {
                this.classes.forEach((className) => {
                    element.classList.add(className);
                });
            }
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>               
                `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        "menu__item",
        "big"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container",
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container",
        "menu__item"
    ).render();

    // Form

    const forms = document.querySelectorAll("form");
    const massge = {
        landing: "Загрузка",
        saccess: "Спасибо мы скорос вяжемся с вами",
        failure: "Ошибка"
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMassege = document.createElement("div");
            statusMassege.classList.add("status");
            statusMassege.textContent = massge.landing;
            form.append(statusMassege);

            const request = new XMLHttpRequest();
            request.open('POST', "server.php");
            // request.setRequestHeader('Content-Type', )
            const formData = new FormData(form);

            request.send(formData);

            request.addEventListener("load", () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMassege.textContent = massge.saccess;
                } else {
                    statusMassege.textContent = massge.failure;
                }

            });
        });
    }

});

