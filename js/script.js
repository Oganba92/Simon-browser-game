

var colors = {
  greenOn: '#7bfb99',
  greenOff: '#26b644'
};

var game = {
  score: "--",
  Sequence: [],
  Sequence_player: [],
  timestep: 1000,
  Pressable: true,
  active: false
};

document.querySelector('#btn-start').addEventListener('click', () => {  if (game.Pressable === true && game.active === false) {
    game.active = true;
    addNumber();
    play();
  }});

document.querySelector('#btn-reset').addEventListener('click', function() {
  if (game.Pressable === true) {
    resetGame();
  }
});

document.querySelector('.game-btn.top-left').addEventListener('mousedown',function() {
  if (game.Pressable === true) {
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
  if (game.Pressable === true) {
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
  if (game.Pressable === true) {
    var id = this.id;
    var button = parseInt(id.substr(id.length - 1));
    button_flash(button);
    if (game.active === true) {
      game.Sequence_player.push(button);
      check();
    }
  }
});

document.querySelector('.game-btn.bottom-left').addEventListener('mousedown',function() {
  if (game.Pressable === true) {
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


function resetGame() {
  game.score = "--";
  game.Sequence = [];
  game.Sequence_player = [];
  
  game.timestep = 1000;
  game.Pressable = true;
  game.active = false;

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
  if (game.score >= 4) {
    winScreen();
  } else {
    $('#btn-start').css('background-color', colors.greenOn);
    game.Pressable = false;
  
    game.Sequence.forEach(function(button, ind) {
     setTimeout(function() {
        button_flash(button);
      }, game.timestep*(ind + 1));
    });
    setTimeout(function() {
      game.Pressable = true;
      $('#btn-start').css('background-color', colors.greenOff);
    }, game.timestep*(game.Sequence.length+1))
  }
}

function check() {
  var index = game.Sequence_player.length - 1;
 
  if (game.Sequence_player[index] != game.Sequence[index]) {
    game.Sequence_player = [];
    wrongButton();
    resetGame();
  }

  if (game.Sequence_player[index] === game.Sequence[index] ) {
    if(game.Sequence_player.length === game.score){
    game.Sequence_player = [];
    game.Pressable = false;
    setTimeout(function() {
      addNumber();
      play();
    }, 1000);
  }
}
  else {
    game.Sequence_player = [];
    wrongButton();
  }
}

function wrongButton() {
  game.Pressable = false;
  $('#score-screen').attr("placeholder", "XX");
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
  $('#score-screen').attr("placeholder", "**");
    var cycle = setInterval(function() {
    $('#btn0').fadeOut(200).fadeIn(200);
      $('#btn1').fadeOut(200).fadeIn(200);
      $('#btn2').fadeOut(200).fadeIn(200);
      $('#btn3').fadeOut(200).fadeIn(200);
  }, 1000);
  setTimeout(function() {
    clearInterval(cycle);
    resetGame();
  }, game.timestep*game.score);
}

$(document).ready(function() {
  resetGame();
});
