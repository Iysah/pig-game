'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currrent0El = document.getElementById('current--0');
const currrent1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew =document.querySelector('.btn--new');
const btnRoll =document.querySelector('.btn--roll');
const btnHold =document.querySelector('.btn--hold');

// STARTIMG CONDITIONS
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; 
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
    if (playing) {
        //1. Generate Random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);
        //2. display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        //3. CHECK FOR ROLLED 1 
       if (dice !== 1) {
           // Add dice to current score

           currentScore += dice; 
           document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
           // Switch to next player
           switchPlayer();
        }
    }
    
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add Current Score to active score
    
       scores[activePlayer] += currentScore;
       // scores[1] = scores[1] + currentScore;
       document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

       // 2. check if player's score is >= 100
       if (scores[activePlayer] >= 50) {
           // Finish the game
           playing = false;
           diceEl.classList.add('hidden');
           document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
           document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        } else {
           // Switch to the next player
          switchPlayer();
        }
    }

});

btnNew.addEventListener('click', function () {
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    currrent0El.textContent = 0;
    currrent1El.textContent = 0;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    player0El.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    document.querySelector('#name--0').style.fontWeight = '700';

})