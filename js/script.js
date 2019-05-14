window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        content = document.querySelectorAll('.info-tabcontent');

    function hideContent(hideIndex) {
        for (let i = hideIndex; i < tab.length; i++) {
            content[i].classList.remove('show');
            content[i].classList.add('hide');
        }
    }
    hideContent(1);

    function showContent(showIndex) {
        if (content[showIndex].classList.contains('hide')) {
            content[showIndex].classList.remove('hide');
            content[showIndex].classList.add('show');
        }
    }

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

    let deadline = '2019-05-18';

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
});