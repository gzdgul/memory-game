const elementGameArea = document.getElementById('game-area');
const elementScore = document.getElementById('score');
const elementMoves = document.getElementById('moves');
let elementScoreModal = new bootstrap.Modal(document.getElementById('scoreModal'), {});
const elementModalBodyScore = document.getElementById('modal_body_score');
const elementModalBodyBonus = document.getElementById('modal_body_bonus');
const elementModalBodyTScore = document.getElementById('modal_body_tscore');
const element_tbody = document.getElementById('tbody');
const element_move_bar = document.getElementById('move_bar');
const element_match_bar = document.getElementById('match_bar');
const element_darkModeSwitch = document.getElementById('darkModeSwitch');
const element_body = document.getElementById('body');
const element_table = document.getElementById('scoreTable');
const element_modal_content = document.querySelector('#scoreModal .modal-content');
const element_username_input = document.getElementById('username_input');
const element_username_h5 = document.getElementById('username_h5');


const cards = [
    {
        name: 'cheeseburger',
        img: './assets/images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: './assets/images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: './assets/images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: './assets/images/milkshake.png',
    },
    {
        name: 'fries',
        img: './assets/images/fries.png',
    },
    {
        name: 'pizza',
        img: './assets/images/pizza.png',
    },
];

let username_ = null;
let suffleCards = [];
let previousCard = null;
let score = 0;
let totalScore = 0;
let moveCounter = 0;
let totalMovesNumber = null;
let movesLeft = null;
let moveBonus = null;
let uniqueCardNumber = null;

function setUsername() {
    username_ = element_username_input.value;
    element_username_h5.innerText = 'Welcome ' + username_ + '!' ;
}
function cardNumberChooser(x) {
    uniqueCardNumber = (x.innerText) / 2;
    switch (uniqueCardNumber) {
        case 6:
            totalMovesNumber = 15;
            break;
        case 5:
            totalMovesNumber = 12;
            break;
        case 4:
            totalMovesNumber =  10;
            break;
        case 3:
            totalMovesNumber = 8;
            break;
    }
    score = 0;
    elementScore.innerText = 'Score: ' + score;
    moveCounter = 0;
    movesLeft = totalMovesNumber;
    elementMoves.innerHTML = totalMovesNumber + ' moves left';
    element_move_bar.style = 'width: 100%';
    element_match_bar.style = 'width: 0%';
    previousCard = null;
    StartGame();
}
/*
<tr>
    <th scope="row">3</th>
    <td>Rose30</td>
    <td class="td_score">50</td>
</tr>
 */

const scoreTableList = [
    {
        name: 'Mark342',
        score: 140
    },
    {
        name: 'Jacob44',
        score: 70
    },
    {
        name: 'Rose30',
        score: 50
    }
]

function createTableData() {
    element_tbody.innerHTML = null;
    scoreTableList
        .sort((a, b) => b.score - a.score)
        .forEach((x, index) => {
            const element_tr = document.createElement('tr');
            const element_th = document.createElement('th');
            element_th.setAttribute('scope', 'row');
            element_th.innerText = (index + 1).toString();
            element_tr.appendChild(element_th);
            const element_td_name = document.createElement('td');
            element_td_name.innerText = x.name;
            element_tr.appendChild(element_td_name);
            const element_td_score = document.createElement('td');
            element_td_score.innerText = x.score;
            element_td_score.className = 'td_score';
            element_tr.appendChild(element_td_score);
            element_tbody.appendChild(element_tr);
        });
}

