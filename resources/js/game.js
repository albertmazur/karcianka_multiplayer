import { mcts } from './mcts.js'
import { established_rules } from './established_rules.js'
import {shuffleCards, MAINCARDS, PLAYERS} from './helper.js'

//-----------------Card names--------------------------------

let mainCardsImg = []

//--------------------Stacks of cards--------------------
let coverMainCards = []
let uncoverMainCards = []

//---------------Player cards----------------------------------------------------------
let bot1Cards = document.querySelector("#cardsBot1")
let youCards = document.querySelector(".cardsHuman")

//---------------Support for the number of cards to download--------------------------------
let sumaSpan = document.querySelector(".centerBoard span")
let suma = 0

//-----------------The last card that was played--------------------------------------
let coverMainCardImg = document.querySelector("#coverMainCards")
let uncoverMainCardImg = document.querySelector("#uncoverMainCards")

//-----------------Whose move----------------------------------
let whoNow = document.getElementById("whoNow")

//------------------Game launch and launch support----------------------------------------------
let mode
let firstGame = true
let canContinue = true
let swicherCardBot = document.getElementById("showCardsSwitcher")
let newGame = document.getElementById("start")
newGame.addEventListener("click", start)

//-------------------------Start the game----------------------------
function start(){
    if(firstGame){
        for(let i=0; i<MAINCARDS.length; i++){
            let img = document.createElement("img")
            img.setAttribute("alt", MAINCARDS[i])
            img.setAttribute("src", '/storage/cards/'+MAINCARDS[i]+'.png')
            mainCardsImg.unshift(img)
        }
    }

    newGame.textContent="Od nowa"
    firstGame = false

    coverMainCardImg.addEventListener("click", drawUncoverMain)

    resetGames()

    let whoWin = document.querySelector("#whoWin")
    if(whoWin != null)  whoWin.remove()

    whoNow.innerText=PLAYERS.HUMAN

    coverMainCardImg.classList.add("cover")

    coverMainCards = shuffleCards(MAINCARDS)

    for(let i=0; i<10; i++){
        let img = creatCard(coverMainCards.shift())

        if(i%2==0) youCards.appendChild(img)
        if(i%2==1){
            if(!swicherCardBot.checked) img.setAttribute("src", '/storage/cards/background_card.png')
            bot1Cards.appendChild(img)
        }
    }

    let sing = coverMainCards.at(0).substring(0,2)
    if(sing=="02" || sing=="03" || sing=="0J" || sing=="0Q" || sing=="0K" || sing=="0A") start()
    else{
        uncoverMainCards.unshift(coverMainCards.shift())
        uncoverMainCardImg.setAttribute("src", "/storage/cards/"+uncoverMainCards.at(0)+".png")
        uncoverMainCardImg.setAttribute("alt", uncoverMainCards.at(0))

        let history = document.getElementById("history")
        while (history.firstChild) {
            history.removeChild(history.firstChild)
        }
        history.appendChild(uncoverMainCardImg.cloneNode(true))

        for(let card of youCards.children){
            card.addEventListener("click", selectingCard)
        }
        canContinue = true
        mode = document.querySelector('input[name="tryb"]:checked').value
    }
}

//-------------Adding a card for grasz after clicking face down--------------------
function drawUncoverMain(){
    if(whoNow.innerText==PLAYERS.HUMAN){
        if(canContinue){
            for(let i=1; i<suma; i++) drawCard(PLAYERS.HUMAN)
            drawCard(PLAYERS.HUMAN)
        }

        suma = 0
        sumaSpan.innerText = ""

        whoNow.innerText=PLAYERS.BOT

        setTimeout(function (){
            moveBot()
        }, 2000)
    }
    else alert("Nie twój ruch nie możesz brać karty")
}

//----------------Creating cards-----------------------------
function creatCard(card){
    let img = document.createElement("img")
    if (whoNow.innerText==PLAYERS.HUMAN) img.setAttribute("src", '/storage/cards/'+card+'.png')
    else{
        if(swicherCardBot.checked) img.setAttribute("src", '/storage/cards/'+card+'.png')
        else img.setAttribute("src", '/storage/cards/background_card.png')
    }

    img.setAttribute("alt", card)
    return img
}

