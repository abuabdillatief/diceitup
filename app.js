/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var tempScore, activePlayer, playerCurrentScore, started;
started = false;
tempScore = [];
activePlayer = 0;




/*GLOBAL FUNCTION */

function diceRoll () {
     var number = Math.floor(Math.random() * 6) + 1;
     var imgNumber = 'dice-' + number + '.png';
     $('img').attr('src', imgNumber);
     tempScore.push(number);
     currentScore(number);
     if (number == 1) {
        playerCurrentScore.text('0');
        $('.player-' + activePlayer + '-panel').removeClass('active');
        if (activePlayer == 0) {
            activePlayer = 1;
            $('.player-' + activePlayer + '-panel').addClass('active');
            tempScore = [];
        } else if (activePlayer == 1) {
            activePlayer = 0;
            $('.player-' + activePlayer + '-panel').addClass('active');
            tempScore = [];
        }

     }
    
}


function currentScore (diceNumber) {
    playerCurrentScore = $('#current-' + activePlayer);
    playerCurrentScore.text(tempScore.reduce(totalScore));
}


function totalScore (total, num) {
    return total + num;
}

function checkScore () {
    var currentFinalScore = tempScore.reduce(totalScore);
    var finalScore = document.getElementById('score-' + activePlayer).innerHTML;
    finalScore = parseInt(finalScore);
    $('#score-' + activePlayer).html(finalScore + currentFinalScore);
     playerCurrentScore.text('0');
    started = false;
    $('.player-' + activePlayer + '-panel').removeClass('active');
    if (($('#score-' + activePlayer).html()) > 60) {
        $('#name-' + activePlayer).text('WINNER!');
        $('#name-' + activePlayer).addClass('winner');
        $('.btn-roll').off('click');
    }
}

/*QUERY SELECTOR */


$('.btn-new').click(function(){
    $('#name-0').text('PLAYER 1');
    $('#name-1').text('PLAYER 2');
    var playerOneName = prompt ('Player One\'s Name:');
    var playerTwoName = prompt ('Player Two\'s Name:');
    if (playerOneName == '' && true) {
        playerOneName = 'PLAYER 1';
    }if (playerTwoName == '' && true) {
        playerTwoName = 'PLAYER 2';
    }
    setTimeout(function(){
        $('#name-0').text(playerOneName);
        $('#name-1').text(playerTwoName);
    }, 700);
    if (!started) {
        $('.btn-roll').click(function(){
            diceRoll();
          });
        $('.player-name').removeClass('winner');
        $('.player-score').html('0');
        $('.player-current-score').html('0');
        $('.player-0-panel').removeClass('active');
        $('.player-1-panel').removeClass('active');
        activePlayer = 0;
        $('.player-0-panel').addClass('active');
        started = true;
       
    }
});



$('.btn-hold').click(function(){
    checkScore ();
    if (activePlayer == 0) {
        activePlayer = 1;
        $('.player-' + activePlayer + '-panel').addClass('active');
        tempScore = [];
    } else if (activePlayer == 1) {
        activePlayer = 0;
        $('.player-' + activePlayer + '-panel').addClass('active');
        tempScore = [];
    }
    $('img').attr('src', 'empty');


});














