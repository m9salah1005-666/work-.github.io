function openCurtains() {
    const curtain = document.getElementById('curtain');
    const mainContent = document.getElementById('main-content');
    
    curtain.classList.add('opened');
    
    setTimeout(() => {
        mainContent.classList.add('visible');
        setTimeout(() => {
            curtain.style.display = 'none';
        }, 1500);
    }, 500);
}

const targetDate = new Date("August 12, 2026 19:00:00").getTime();

const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference < 0) {
        clearInterval(countdownInterval);
        document.querySelector(".timer-container").innerHTML = "<h3 style='color: #e2b25c; width: 100%; text-align: center; font-family: sans-serif;'>لقد بدأت مراسم الزفاف الآن! 🎉</h3>";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}, 1000);

function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const allContents = document.querySelectorAll('.accordion-content');
    const allHeaders = document.querySelectorAll('.accordion-header');

    allContents.forEach((item) => {
        if (item !== content) {
            item.style.maxHeight = null;
        }
    });
    allHeaders.forEach((item) => {
        if (item !== header) {
            item.querySelector('span').innerText = '+';
        }
    });

    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        header.querySelector('span').innerText = '+';
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        header.querySelector('span').innerText = '-';
    }
}