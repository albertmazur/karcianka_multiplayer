import {special_card_check, PLAYERS, MAINCARDS } from './helper.js'

let mainCardsImg = []

let bot1Cards = document.querySelector("#cardsBot1")
let youCards = document.querySelector(".cardsHuman")
let coverMainCard = document.getElementById("coverMainCards")
let uncoverMainCards = document.getElementById("uncoverMainCards")
let whoNowText = document.getElementById("whoNow")
let sumaText = document.getElementById("suma")

if(start != null) startGame()

window.Echo.private('PrivateGameChannel.user.'+id)
    .listen('.private_game', (e) => {
        brodcast(e)
    })

function startGame(){
    fetch(route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token
        },
        body: JSON.stringify({
            userId: userId,
            game: game_id,
            start: true
        }),
    })
    .then(function(response) {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
    .then(data => {
        brodcast(data)
    })
    .catch((error) => {
        console.error('Error:', error)
    })
}

function brodcast(e){
    if(e.sum != undefined) sumaText.textContent = e.sum ? e.sum : 0
    if(e.whoNow != undefined) whoNowText.textContent = e.whoNow

    if(e.win != undefined) win(e.win)

    if(e.card == "add"){
        for(let i=0; i< e.count; i++){
            bot1Cards.append(creatCard(null, PLAYERS.BOT))
        }
    }

    if(MAINCARDS.includes(e.card)){
        setUncoverMainCards(e.card)
        addForHistory(e.card)
        bot1Cards.children[0].remove()
    }

    if(e.start !=undefined){
        if(document.getElementById("watting") != undefined) document.getElementById("watting").remove()
        document.querySelector(".game").style.display = "block"

        setUncoverMainCards(e.uncover)
        addForHistory(e.uncover)

        coverMainCard.classList.add("cover")
        coverMainCard.addEventListener("click", coverMainCardEvent)

        for(let i=0; i<MAINCARDS.length; i++){
            let img = document.createElement("img")
            img.setAttribute("alt", MAINCARDS[i])
            img.setAttribute("src", '/storage/cards/'+MAINCARDS[i]+'.png')
            mainCardsImg.unshift(img)
        }

        e.user1.forEach(card => {
            let img = creatCard(card, PLAYERS.HUMAN)
            youCards.appendChild(img)
        })

        for(let i=0; i< e.user2; i++){
            let img = creatCard(null, PLAYERS.BOT)
            bot1Cards.appendChild(img)
        }
    }
}

function coverMainCardEvent(){
    addCard()
}

function creatCard(card, u){
    let img = document.createElement("img")
    if(u == PLAYERS.HUMAN){
        img.setAttribute("src", '/storage/cards/'+card+'.png')
        img.setAttribute("alt", card)
        img.addEventListener("click", function(e){
            clickForCard(e.target)
        })
    }
    if(u == PLAYERS.BOT) img.setAttribute("src", '/storage/cards/background_card.png')
    return img
}

function addCard(){
    if(PLAYERS.HUMAN == whoNowText.textContent){
        fetch(route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token
            },
            body: JSON.stringify({
                userId: userId,
                game: game_id,
                card: "add"
            }),
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            whoNowText.textContent = data.whoNow
            sumaText.textContent = 0
            data.card.forEach((card)=>{
                let img = creatCard(card, PLAYERS.HUMAN)
                youCards.appendChild(img)
            })

        })
        .catch((error) => {
            console.error('Error:', error)
        })
    }
    else{
        alert("Nie twój ruch")
    }
}

function clickForCard(cardImg){
    if(PLAYERS.HUMAN == whoNowText.textContent){
        let card = cardImg.getAttribute('alt')
        if(checkSelectCard(card)){
            fetch(route, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token
                },
                body: JSON.stringify({
                    userId: userId,
                    game: game_id,
                    card: card
                }),
            })
            .then(function(response) {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`)
                    }
                    return response.json()
            })
            .then(data => {
                if(data.win == undefined){
                    sumaText.textContent = data.sum ? data.sum : 0
                    whoNowText.textContent = data.whoNow
                }
                else{
                    win(data.win)
                }
                setUncoverMainCards(card)
                addForHistory(card)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
            cardImg.remove()
        }
        else{
            alert("Tą kartą nie można zagrać")
        }
    }
    else{
        alert("Nie twój ruch")
    }
}

function win(who){
    whoNowText.remove()
    let whoWin = document.createElement("p")
    whoWin.id="whoWin"
    whoWin.textContent="Wygrał " + who
    document.querySelector(".centerBoard").insertBefore(whoWin, document.querySelector(".centerBoard p"))
    coverMainCard.classList = ""
    coverMainCard.removeEventListener("click", coverMainCardEvent)
}

function addForHistory(card){
    let historyGame = document.getElementById("history")
    historyGame.insertBefore(creatCard(card, PLAYERS.HUMAN), historyGame.firstChild)
}


function checkSelectCard(card){
    let uncoverCard = uncoverMainCards.getAttribute("alt")

    let selectedCardSign = card.substring(0,2)
    let selectedCardFigure = card.substring(3, card.length)
    let uncoverCardSign = uncoverCard.substring(0,2)
    let uncoverCardFigure = uncoverCard.substring(3, uncoverCard.length)

    if((selectedCardSign==uncoverCardSign || selectedCardFigure==uncoverCardFigure) && (sumaText.textContent == 0 || (special_card_check(selectedCardSign)))){
        return true
    }
    else return false
}

function setUncoverMainCards(card){
    uncoverMainCards.setAttribute("src", `/storage/cards/${card}.png`)
    uncoverMainCards.setAttribute("alt", card)
}
