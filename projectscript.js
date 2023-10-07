var cardSet = []
var limit = prompt("How many players?[1-3]")

if(limit!=1&&limit!=2&&limit!=3){
	alert("This is my game so you better follow me when I tell you to enter a natural number between 1-3.")
	location.reload()
}
else{
	if(limit==1){
		document.getElementsByClassName("game-info")[1].innerHTML = "Matches Made: <span>0</span>"
	}
	if(limit==2){
		document.getElementsByClassName("game-info")[1].innerHTML = "P1 Matches Made: <span>0</span> <br />P2 Matches Made: <span>0</span>"
	}
	if(limit==3){
		document.getElementsByClassName("game-info")[1].innerHTML = "P1 Matches Made: <span>0</span> <br />P2 Matches Made: <span>0</span><br />P3 Matches Made: <span>0</span>"
	}
}
var cardSetCounter = [0,0,0,0,0,0,0,0,0,0,0,0]
	for(i=0;i<=11;i++){
	var x = Math.floor(Math.random ()*36)+1
		for(y=0;y<i;y++){
			if(x==cardSet[y]){
				var x = Math.floor(Math.random ()*36)+1
				y=-1
			}
		}
		cardSet[i] = x
		console.log(cardSet[i])
	}
	for(y=0;y<24;y++){
		var x = Math.floor(Math.random ()*12)
		while(cardSetCounter[x] ==2){
			x = Math.floor(Math.random ()*12)
		}
		document.getElementsByClassName("card-value")[y].setAttribute("src", "card"+cardSet[x]+".jpg")
		cardSetCounter[x]+=1
	}
			
var matching = function(time, cards){
	this.cardsArray = cards
	this.totalTime = time
	this.timeRemaining = time
	this.timer = document.getElementById('time-remaining')
	this.ticker = document.getElementById('flips-made')
	this.matcher1 = document.getElementsByTagName('span')[6]
	this.matcher2 = document.getElementsByTagName('span')[7]
	this.matcher3 = document.getElementsByTagName('span')[8]
	this.startGame = function(){
		this.cardToCheck = null
		this.totalClicks = 0
		this.totalMatchesP1 = 0
		this.totalMatchesP2 = 0
		this.totalMatchesP3 = 0
		this.turn = 0
		this.timeRemaining = this.totalTime
		this.matchedCards = []
		this.busy = true
		setTimeout(() =>{
			this.countDown = this.startCountDown()
			this.busy = false
		}, 10000)
		this.hideCards()
		this.timer.innerText = this.timeRemaining
		this.ticker.innerText = this.totalClicks
		
	}
	this.hideCards = function(){
		this.cardsArray.forEach(card => {
			card.classList.remove('visible')
			card.classList.remove('matched')
		})
	}
	this.flipCard = function(card){
		if(this.canFlipCard(card)){
			this.totalClicks++
			this.ticker.innerText = this.totalClicks
			card.classList.add('visible')
			
			if(this.cardToCheck){
				this.checkForCardMatch(card)
			}
			else{
				this.cardToCheck = card
			}
		}
	}
	this.checkForCardMatch = function(card){
		if(this.getCardType(card)==this.getCardType(this.cardToCheck)){
			this.cardMatch(card, this.cardToCheck)
			if(this.turn%limit==0){
				this.totalMatchesP1++
				this.matcher1.innerText = this.totalMatchesP1
			}
			if(this.turn%limit==1){
				this.totalMatchesP2++
				this.matcher2.innerText = this.totalMatchesP2
			}
			if(this.turn%limit==2){
				this.totalMatchesP3++
				this.matcher3.innerText = this.totalMatchesP3
			}
		}
		else{
			this.turn++
			this.cardMisMatch(card, this.cardToCheck)
		}
		
		this.cardToCheck = null
	}
	this.cardMatch = function(card1, card2){
		this.matchedCards.push(card1)
		this.matchedCards.push(card2)
		card1.classList.add('matched')
		card2.classList.add('matched')
		if(this.matchedCards.length == this.cardsArray.length){
			this.victory()
		}
	}
	this.cardMisMatch = function(card1, card2){
		this.busy = true
		setTimeout(() =>{
			card1.classList.remove('visible')
			card2.classList.remove('visible')
			this.busy = false
		}, 1000)
	}
	this.getCardType = function(card){
		return card.getElementsByClassName('card-value')[0].src
	}
	this.startCountDown = function(){
		return setInterval(() =>{
			this.timeRemaining--
			this.timer.innerText = this.timeRemaining
			if(this.timeRemaining==0){
				this.gameOver()
			}
		}, 1000)
	}
	this.gameOver = function(){
		clearInterval(this.countDown)
		document.getElementById('game-over-text').classList.add('visible')
	}
	this.victory = function(){
		clearInterval(this.countDown)
		document.getElementById('victory-text').classList.add('visible')
		this.hideCards()
		this.matcher1.innerText = 0
		this.matcher2.innerText = 0
		this.matcher3.innerText = 0
	}
	this.canFlipCard = function(card){
		return !this.busy && !this.matchedCards.includes(card) && card != this.cardToCheck
	}
}

var formNumber = 0
var playerRegister = function(){
	fullList[formNumber] = new player(document.getElementById("name").value,document.getElementById("age").value,document.getElementById("section").value)
	formNumber++
	document.getElementById("span1").innerHTML = formNumber +1
	document.getElementById("span2").innerHTML = formNumber +1
	document.getElementById("span3").innerHTML = formNumber +1
	if(formNumber == limit){
		document.getElementById("playerForm").style.visibility = "hidden"
	}
}
		
var player = function(name, age, section){
	this.name = name
	this.age = age
	this.section = section
}

var ready = function(){
	var overlays = Array.from(document.getElementsByClassName('overlay-text'))
	var cards = Array.from(document.getElementsByClassName('card'))
	var game = new matching(600, cards)
	
	overlays.forEach(overlay =>{
		overlay.addEventListener('click', () =>{
			overlay.classList.remove('visible')
			alert("You have 10 seconds to enter your credentials before the game starts.")
			game.startGame()
		})
	})
	
	cards.forEach(card =>{
		card.addEventListener('click', () =>{
			game.flipCard(card)
		})
	})
}

if(document.readyState == 'loading'){
	document.addEventListener('DOMContentLoaded', ready())
}
else{
	ready()
}

document.getElementsByTagName("button")[0].addEventListener("click",playerRegister)
fullList = [1,2,3,4,5]