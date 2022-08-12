

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

document.querySelector('#btn-start').addEventListener('click', () => {  if (game.allowPress === true && game.active === false) {
    game.active = true;
    addNumber();
    play();
  }});

document.querySelector('#btn-reset').addEventListener('click', function() {
  if (game.allowPress === true) {
    resetGame();
  }
});

document.querySelector('.game-btn.top-left').addEventListener('mousedown',function() {
  if (game.allowPress === true) {
    var id = this.id;
    console.log(id);
    var button = parseInt(id.substr(id.length - 1));
    button_flash(button);
    if (game.active === true) {
      game.Sequence_player.push(button);
      check();
    }
  }
});

document.querySelector('.game-btn.top-right').addEventListener('mousedown',function() {
  if (game.allowPress === true) {
    var id = this.id;
    console.log(id);
    var button = parseInt(id.substr(id.length - 1));
    button_flash(button);
    if (game.active === true) {
      game.Sequence_player.push(button);
      check();
    }
  }
});

document.querySelector('.game-btn.bottom-right').addEventListener('mousedown',function() {
  if (game.allowPress === true) {
    var id = this.id;
    console.log(id);
    var button = parseInt(id.substr(id.length - 1));
    button_flash(button);
    if (game.active === true) {
      game.Sequence_player.push(button);
      check();
    }
  }
});

document.querySelector('.game-btn.bottom-left').addEventListener('mousedown',function() {
  if (game.allowPress === true) {
    var id = this.id;
    console.log(id);
    var button = parseInt(id.substr(id.length - 1));
    button_flash(button);
    if (game.active === true) {
      game.Sequence_player.push(button);
      check();
    }
  }
});

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
  game.Sequence.push(Math.floor(Math.random() * 3));
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
  
    game.Sequence.forEach(function(button, counter) {
     setTimeout(function() {
        button_flash(button);
      }, game.timestep*(counter+1));
    });
    setTimeout(function() {
      game.allowPress = true;
      $('#btn-start').css('background-color', colors.greenOff);
    }, game.timestep*(game.Sequence.length+1))
  }
}

function check() {
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
    resetGame();
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
    console.log('test');
      $('#btn0').fadeOut(200).fadeIn(200);
      }
    if(btnNum == 1){
      $('#btn1').fadeOut(200).fadeIn(200);
    }
    if(btnNum == 2){
      $('#btn2').fadeOut(200).fadeIn(200);
    }
    if(btnNum == 3){
      $('#btn3').fadeOut(200).fadeIn(200);
    }
}

function winScreen() {
  $('#score-screen').attr("placeholder", "GG");
  var cycle = setInterval(function() {
    $('#btn0').fadeOut(200).fadeIn(200);
      $('#btn1').fadeOut(200).fadeIn(200);
      $('#btn2').fadeOut(200).fadeIn(200);
      $('#btn3').fadeOut(200).fadeIn(200);
  }, 1000);
  setTimeout(function() {
    clearInterval(cycle);
    resetGame();
  }, 3800);
}
// Fire when page loads
$(document).ready(function() {
  resetGame();
});
