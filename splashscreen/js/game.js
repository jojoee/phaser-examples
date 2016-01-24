// Splashscreen

var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'game-canvas');
Game = {};

var score = 0;

var DEBUG_XPOS;
var DEBUG_YPOS;
var DEBUG_Y_STEP = 20;
var STARTED_DEBUG_XPOS = 8;
var STARTED_DEBUG_YPOS = 40;

Game.Load1 = function(game) {};

Game.Load1.prototype = {
  preload: function() {
    var bgColor = '#34495e';
    game.stage.backgroundColor = bgColor;

    var msg = 'Loading...';
    var fontStyle = {
      font  :'30px Arial',
      fill  :'#fff'
    }
    var label = game.add.text(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      msg,
      fontStyle
    );

    label.anchor.setTo(0.5, 0.5);
  },
  create: function() {
    // game.state.start('Play');
  }
};

Game.Load2 = function(game) {};
Game.Load2.prototype = {
  preload: function() {
    var bgColor = '#eee';
    game.stage.backgroundColor = bgColor;

    var text1Msg = 'made with';
    var text1Style = {
      font  :'16px Arial',
      fill  :'#9C9C9C'
    };
    text1 = game.add.text(
      GAME_WIDTH / 2 + 140,
      GAME_HEIGHT / 2 - 60,
      text1Msg,
      text1Style
    );
    text1.anchor.setTo(1, 1);

    var text2Msg = 'Superpowers';
    var text2Style = {
      font  :'50px Arial',
      fill  :'#545454'
    };
    text2 = game.add.text(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      text2Msg,
      text2Style
    );
    text2.anchor.setTo(0.5, 1);

    var text3Msg = 'the extensible, collaborative HTML5 game maker';
    var text3Style = {
      font  :'16px Arial',
      fill  :'#65655B'
    };
    text3 = game.add.text(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2 + 20,
      text3Msg,
      text3Style
    );
    text3.anchor.setTo(0.5, 1);

    // progress
    // 
    // #D0D3C2
    // #A3A49F
  }
}

// game.state.add('Load1', Game.Load1);
game.state.add('Load2', Game.Load2);
// game.state.start('Load1');
game.state.start('Load2');