//-----------Adding a card for player------------------
function drawCard(who){
    let img = creatCard(coverMainCards.shift())

    img.style.opacity = 0

    if(who==PLAYERS.HUMAN && whoNow.innerText==PLAYERS.HUMAN){
        img.addEventListener("click", selectingCard)
        youCards.appendChild(img)
    }
    if(who==PLAYERS.BOT){
        if(!swicherCardBot.checked) img.setAttribute("src", '/storage/cards/background_card.png')
        bot1Cards.appendChild(img)
    }

    setTimeout(function(){
        img.classList.add("addCard")
    }, 50)

    checkCoverCards()

    if(coverMainCards.length==0 && uncoverMainCards.length==1){
        let whoWin = document.createElement("p")
        whoWin.id="whoWin"
        if(youCards.children.length > bot1Cards.children.length) whoWin.textContent="Koniec gry wygrał bot"
        if(youCards.children.length < bot1Cards.children.length) whoWin.textContent="Koniec gry wygrałeś ty"
        document.querySelector(".centerBoard").insertBefore(whoWin, document.querySelector(".centerBoard p"))
        setTimeout(function(){
            resetGames()
        }, 600)
        canContinue = false
    }
}

//-------------------------Adding cards to the game if taking from the pile-------------
function checkCoverCards(){
    if(coverMainCards.length==0){
        let c = uncoverMainCards.shift()
        coverMainCards = shuffleCards(uncoverMainCards)
        uncoverMainCards.splice(0, uncoverMainCards.length)
        uncoverMainCards.unshift(c)
    }
}

//---------------------------Function called after selecting a card-----------------------------
function selectingCard(){
    let selectingCardAlt = this.getAttribute('alt')

    if(whoNow.innerText == PLAYERS.HUMAN && checkCard(selectingCardAlt)){
        uncoverMainCards.unshift(selectingCardAlt)

        uncoverMainCardImg.setAttribute("src", "/storage/cards/"+selectingCardAlt+".png")
        uncoverMainCardImg.setAttribute("alt", selectingCardAlt)

        this.classList.remove("addCard")
        this.classList.add("removeCard")

        addForHistory(this)

        setTimeout(function(){
            checkWin(whoNow.innerText)
        }, 800)

        setTimeout(function(){
            moveBot()
        }, 2000)
    }
    else if(whoNow.innerText!=PLAYERS.HUMAN) alert("Nie twój ruch")
    else alert("Tą kartą nie można zagrać")
}

//------------------------------Bot movement-------------------------------------
function moveBot(){
    if(whoNow.innerText==PLAYERS.BOT){
       let cards = bot1Cards.children
       let playedCard
       let isCard = false

       if(mode == "EstablishedRules") playedCard = established_rules(cards, uncoverMainCardImg, youCards.length, suma)
       if(mode == "MCTS"){
           let cardBotAlt = []
           for (let card of cards) cardBotAlt.unshift(card.alt)

           let youCardsdAlt = []
           for (let card of youCards.children) youCardsdAlt.unshift(card.alt)

           let youCardslenght = youCardsdAlt.length
           let losCards = coverMainCards.concat(youCardsdAlt)
           losCards = shuffleCards(losCards)
           youCardsdAlt = losCards.splice(0, youCardslenght)

           let card = mcts(cardBotAlt, youCardsdAlt, losCards, uncoverMainCards, PLAYERS, suma)
           playedCard = document.querySelector(`#cardsBot1 img[alt="${card}"]`)
       }

       if(playedCard != null){
           checkCard(playedCard.getAttribute("alt"))
           isCard=true
       }
       changeCard(isCard, playedCard)
    }
}

