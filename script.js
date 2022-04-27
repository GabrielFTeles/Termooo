const letterBox = document.querySelectorAll('.letterBox');

let actualRowID     = 1;
let actualRow       = document.querySelectorAll('#row-1 .letterBox');
let flippers        = document.querySelectorAll('#row-1 .flipper');
let actualBackRow   = document.querySelectorAll('#row-1 .back');

const key = document.querySelectorAll('.keyboard span');

const words = ['perna', 'carro', 'porta', 'sagaz', 'mexer', 'negro', 'termo', 'senso', 'nobre', 'afeto', 'plena', 'sutil', 'fazer', 'ideia', 'moral', 'sobre', 'sonho', 'etnia', 'amigo', 'casal', 'pesar', 'digno', 'saber', 'manso', 'mundo', 'culto', 'comum', 'louco', 'criar', 'servo', 'prosa', 'temor', 'honra', 'justo', 'tempo', 'ceder', 'pedir', 'ordem', 'regra', 'forte', 'feliz', 'coisa', 'homem', 'falar', 'vendo', 'temer', 'acaso', 'valor', 'lugar', 'ontem'];

const rightLetters = [];
let submitted      = ['','','','',''];

let historySubmitted;
let activeIndex;

getRandomWord();

key.forEach((k) => {
    k.addEventListener('click', () => {
        typeKey(k.textContent)
    })
})

function selectLetterBox(event){
    if (!event.target.classList.contains('active') && event.target.classList.contains('typefree')) {
        event.target.classList.toggle('active');
        letterBox.forEach((box) => {
            if (box != event.target && box.classList.contains('active')) {
                box.classList.toggle('active');
            }
        })
    }
}

function getRandomWord() {
    const rightWord = words[Math.floor(Math.random() * (words.length + 1))];
    for (let i = 0; i < rightWord.length; i++) {
        rightLetters.push(rightWord[i]);
    }
}

function backspace() {
    if (activeIndex > -1) {
        actualRow[activeIndex].innerText = '';
        submitted[activeIndex] = '';
        if (activeIndex < 4) {
            actualRow[activeIndex + 1].classList.remove('active');
        }
        actualRow[activeIndex].classList.add('active');
        activeIndex--;
    }
}

function verifySubmit() {
    flippers = document.querySelectorAll(`#row-${actualRowID} .flipper`);

    if (submitted.indexOf('') != -1) {
        return;
    }

    historySubmitted = actualBackRow;
    let corrects = 0;
    let i = 0;
    for (let letter of submitted) {
        if (letter === rightLetters[i]) {
            sucessColor(i);
            corrects++;
            i++;
            continue;
        }

        let isThisLetterInArray = false;
        for (let l of rightLetters) {
            if (letter === l) {
                isThisLetterInArray = true;
            }
        }

        if (isThisLetterInArray === true) {
            wrongPlaceColor(i)
        } else {
            failColor(i)
        }
        i++;
    }
    actualRow.forEach((tf) => {
        tf.classList.remove('typefree');
    })


    rotateCards();

    if (corrects === 5) {
        rotateCards();
        return;
    }
    
    if (actualRowID < 6) {
        actualRowID++;
        actualRow     = document.querySelectorAll(`#row-${actualRowID} .letterBox`);
        actualBackRow = document.querySelectorAll(`#row-${actualRowID} .back`);
        flippers      = document.querySelectorAll(`#row-${actualRowID - 1} .flipper`);

        actualRow.forEach((ar) => {
            ar.classList.add('typefree');
        });

        actualRow[0].classList.add('active');
    
        submitted = ['', '', '', '', '']
    }
}

function rotateCards() {
    let iC = 0;
    let interval = setInterval(() => {
        if (iC < 5) {
            flippers[iC].style.transform = 'rotateY(180deg)';
            iC++;
        } else {
            clearInterval(interval);
        }
    }, 300);
}

function sucessColor(i) {
    historySubmitted[i].classList.add('rigth-letter');
}

function wrongPlaceColor(i) {
    historySubmitted[i].classList.add('wrongPlace-letter');
}

function failColor(i) {
    historySubmitted[i].classList.add('failed-letter');
}

function typeKey(k) {
    let isThereAnyActive = false;
    let actualActive;

    let i = 0;
    actualRow.forEach((ar) => {
        if (ar.classList.contains('active')) {
            isThereAnyActive = true;
            actualActive = ar;
            activeIndex = i;
        }
        if (isThereAnyActive === true) {
            submitted[activeIndex] = k.toLowerCase();
        }
        i++;
    });

    if (isThereAnyActive === true) {
        actualActive.style.transform = 'scale(1.1)';
        setTimeout(() => {
            actualActive.style.transform = 'scale(1)'
        }, 100)
        actualActive.innerText = k;
        actualBackRow[activeIndex].innerText = k;
        actualActive.classList.remove('active');
        if (activeIndex < 4) {
            actualRow[activeIndex + 1].classList.add('active');
        }
    }
}

const arrow   = document.querySelector('#arrow');
let isRotated = false;

function rotateArrow() {
    if (!isRotated) {
        arrow.style.transform = 'rotate(180deg)';
        isRotated = true;
    } else {
        arrow.style.transform = 'rotate(0deg)';
        isRotated = false;
    }
}