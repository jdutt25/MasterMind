let start = document.getElementById("start")
let red = document.getElementById("red")
let blue = document.getElementById("blue")
let yellow = document.getElementById("yellow")
let orange = document.getElementById("orange")
let purple = document.getElementById("purple")
let green = document.getElementById("green")
var won = false // the game hasn't been won yet
let guessCount = 1 // player gets up to 8 guesses
let peg = 1 // each turn the player will place 4 pegs
let guess = [] // variable for each player guess
let code = []



start.addEventListener("click", event =>{

    stgame = document.getElementById("stgame")
    gameplay = document.getElementById("gameplay")
    sub= document.getElementById("submit")
    disp = document.createTextNode(`I am generating a secret code on the board consisting of 4 pegs.
     Guess the correct colors in the correct order to win! After each turn, I will give you clues. 
     If you guess the right color peg in the wrong position, I will return a white peg. If you guess the right 
     color peg in the right position, I will return a black peg. If you guess a color that is not in the secret 
     code, I will place no peg in the slot. Let's begin!`)
    stgame.appendChild(disp)
    start.style.display = "none"    // hide start button

    generate_code() // call generate code funciton to generate the secret code

    make_guess() // user may make their first guess

    let submit = document.createElement("Button")
    submit.textContent = "Submit Guess"
    sub.appendChild(submit)

});

function make_guess(){ 
    guess.splice(0, guess.length) // ensure guess is clear 
    gameplay.innerHTML += "<br/>"
    gameplay.innerHTML += "<br/>"
    turn = document.createTextNode(`This is guess ` + guessCount+ ` of 8.  
    Click a peg color above and then click a peg to the right to place: `)
    gameplay.appendChild(turn)

    game_buttons()
        
}

function game_buttons(){
    let peg1 = document.createElement("Button")
    let peg2 = document.createElement("Button")
    let peg3 = document.createElement("Button")
    let peg4 = document.createElement("Button")
    peg1.style.fontWeight = '700'
    peg2.style.fontWeight = '700'
    peg3.style.fontWeight = '700'
    peg4.style.fontWeight = '700'
    peg1.textContent = "O"
    peg2.textContent = "O"
    peg3.textContent = "O"
    peg4.textContent = "O"
    peg1.style.color = '#DCDCDC'
    peg2.style.color = '#DCDCDC'
    peg3.style.color = '#DCDCDC'
    peg4.style.color = '#DCDCDC'
    gameplay.appendChild(peg1)
    gameplay.appendChild(peg2)
    gameplay.appendChild(peg3)
    gameplay.appendChild(peg4)

    color_events() 

    peg1.addEventListener("click", event =>{
        peg1.style.color =  col
        guess[0] = col // place color in guess
    })

    peg2.addEventListener("click", event =>{
        pos = 1 //peg position for guess
        peg2.style.color = col
        guess[1] = col // place color in guess
    })

    peg3.addEventListener("click", event =>{
        pos = 2 //peg position for guess
        peg3.style.color = col
        guess[2] = col // place color in guess
    })
    
    peg4.addEventListener("click", event =>{
        pos = 3 //peg position for guess
        peg4.style.color = col
        guess[3] = col // place color in guess
    })

}


function color_events(peg, pos){
    red.addEventListener("click", event =>{
        col = 'red'
        return col
    });

    yellow.addEventListener("click", event =>{
        col = 'yellow'
        return col
    });

    blue.addEventListener("click", event =>{
        col = 'blue'
        return col
    });

    orange.addEventListener("click", event =>{
        col = 'orange'
        return col
    });

    purple.addEventListener("click", event =>{
        col = 'purple'
        return
    });

    green.addEventListener("click", event =>{
        col = 'green';
        return col
    });

}

function generate_code(){     //function to generate the secret code
    for(i=0; i<4; i++){
    randompeg = Math.floor(Math.random() * (6 - 1 + 1)) + 1
    code.push(coldict[randompeg])
    }
    console.log("here's the secret code: ", code)
}

var coldict = {
    1: 'red',
    2: 'yellow',
    3: 'blue',
    4: 'orange',
    5: 'purple',
    6: 'green'
}

function check_guess(guess){
    console.log("This is the guess ", guess)
    if (guess.length< 4){
        err = "You must place a peg in each hole to submit your guess."
            guess.splice(0, guess.length) // ensure guess is clear 
            gameplay.innerHTML += "<br/>"
            gameplay.append(err)
            return make_guess()
    }
    else {
        for (i=0; i<guess.length; i++){
        if (guess[i] == null) {
            err = "You must place a peg in each hole to submit your guess."
            guess.splice(0, guess.length) // ensure guess is clear 
            gameplay.innerHTML += "<br/>"
            gameplay.append(err)
            return make_guess()
        }
    }
    blckcount = 0 //counts correctly guess peggs
    guessCount += 1 // user has used a guess
    codecopy = [...code] // make a copy of the code
    clues = [" ", " ", " ", " "] // array for clues
    gameplay.innerHTML += "<br/>"
    guessResponse = "Here's the clue: "
    gameplay.append(guessResponse)

    for (i=0; i<guess.length; i++){    // first check for guesses with correct color & position
        if (guess[i] == code[i]){
            codecopy[i] = " " // update the code copy to remove this peg from consideration
            guess[i] = " " // update to remove this guess from consideration
            clues[i] = 'black'
            blckcount += 1
        }
    }

    for (i=0; i<guess.length; i++){
        if (codecopy.includes(guess[i]) && guess[i] != " "){  // color is in code but different position
            for(j=0; j<codecopy.length; j++){
                if (guess[i] == codecopy[j]){    // remove the first peg of that color from the code copy
                    codecopy[j] = " "
                    clues[i] = 'white'
                    j = codecopy.length // exit loop
                    };
                };        make_guess


            }
        else{
            if (clues[i] == " "){
                clues[i] = '#DCDCDC' // else peg stays blank
            }
        }
    }
    generate_clues(clues)
    
    if (blckcount == 4){ // user won
        won = true
        return game_over()
    }
    
    if (guessCount < 9){
        guess.splice(0, guess.length) // ensure guess is clear
        make_guess()
    }

    else {
        return game_over() // user lost
    }
    } 
}


function generate_clues(clues){
    console.log('heres the clues', clues)
    for (i=0; i<clues.length; i++){
        var cluebutton = document.createElement("Button")
        cluebutton.style.fontWeight = '700'
        cluebutton.textContent = "O"
        cluebutton.style.color = clues[i]
        gameplay.appendChild(cluebutton);
    }
}

function game_over(){
    gameover = document.getElementById("gameover")
    if (won==true){
        msg = "You guessed the secret code!"
    }
    else {
        msg = "Sorry, you didn't guess the secret code and have no guesses remaining." 
    }
    gameover.append(msg)
    submit.style.display = "none"    // hide submit

}

submit.addEventListener("click", event => {
    check_guess(guess)
    })



