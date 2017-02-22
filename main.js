'use strict';

$(function() {
    var random = randomIntMinMax,
        sky = $('.sky'),
        planes,
        plane,
        count,
        k = 3000,
        message = $('.message'),
        check = $('.check'),
        add = $('.add-items');

    initSky();
    initControls();

    function initSky() {
        plane = $('.plane');
        $('.planes').empty();
        planes = $('.planes');
        sky.empty();
    }

    function initControls() {
        check.hide();
        add.on('click', start);
        $('.count').keydown(function(e) {
            if (e.keyCode === 13) {
                start();
            }
        });
        check.on('click', checkAnswers);
    }

    function start() {
        addItems();
        var timer = count * k;
        addTimer(timer);
        setTimeout(toggleItems, timer);
    }

    function generatePlane() {
        var newPlane = plane.clone();
        var currentId = generateId(2, 3);
        newPlane.css(randomPos());
        newPlane.find('.plane-id').text(currentId);
        newPlane.find('.plane-id-user').hide();
        return newPlane;
    }


    function addItems() {
        sky.empty();
        planes.empty();
        count = +$('.count').val();
        count = isNumeric(count) ? count : 1;
        count = count <= 5 ? count : 5;
        var result = '';

        for (let i = 0; i < count; i++) {
            planes.append(generatePlane());
        }

        sky.append(planes);
    }

    function addTimer(timer) {
        var seconds = timer / 1000;
        message.text('Time remaining: ' + seconds);
        seconds--;

        function startTimer() {
            message.text('Time remaining: ' + seconds);
            seconds--;
            if (seconds < 0) {
                clearInterval(intervalId);
                message.text('Input planes IDs');
            }
        }
        var intervalId = setInterval(startTimer, 1000);
    }

    function toggleItems() {
        add.toggle();
        check.toggle();
        $('.plane-id').toggle();
        $('.plane-id-user').toggle();
    }

    function checkAnswers() {
        var correctCount = 0;
        $('.plane-id-user').each(function() {
            if ($(this).val() == $(this).parent().find('.plane-id').text()) {
                correctCount++;
                $(this).addClass('correct');
            } else {
                $(this).addClass('incorrect');
            }
        });
        message.text('Correct answers: ' + correctCount);
        add.toggle();
        check.toggle();
    }

    function randomPos() {
        return {
            top: random(40, (getHeight() * 0.75)),
            left: random(40, (getWidth() - 120))
        }
    }

    function generateId(chars, digits) {
        var id = '';
        for (let i = 0; i < chars; i++) {
            id += generateChar();
        }
        for (let i = 0; i < digits; i++) {
            id += generateDigit();
        }

        return id;

        function generateChar() {
            return String.fromCharCode(random(65, 90));
        }

        function generateDigit() {
            return String.fromCharCode(random(48, 57));
        }
    }

});

function randomIntMinMax(min, max) {
    var rand = (min + Math.random() * (max + 1 - min));
    rand = Math.floor(rand);
    return rand;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function getWidth() {
    return $(document).width();
}

function getHeight() {
    return $(document).height();
}