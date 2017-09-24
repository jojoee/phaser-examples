// the game
var game;

// size of each tile, in pixels
var gridSize = 40;

// colors to be used in game
var colorsInGame = [0xff0000, 0xff8800, 0x00ff00, 0x0000ff, 0xff00ff, 0x555555];

// how many circles in game?
var circlesInGame = 4;

// creation of the game
window.onload = function () {
  game = new Phaser.Game(320, 480);
  game.state.add("PlayGame", playGame);
  game.state.start("PlayGame");
}


var playGame = function (game) {}

playGame.prototype = {
  preload: function () {

    // preloading the assets
    game.load.spritesheet("circles", "assets/circles.png", gridSize, gridSize);
    game.load.spritesheet("timer", "assets/timer.png", 16, 16);
    game.load.image("background", "assets/background.png");
  },
  create: function () {

    // game won't pause if focus il lost
    game.stage.disableVisibilityChange = true;

    // checking if it's game over
    this.gameOver = false;

    // set background color to white                                                                                     
    game.stage.backgroundColor = "#ffffff";

    // adding a group containing all circles
    this.circleGroup = game.add.group();

    // placeCirlces method will handle circle placement and movement
    this.handleCircles();

    // filling the entire canvas with a tile sprite
    this.cover = game.add.tileSprite(0, 0, game.width, game.height, "background");

    // setting the cover to tansparent
    this.cover.alpha = 0;

    // adding a group containing all timers
    this.timerGroup = game.add.group();

    // adding 10 circle timers to timerGroup group
    for (var i = 0; i < 10; i++) {
      var timeCircle = game.add.sprite(i * 20, game.height - 20, "timer");
      this.timerGroup.add(timeCircle);
    }

    // horizontal centering timerGroup
    this.timerGroup.x = (game.width - this.timerGroup.width) / 2;
  },

  // function to place the circles on the stage
  handleCircles: function () {

    // removing old circles, if any
    this.removeOldCircles();

    // adding new circles to the game
    this.addNewCircles();

    // after two seconds, let's cover the screen
    game.time.events.add(Phaser.Timer.SECOND * 2, this.fadeOut, this);
  },

  // function to remove circles from the stage
  removeOldCircles: function () {

    // handlong circles already in game, if any
    this.circleGroup.forEach(function (item) {

      // set remaining circles back to their colors and frames                   
      item.tint = item.tintColor;
      item.frame = 0;

      // choosimg a random direction: 1 = left, 2 = up, 3 = right, 4 = down
      var randomDirection = game.rnd.integerInRange(1, 4);

      // a temporary object which will be used to handle circle tween
      var tweenObject = {};

      // according to random direction...
      switch (randomDirection) {
        case 1:

          // left: circle will leave the stage to the left
          tweenObject.x = -gridSize;
          break;
        case 2:

          // up: circle will leave the stage to the top
          tweenObject.y = -gridSize;
          break;
        case 3:

          // right: circle will leave the stage to the right
          tweenObject.x = game.width + gridSize;
          break;
        case 4:

          // down: circle will leave the stage to the bottom
          tweenObject.y = game.height + gridSize;
          break;
      }

      // moving the circle to its new position
      var removeTween = game.add.tween(item).to(tweenObject, 500, Phaser.Easing.Cubic.In, true);

      removeTween.onComplete.add(function (item) {
        item.destroy();
      }, this)

    }, this);
  },

  // function to add new circles
  addNewCircles: function () {

    // possibleColors will contain the same items as colorsInGame array,
    // just repeated (circlesInGame - 1) times.
    // we want to have more circles with the same color, but not ALL circle with the same color
    this.possibleColors = [];
    this.possibleColors.lenght = 0;
    for (var i = 0; i < colorsInGame.length; i++) {
      for (var j = 0; j < circlesInGame - 1; j++) {
        this.possibleColors.push(colorsInGame[i])
      }
    }

    // boardWidth and boardHeight will determine the width and height of the game board,
    // according to game size and grid size.
    // we subtract 2 from both boardWidth and boardHeight because we don't want
    // tiles to be at the very edge of the canvas
    var boardWidth = game.width / gridSize - 2;
    var boardHeight = game.height / gridSize - 2;

    // creation of an array with all possible grid positions
    this.positionsArray = [];
    this.positionsArray.length = 0;
    for (var i = 0; i < (boardWidth) * (boardHeight); i++) {
      this.positionsArray.push(i);
    }

    // pickedColors is the array which will contain all colors actually used in this game
    this.pickedColors = [];
    this.pickedColors.length = 0;

    // repeating this loop circlesInGame times
    for (var i = 0; i < circlesInGame; i++) {

      // choosing a random position for the circle.
      // this position won't be available anymore as we remove it from positionsArray 
      var randomPosition = Phaser.ArrayUtils.removeRandomItem(this.positionsArray);

      // determining circle x and y position in pixels
      var posX = (1 + randomPosition % (boardWidth)) * gridSize;
      var posY = (1 + Math.floor(randomPosition / boardWidth)) * gridSize;

      // creating the circle as a button which calls circleSelected function
      var circle = game.add.button(posX, posY, "circles", this.circleSelected, this);

      // adding the circle to circleGroup group 
      this.circleGroup.add(circle);

      // tinting the circle with a possible color and removing the color
      // from the array of possible colors.
      // we also save its tint color in a property called tintColor
      circle.tintColor = Phaser.ArrayUtils.removeRandomItem(this.possibleColors)
      circle.tint = circle.tintColor;

      // adding the tint color to pickedColors array, if not already in the array
      if (this.pickedColors.indexOf(circle.tint) == -1) {
        this.pickedColors.push(circle.tint);
      }

      // choosimg a random direction: 1 = left, 2 = up, 3 = right, 4 = down
      var randomDirection = game.rnd.integerInRange(1, 4);

      // a temporary object which will be used to handle circle tween
      var tweenObject = {};

      // according to random direction...
      switch (randomDirection) {
        case 1:

          // left: circle is placed just outside left border and the tween
          // will bring it to its initial x position
          circle.x = -gridSize;
          tweenObject.x = posX;
          break;
        case 2:

          // up: circle is placed just outside upper border and the tween
          // will bring it to its initial y position
          circle.y = -gridSize;
          tweenObject.y = posY;
          break;
        case 3:

          // right: circle is placed just outside right border and the tween
          // will bring it to its initial x position
          circle.x = game.width + gridSize;
          tweenObject.x = posX;
          break;
        case 4:

          // down: circle is placed just outside bottom border and the tween
          // will bring it to its initial y position
          circle.y = game.height + gridSize;
          tweenObject.y = posY;
          break;
      }

      // adding the tween to circle. This will create the "enter in the stage" effect
      game.add.tween(circle).to(tweenObject, 500, Phaser.Easing.Cubic.Out, true);
    }
  },

  // this function will cover the screen with a random color
  fadeOut: function () {

    // this variable will count the ticks
    this.timePassed = 1;

    // setting all time circles to frame zero
    this.timerGroup.forEach(function (item) {
      item.frame = 0;
    }, this)

    // giving the cover a tint color picked among circle colors 
    this.cover.tint = Phaser.ArrayUtils.getRandomItem(this.pickedColors);

    // tweening the cover to fully opaque
    var coverTween = game.add.tween(this.cover).to({
      alpha: 1
    }, 200, Phaser.Easing.Linear.None, true);

    // once the cover is fully opaque...
    coverTween.onComplete.add(function () {

      // bring to top circleGroup as it was hidden by the cover
      game.world.bringToTop(this.circleGroup);

      // for each circle in circleGroup group...
      this.circleGroup.forEach(function (item) {

        // tinting it white
        item.tint = 0xffffff;

        // setting it to frame 1 to show just a white ring
        item.frame = 1;
      }, this);

      // startig the countdown
      this.countDown = game.time.events.repeat(Phaser.Timer.SECOND / 5, 11, this.tick, this);

    }, this)
  },

  // this function will be called each time a circle is touched
  // b is the circle
  circleSelected: function (b) {

    // if the screen is already fully covered...
    if (!this.gameOver && this.cover.alpha == 1) {

      // if the circle has the same tint color of the cover...
      // (we use tintColor property we previously saved, because circle tint color now is white)
      if (b.tintColor == this.cover.tint) {

        // then destroy it
        b.destroy();

        // checking if the level is completed, that is there aren't circles with
        // cover color still on the stage
        var levelCompleted = true;
        this.circleGroup.forEach(function (item) {
          if (item.tintColor == this.cover.tint) {
            levelCompleted = false;
          }
        }, this);

        // if level is completed, advance to next level
        if (levelCompleted) {

          // stop the timer
          game.time.events.remove(this.countDown);

          // turning the cover invisible
          this.cover.alpha = 0;

          // placing new circles
          this.handleCircles();
        }
      } else {

        // if not, show the actual color of the circle
        b.tint = b.tintColor
        b.frame = 0;

        // then stop the timer
        game.time.events.remove(this.countDown);

        // and it's game over
        this.gameOver = true

        // wait 5 seconds then restart the game
        game.time.events.add(Phaser.Timer.SECOND * 5, function () {
          game.state.start("PlayGame");
        }, this);
      }
    }
  },

  // function to be executed by countDown timer event
  tick: function (e) {

    // if timePassed is less or equal to 10, that is if there still is time left...
    if (this.timePassed <= 10) {

      // turn off a timer circle
      this.timerGroup.getChildAt(10 - this.timePassed).frame = 1;

      // increase time passed
      this.timePassed++;
    }

    // else, it's game over
    else {
      //this.gameOver = true;
    }
  }
}