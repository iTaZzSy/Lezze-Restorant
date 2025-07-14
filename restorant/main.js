
function startCountdown() {
    let countdownDate = localStorage.getItem('countdownDate');

    if (!countdownDate) {
        countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 10);
        localStorage.setItem('countdownDate', countdownDate);
    } else {
        countdownDate = new Date(countdownDate);
    }

    const timer = setInterval(function () {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdown-days").textContent = days.toString().padStart(2, "0");
        document.getElementById("countdown-hours").textContent = hours.toString().padStart(2, "0");
        document.getElementById("countdown-minutes").textContent = minutes.toString().padStart(2, "0");
        document.getElementById("countdown-seconds").textContent = seconds.toString().padStart(2, "0");

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("countdown-days").textContent = "00";
            document.getElementById("countdown-hours").textContent = "00";
            document.getElementById("countdown-minutes").textContent = "00";
            document.getElementById("countdown-seconds").textContent = "00";
            localStorage.removeItem('countdownDate');
        }
    }, 1000);
}
function updatePhoneNumbers() {
    const phoneElements = document.querySelectorAll('.phone');
    const phoneNumber = getComputedStyle(document.documentElement).getPropertyValue('--main-phone').trim();

    phoneElements.forEach(element => {
        element.textContent = phoneNumber;
    });

}

document.addEventListener('DOMContentLoaded', updatePhoneNumbers);
window.addEventListener('DOMContentLoaded', startCountdown);
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    function setLanguage(lang) {
        localStorage.setItem('language', lang);

        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                if (el.querySelector('i')) {
                    if (el.firstChild && el.firstChild.nodeType === Node.TEXT_NODE) {
                        el.firstChild.textContent = translations[lang][key] + ' ';
                    } else {
                        el.insertBefore(document.createTextNode(translations[lang][key] + ' '), el.firstChild);
                    }
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }

    const savedLang = localStorage.getItem('language') || 'ar';
    setLanguage(savedLang);
});

const menuTabs = document.querySelectorAll('.menu-tab');
const menuItems = document.querySelectorAll('.menu-item');

const tabCategories = ['main', 'appetizer', 'drinks', 'desserts'];
menuTabs.forEach((tab, idx) => {
    tab.setAttribute('data-category', tabCategories[idx]);
});

function setActiveTab(clickedTab) {
    menuTabs.forEach(tab => tab.classList.remove('active'));
    clickedTab.classList.add('active');

    const category = clickedTab.getAttribute('data-category');
    menuItems.forEach(item => {
        if (item.getAttribute('data-category') === category) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    menuItems.forEach(item => {
        item.style.display = item.getAttribute('data-category') === 'main' ? '' : 'none';
    });
});

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => setActiveTab(tab));
});