//-------------------Checks if this card can be played----------------
function checkCard(selectedCard){
    let uncoverCard = uncoverMainCardImg.getAttribute("alt")

    let selectedCardSign = selectedCard.substring(0,2)
    let selectedCardFigure = selectedCard.substring(3, selectedCard.length)
    let uncoverCardSign = uncoverCard.substring(0,2)
    let uncoverCardFigure = uncoverCard.substring(3, uncoverCard.length)

    if(selectedCardSign==uncoverCardSign || selectedCardFigure==uncoverCardFigure){
        switch(selectedCardSign){
            case "02":
                suma+=2
                sumaSpan.innerText=suma
                break
            case "03":
                suma+=3
                sumaSpan.innerText=suma
                break
            case "0Q":
                suma=0
                sumaSpan.innerText=""
                break
            case "0J":
                if(suma<=5){
                    suma=0
                    sumaSpan.innerText=""
                }
                else{
                    suma-=5
                    sumaSpan.innerText=suma
                }
                break
            case "0K":
                suma+=5
                sumaSpan.innerText=suma
                break
            case "0A":
                break
            default:
                if(suma==0) return true
                else return false
        }
        return true
    }
    else return false
}

//---------------------------Putting the card that has been played into the stack--------------------
function changeCard(isCard, selectedCard){
    if(isCard){
        selectedCard.setAttribute("src", `/storage/cards/${selectedCard.getAttribute("alt")}.png`)

        uncoverMainCardImg.setAttribute("src", selectedCard.getAttribute("src"))
        uncoverMainCardImg.setAttribute("alt", selectedCard.getAttribute("alt"))
        uncoverMainCards.unshift(selectedCard.getAttribute("alt"))

        selectedCard.classList.remove("addCard")
        selectedCard.classList.add("removeCard")
        addForHistory(selectedCard)
    }
    else{
        if(canContinue){
            for(let i=1; i<suma; i++) drawCard(whoNow.innerText)
            drawCard(whoNow.innerText)
        }
        suma=0
        sumaSpan.innerText=""

    }
    setTimeout(function(){
        checkWin(whoNow.innerText)
    }, 800)
}

//--------------Checking if someone won------------
function checkWin(who){
    let cards
    switch(who){
        case PLAYERS.HUMAN:
            cards = youCards.children
            whoNow.innerText=PLAYERS.BOT
            break
        case PLAYERS.BOT:
            cards = bot1Cards.children
            whoNow.innerText=PLAYERS.HUMAN
            break
    }

    if((cards.length)==0) win(who)
}

//-------------------What happens if someone wins?-----------------------------
function win(who){
    let text
    if(who==PLAYERS.HUMAN) text = "Wygrałeś"
    else text = "Wygrał " + who
    let whoWinParagraph = document.createElement("p")
    whoWinParagraph.id="whoWin"
    whoWinParagraph.innerText=text
    document.querySelector(".centerBoard").insertBefore(whoWinParagraph, document.querySelector(".centerBoard p"))
    resetGames()
}

//---------------------Resetting the game----------------
function resetGames(){
    whoNow.innerText = ""
    sumaSpan.innerText = ""

    youCards.innerHTML = ""
    bot1Cards.innerHTML = ""

    coverMainCards.splice(0, coverMainCards.length)
    uncoverMainCards.splice(0, uncoverMainCards.length)

    suma=0

    uncoverMainCardImg.classList.remove("coverMainCards")
}

//---------------------Add history----------------
function addForHistory(card){
    let historyGame = document.getElementById("history")
    card.style = ""
    card.classList.remove("removeCard")
    historyGame.insertBefore(card, historyGame.firstChild)
}

swicherCardBot.addEventListener("click",function(e) {
    let newCard = []
    for(let i =0; i< bot1Cards.children.length; i++){
        if(e.target.checked){
            let c = bot1Cards.children[i].getAttribute("alt")
            newCard.push(creatCard(c))
        }
        else bot1Cards.children[i].setAttribute("src", `/storage/cards/background_card.png`)
    }
    if(e.target.checked){
        bot1Cards.innerHTML = ''
        newCard.forEach(card =>{
            bot1Cards.append(card)
        })
    }
})
