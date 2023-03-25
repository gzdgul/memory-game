const elementGameArea = document.getElementById('game-area');

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

let suffleCards = [];
let previousCard = null;
let score = 0;
let uniqueCardNumber = 6;

function GameOverCheck() {
    if (score === suffleCards.length / 2) {
        alert('game over');
    }
}

class Card {
    constructor(name, image, element) {
        this.name = name;
        this.image = image;
        this.cover = './assets/images/_cover.png';
        this.blank = './assets/images/_blank.png';
        this.match = false;
        this.element = element;

        this.element.className = 'memory-card m-2';
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
            score += 1;
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
    }
}

if (uniqueCardNumber >= 2 && uniqueCardNumber <= cards.length) {
    suffleCards = [
        ...cards.slice(0, uniqueCardNumber),
        ...cards.slice(0, uniqueCardNumber)
    ].sort(() => 0.5 - Math.random());
}

suffleCards.forEach((card) => {
    let card_element = document.createElement('img');
    elementGameArea.appendChild(card_element);
    new Card(card.name, card.img, card_element);
});