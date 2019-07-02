window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        content = document.querySelectorAll('.info-tabcontent');

    function hideContent() {
        for (let i = 0; i < tab.length; i++) {
            content[i].classList.remove('show');
            content[i].classList.add('hide');
        }
    }
    hideContent();

    function showContent(showIndex) {
        if (content[showIndex].classList.contains('hide')) {
            content[showIndex].classList.remove('hide');
            content[showIndex].classList.add('show');
            content[showIndex].querySelector('.description-btn').addEventListener('click', showModal);
        }
    }
    showContent(0);



    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideContent(0);
                    showContent(i);
                    break;
                }
            }
        }
    });

    //timer

    let deadline = '2019-12-31';

    function getTimeRemaining(endtime) {
        let ending = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((ending / 1000) % 60),
            minutes = Math.floor((ending / 1000 / 60) % 60),
            hours = Math.floor((ending / 1000 / 60 / 60));

        return {
            'ending': ending,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            update = setInterval(activateTimer, 1000);

        function activateTimer() {
            let remaining = getTimeRemaining(endtime);
            hours.textContent = (remaining.hours >= 10 ? remaining.hours : '0' + remaining.hours);
            minutes.textContent = (remaining.minutes >= 10 ? remaining.minutes : '0' + remaining.minutes);
            seconds.textContent = (remaining.seconds >= 10 ? remaining.seconds : '0' + remaining.seconds);

            if (remaining.ending <= 0) {
                clearInterval(update);
            }
        }
    }
    setClock('timer', deadline);

    //modal window

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', showModal);
    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });
    function showModal() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }

    //Form

    let message = {
        loading: 'Loading',
        success: 'Thanks, we call you soon',
        failure: 'Ooops, something wrong'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader ('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function(event) {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

    });

    //slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {
        if (slideIndex > slides.length -1) {
            slideIndex = 0;
        }
        if (slideIndex < 0) {
            slideIndex = slides.length -1;
        }
        else {
            slideIndex = n;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex].style.display = 'block';
        dots[slideIndex].classList.add('dot-active');
    }

    prev.addEventListener('click', function(){
        showSlides(--slideIndex);
    });

    next.addEventListener('click', function() {
        showSlides(++slideIndex);
    });

    dotsWrap.addEventListener('click', function(event) {
        let target = event.target; 
        for (let i = 0; i < dots.length; i++) {
            if (target == dots[i]) {
                showSlides(i);
            }
        }
    
    });

    //calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total');

    let personsCount = 0,
        daysCount = 0,
        total = 0,
        placeCost = 0;
    const defaultCost = 4000;

    persons.addEventListener('change', function() {
        personsCount = +this.value;
        getTotal();
    });
    restDays.addEventListener('change', function() {
        daysCount = +this.value;
        getTotal();     
    });

    place.addEventListener('change', function() {
        getTotal();
    });
    function getTotal() {
        placeCost = +place.value * defaultCost;
        total = (personsCount * daysCount) * placeCost;
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerText = 0;
        }
        else {
            totalValue.innerText = total;
        }
    }

});
