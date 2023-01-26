const deal = document.querySelector('#deal')
const hit = document.querySelector('#hit')
const stay = document.querySelector('#stay')
const refresh = document.querySelector('#refresh')


window.onload = function () {
    buildDeck()
    actualDeck()
    dealCard()
    player = 0
    dealer = 0
    acePlayer = 0
    aceDealer = 0
    result = 0
    document.getElementById("hit").disabled = true;

}

function buildDeck() {
    values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
        }
    }
    console.log(deck);
    console.log(deck[15])
    console.log(values[11])

}

function actualDeck() {
    console.log(deck);
    console.log(values[11])

    cardValue = new Map()
    cardValue.set(values[1], 2)
    cardValue.set(values[2], 3)
    cardValue.set(values[3], 4)
    cardValue.set(values[4], 5)
    cardValue.set(values[5], 6)
    cardValue.set(values[6], 7)
    cardValue.set(values[7], 8)
    cardValue.set(values[8], 9)
    cardValue.set(values[9], 10)
    cardValue.set(values[10], 10)
    cardValue.set(values[11], 10)
    cardValue.set(values[12], 10)
    cardValue.set(values[13], 10)
    cardValue.set(values[0], 11)

    console.log(cardValue.get(values[1]))
    player = cardValue.get(values[12])
    console.log(player)

}

function dealCard() {
    deal.addEventListener("click", () => {
        for (i = 0; i < 2; i++) {
            playerDeal()

            console.log(player)

            if (valueCard == 11) { acePlayer = 1 + acePlayer }

            playerScore()

            console.log(acePlayer)
        }

        bankDeal()
        console.log(dealer)
        console.log(aceDealer)
        document.getElementById("deal").disabled = true;
        document.getElementById("hit").disabled = false;

        if (player == 21) {
            message = "Black Jack"
            document.getElementById("hit").disabled = true;

        }

    })

    hit.addEventListener("click", () => {
        playerDeal()

        if (valueCard == 11) { acePlayer = 1 + acePlayer }
        console.log(player)
        console.log(aceDealer)
        console.log(acePlayer)
        playerScore()

        if (acePlayer > 0 && player > 21) {
            player = player - 10
            acePlayer = acePlayer - 1
            playerScore()
        }

        else if (player == 21) {
            for (i = 0; dealer < 17; i++) {
                bankDeal()

                console.log(dealer)
                if (valueCard == 11) { aceDealer = 1 + aceDealer }

                console.log(aceDealer)
            }

        }

        else if (player > 21 && acePlayer == 0) {
            console.log(player)
            playerResult = " Player Loses"
            document.getElementById("playerResult").innerText = playerResult
            console.log(result)
            document.getElementById("hit").disabled = true;
            for (i = 0; dealer < 17; i++) {
                bankDeal()

                console.log(dealer)
                if (valueCard == 11) { aceDealer = 1 + aceDealer }

                console.log(aceDealer)
            }
        }

    })

    stay.addEventListener("click", () => {
        document.getElementById("hit").disabled = true;
        for (i = 0; dealer < 17; i++) {
            bankDeal()

            console.log(dealer)
            if (valueCard == 11) { aceDealer = 1 + aceDealer }

            console.log(aceDealer)
        }

    })

}


refresh.addEventListener("click", () => {
    window.location.reload()

})

function playerDeal() {
    cardNumber = Math.floor(Math.random() * 13)
    cardColor = Math.floor(Math.random() * 4)
    let cardImg = document.createElement("img");
    cardImg.src = "./cards/" + values[cardNumber] + "-" + types[cardColor] + ".png";
    document.getElementById("playerCard").append(cardImg)
    valueCard = cardValue.get(values[cardNumber])
    player = cardValue.get(values[cardNumber]) + player

}

function bankDeal() {
    cardNumber = Math.floor(Math.random() * 13)
    cardColor = Math.floor(Math.random() * 4)
    let cardImg = document.createElement("img");
    cardImg.src = "./cards/" + values[cardNumber] + "-" + types[cardColor] + ".png";
    document.getElementById("dealerCard").append(cardImg)
    valueCard = cardValue.get(values[cardNumber])
    dealer = cardValue.get(values[cardNumber]) + dealer
    scoreDealer = dealer
    document.getElementById("scoreDealer").innerText = scoreDealer

}

function playerScore() {
    scorePlayer = player
    document.getElementById("scorePlayer").innerText = scorePlayer

}

function dealerScore() {
    scoreDealer = dealer
    document.getElementById("scoreDealer").innerText = scoreDealer

}


