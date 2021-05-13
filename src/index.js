'use strict';

import './styles.css';
// Selecting elements:
const score0El = document.getElementById('score--0'),
	score1El = document.getElementById('score--1'),
	diceEl = document.querySelector('.dice'),
	btnNew = document.querySelector('.btn--new'),
	btnRoll = document.querySelector('.btn--roll'),
	btnHold = document.querySelector('.btn--hold'),
	current0El = document.getElementById('current--0'),
	current1El = document.getElementById('current--1'),
	player0El = document.querySelector('.player--0'),
	player1El = document.querySelector('.player--1'),
	playerScore0El = document.getElementById('score--0'),
	playerScore1El = document.getElementById('score--1');

let scores, currentScore, activePlayer, playing;

const init = () => {
	score0El.textContent = 0;
	score1El.textContent = 0;
	diceEl.classList.add('hidden'),
	scores = [0, 0],
    currentScore = 0,
    activePlayer = 0,
    playing = true,
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
	player1El.classList.remove('player--active');
};

init();

const switchPlayer = () => {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
    
    player0El.classList.toggle('player--active');
	player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        diceEl.classList.remove('hidden');
        diceEl.src = `./assets/dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;

            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.onclick = () => {
	if (playing) {
        scores[activePlayer] += currentScore;

	    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 15) {
            playing = false;
            diceEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
	    }
    }
};

btnNew.onclick = init;