function createNewTableData(username, newscore) {

        scoreTableList.push({
            name: username,
            score: newscore
        });

    createTableData();
}
function GameOverCheck() {
    if (((score/10) === suffleCards.length / 2) || movesLeft <= 0 ) {
        elementModalBodyScore.innerText = 'Your Score: ' + score;
        if (movesLeft === 0) {movesLeft += 1}
        if (movesLeft >= 0) {element_match_bar.style = 'width: 100%';}
        moveBonus = ((movesLeft - 1) * 10);
        elementModalBodyBonus.innerText = 'Move Bonus: ' + (movesLeft - 1) + ' x 10 = ' + moveBonus;
        totalScore = score + moveBonus;
        elementScore.innerText = 'Score: ' + totalScore;
        elementModalBodyTScore.innerText = 'Total Score: ' + totalScore;
        elementScoreModal.show();
        if (username_ !== null){
            createNewTableData(username_, totalScore);
        }
        else {
            createNewTableData('username', totalScore);
        }

    }
}

function StartGame() {
    if (uniqueCardNumber >= 2 && uniqueCardNumber <= cards.length) {
        suffleCards = [
            ...cards.slice(0, uniqueCardNumber),
            ...cards.slice(0, uniqueCardNumber)
        ].sort(() => 0.5 - Math.random());
    }
    elementGameArea.innerHTML = null;
    suffleCards.forEach((card) => {
        let card_element = document.createElement('img');
        elementGameArea.appendChild(card_element);
        new Card(card.name, card.img, card_element);
    });
}

function DarkMode() {
    if (element_body.className === 'bg-dark') {
        element_body.className = 'bg-dark-subtle';
        element_body.style = 'color: inherit';
        element_table.classList.remove('table-dark');
        const background_dark_divs = document.querySelectorAll('.bg-gradient');
        background_dark_divs.forEach((div) => {
            div.classList.replace('bg-gradient', 'bg-light');
        });
        elementGameArea.classList.replace('bg-light', 'bg-gradient');
        element_modal_content.classList.remove('bg-dark');
        elementModalBodyBonus.className = 'bg-warning-subtle';
        elementModalBodyTScore.className = 'bg-success-subtle';
    }
    else { //DARK YAPMAK ICIN
        element_body.className = 'bg-dark';
        element_body.style = 'color: whitesmoke';
        element_table.classList.add('table-dark');
        const background_light_divs = document.querySelectorAll('.bg-light');
        background_light_divs.forEach((div) => {
            div.classList.replace('bg-light', 'bg-gradient');
        });
        element_modal_content.classList.add('bg-dark');
        elementModalBodyBonus.className = 'bg-warning text-dark fw-bold';
        elementModalBodyTScore.className = 'bg-success text-dark fw-bold';


    }

}
class Card {
    constructor(name, image, element) {
        this.name = name;
        this.image = image;
        this.cover = './assets/images/cover.png';
        this.blank = './assets/images/matched.png';
        this.match = false;
        this.element = element;

        this.element.className = 'memory-card m-2 rounded-4';
        this.element.src = this.cover;
        this.element.addEventListener('click', () => {
            this.click();
        });
    }

    click() {
        if (previousCard === this) return;
        if (this.match) return;

        this.element.src = this.image;
        if (previousCard) {
            this.compare(previousCard);
        } else {
            previousCard = this;
        }
    }

    compare(card) {
        if (card.name === this.name) {
            setTimeout(() => {
                this.element.src = this.blank;
                this.match = true;
                card.element.src = this.blank;
                card.match = true;
            }, 1000);
            score += 10;
            // alert('match');
            GameOverCheck();
        } else {
            setTimeout(() => {
                this.element.src = this.cover;
                card.element.src = card.cover;
            }, 1000);
            // alert('wrong');
        }
        previousCard = null;
        moveCounter += 1;
        elementScore.innerText = 'Score: ' + score;
        movesLeft = (totalMovesNumber - moveCounter);
        let p = Math.floor((movesLeft * 100) / totalMovesNumber);
        element_move_bar.style = 'width: ' + p + '%'

        let k = Math.floor(((score/10) * 100) / uniqueCardNumber);
        element_match_bar.style = 'width: ' + k + '%';



        if(movesLeft <= 0) {
            alert('game over moves left!');
            elementMoves.innerHTML = '0 moves left';
            GameOverCheck();
        }
        else {
            elementMoves.innerHTML = movesLeft + ' moves left';
        }
    }
}

createTableData()