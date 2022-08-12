var colors = {
  blueOn: '#7baefe',
  blueOff: '#2659a9',
  redOn: '#fb7b7b',
  redOff: '#d62626',
  yellowOn: '#fff57b',
  yellowOff: '#eec026',
  greenOn: '#7bfb99',
  greenOff: '#26b644'
};

var game = {
  status: 'off',
  score: "--",
  Sequence: [],
  Sequence_player: [],
  timestep: 1000,
  allowPress: true,
  active: false
};


/////* Game functions */////
// Reset game to initial state
function resetGame() {
  var game = {
  status: 'off',
  score: "--",
  Sequence: [],
  Sequence_player: [],
  timestep: 1000,
  allowPress: true,
  active: false
};
  counter = 0;
  $('#score-screen').attr("placeholder", game.score);
  
}

function addNumber() {
  game.Sequence.push(Math.floor(Math.random() * 4));
  if(game.score === "--"){
    game.score = 1}
   else{game.score += 1;};
  $('#score-screen').attr("placeholder", game.score);
}

function play() {
  if (game.score >= 12) {
    winScreen();
  } else {
    $('#btn-start').css('background-color', colors.greenOn);
    game.allowPress = false;
    game.Sequence.forEach(function( counter) {
      setTimeout(game.timestep*(counter+1));
    });
    setTimeout(function() {
      game.allowPress = true;
      $('#btn-start').css('background-color', colors.greenOff);
    }, game.timestep*(game.Sequence.length+1))
  }
}

function checkSequence() {
  var index = game.Sequence_player.length - 1;
  if (game.Sequence_player[index] != game.Sequence[index]) {
    game.Sequence_player = [];
    wrongButton();
    return false;
  }

  if (game.Sequence_player[index] === game.Sequence[index] && game.Sequence_player.length === game.Sequence.length) {
    game.Sequence_player = [];
    game.allowPress = false;
    setTimeout(function() {
      addNumber();
      play();
    }, 1000);
  }
  else {
    game.Sequence_player = [];
    wrongButton();
    return false;
  }
}

function wrongButton() {
  game.allowPress = false;
  $('#score-screen').attr("placeholder", "!!");
  setTimeout(function() {
      resetGame();
    }, 2000);
   
}

function button_flash(btnNum) {
  if(btnNum == 0){
      $('#btn0').stop().animate({backgroundColor: colors.blueOn}, 10);
      $('#btn0').animate({backgroundColor: colors.blueOff}, 400);
      }
    if(btnNum == 1){
      $('#btn1').stop().animate({backgroundColor: colors.redOn}, 10);
      $('#btn1').animate({backgroundColor: colors.redOff}, 400);
    }
    if(btnNum == 2){
      $('#btn2').stop().animate({backgroundColor: colors.yellowOn}, 10);
      $('#btn2').animate({backgroundColor: colors.yellowOff}, 400);
    }
    if(btnNum == 3){
      $('#btn3').stop().animate({backgroundColor: colors.greenOn}, 10);
      $('#btn3').animate({backgroundColor: colors.greenOff}, 400);
    }
}
  



function winScreen() {
  $('#score-screen').attr("placeholder", "GG");
  var cycle = setInterval(function() {
    $('#btn0').stop().animate({backgroundColor: colors.blueOn}, 500);
    $('#btn0').animate({backgroundColor: colors.blueOff}, 500);
    $('#btn1').stop().animate({backgroundColor: colors.redOn}, 500);
    $('#btn1').animate({backgroundColor: colors.redOff}, 500);
    $('#btn2').stop().animate({backgroundColor: colors.yellowOn}, 500);
    $('#btn2').animate({backgroundColor: colors.yellowOff}, 500);
    $('#btn3').stop().animate({backgroundColor: colors.greenOn}, 500);
    $('#btn3').animate({backgroundColor: colors.greenOff}, 500);
  }, 1000);
  setTimeout(function() {
    clearInterval(cycle);
    resetGame();
  }, 3800);
}


/////* Event listeners */////

$('#btn-start').click(function() {
  if (game.allowPress === true && game.active === false) {
    game.active = true;
    addNumber();
    play();
  };
});
