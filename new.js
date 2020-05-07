var scores, roundScore, win, input, score, winning_score, wrong, letStart, lastDice, introToGame, hold, roll, gamePlaying, diceOne, diceTwo, diceImageOne, diceImageTwo, tempScore, setScore, activePlayer;
scores = [0, 0];
roundScore = 0;
activePlayer = 0;
gamePlaying = false;
tempScore = [];
letStart = new Audio('lets-start.wav');
roll = new Audio('click.wav');
introToGame = new Audio('intro-to-game.wav');
hold = new Audio('hold.wav');
win = new Audio ('win.wav');
wrong = new Audio ('wrong.mp3');


$('.btn-new').click(function () {
    gamePlaying = true;
    introToGame.play();
    setTimeout(function () {
        letStart.play();
    }, 1700);
    $('#score-0').text(0);
    $('#score-1').text(0);
    $('.player-0-panel').removeClass('active');
    $('.player-1-panel').removeClass('active');
    $('.player-0-panel').addClass('active');
    $('#name-0').text('PLAYER 1');
    $('#name-1').text('PLAYER 2');
    $('.btn-roll').on();
    $('.btn-hold').on();
    scores = [0,0];

})

$('.btn-roll').click(function () {
    if (gamePlaying) {
        roll.play();
        diceOne = Math.floor(Math.random() * 6) + 1;
        diceTwo = Math.floor(Math.random() * 6) + 1;
        diceImageOne = "dice-" + diceOne + ".png";
        diceImageTwo =  "dice-" + diceTwo + ".png";
        $('#dice-1').attr('src', diceImageOne);
        $('#dice-2').attr('src', diceImageTwo);
        dice = diceOne + diceTwo;
        roundScore += dice;
        $('#current-' + activePlayer).text(roundScore);
        tempScore.push(dice);

        if (diceOne === 6 && diceTwo === 6) {
            wrong.play();
            $('#score-' + activePlayer).text(0);
            $('#current-' + activePlayer).text(0);
            tempScore = [];
            scores[activePlayer] = 0;
            roundScore = 0;
            nextPlayer();
        }

        if (diceOne === 1 || diceTwo === 1) {
            wrong.play();
            roundScore = 0;
            $('#current-' + activePlayer).text(roundScore);
            setTimeout(function (){
                nextPlayer();
            },800);
            
        }
        lastDice = dice;
    }
});

$('.btn-hold').click(function () {
    if (gamePlaying) {
        hold.play();
        scores[activePlayer] += roundScore;
        $('#score-' + activePlayer).text(scores[activePlayer]);

        //Check if player has won.
        input = document.querySelector('.winning-score').value;
        if (input) {
            winning_score = input;
            score = input;
        }
        else {
            winning_score = 50;
            score = 50;
        }
        if (scores[activePlayer] > winning_score) {
            win.play();
            $('#name-' + activePlayer).text('WINNER!');
            $('#name-' + activePlayer).addClass('winner');
            gamePlaying = false;
            $('.btn-new').text('Click Here to Start A New Game')
            $('.dice').attr('src', 'dice-1.png');
        }
        roundScore = 0;
        $('#current-' + activePlayer).text(0);
        tempScore = [];
        nextPlayer();
    }
})

function nextPlayer() {
    $('.player-' + activePlayer + '-panel').removeClass('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    $('.player-' + activePlayer + '-panel').addClass('active');
}

