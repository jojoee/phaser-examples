// the game itself
var game;
// two variables to represent "horizontal" and "vertical" cars. Better using HORIZONTAL and VERTICAL rather than 0 and 1
var HORIZONTAL = 0;
var VERTICAL = 1;
// size of each tile, in pixels
var tileSize = 80;
// game board, it's a 6x6 array, initially all its items are set to zero = empty
var levelArray = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]
];
// these are the cars to place on the board.
// each car is an object with the following properties:
// row: car upper row
// col: car leftmost column
// dir: car direction, can be HORIZONTAL or VERTICAL
// spr: name of the image to assign to car sprite
var carsArray = [{
  row: 0,
  col: 0,
  dir: HORIZONTAL,
  len: 2,
  spr: "car"
}, {
  row: 1,
  col: 0,
  dir: VERTICAL,
  len: 3,
  spr: "truck"
}, {
  row: 4,
  col: 0,
  dir: VERTICAL,
  len: 2,
  spr: "car"
}, {
  row: 2,
  col: 1,
  dir: HORIZONTAL,
  len: 2,
  spr: "car"
}, {
  row: 1,
  col: 3,
  dir: VERTICAL,
  len: 3,
  spr: "truck"
}, {
  row: 5,
  col: 2,
  dir: HORIZONTAL,
  len: 3,
  spr: "truck"
}, {
  row: 0,
  col: 5,
  dir: VERTICAL,
  len: 3,
  spr: "truck"
}, {
  row: 4,
  col: 4,
  dir: HORIZONTAL,
  len: 2,
  spr: "car"
}]
// some car colors to be randomly assigned to cars
var carColors = ["0xff0000", "0x00ff00", "0x0000ff", "0xffff00", "0x00ffff", "0xff00ff"];
// once the window ends loading...
window.onload = function() {
  // creation of a new game
  game = new Phaser.Game(480, 480);
  // creation of "PlayGame" state
  game.state.add("PlayGame", playGame);
  // launching "PlayGame" state
  game.state.start("PlayGame");
}
// "PlayGame" state
var playGame = function(game) {}
playGame.prototype = {
  // when the state preloads...
  preload: function() {
    // preloading graphic assets
    game.load.image("field", "assets/field.png");
    game.load.image("car", "assets/car.png");
    game.load.image("truck", "assets/truck.png");
  },
  // when the state starts...
  create: function() {
    // adding the sprite representing the game field     
    game.add.sprite(0, 0, "field");
    // now it's time to add all cars
    for (var i = 0; i < carsArray.length; i++) {
      // to keep the code clear, I assign carsArray[i] to a variable simply called "car"
      var car = carsArray[i];
      // looping through car length
      for (var j = 0; j < car.len; j++) {
        // if the car is horizontal
        if (car.dir == HORIZONTAL) {
          // setting levelArray items overlapped by the car to 1 (not empty);
          levelArray[car.row][car.col + j] = 1;
        }
        // if the car is vertical... (I know I could have used "else" but being a tutorial it looks better this way)
        if (car.dir == VERTICAL) {
          // setting levelArray items overlapped by the car to 1 (not empty);
          levelArray[car.row + j][car.col] = 1;
        }
      }
      // adding the sprite representing the car
      // notice car direction (car.dir) is also involved in the placement.
      var carSprite = game.add.sprite(tileSize * car.col + tileSize * car.dir, tileSize * car.row, car.spr);
      // car sprite will be rotated by 90 degrees if the car is VERTICAL and by 0 degrees if the car is HORIZONTAL
      carSprite.angle = 90 * car.dir;
      // Assigning to car sprite some custom data, adding them as an object. We'll store car position, direction and length
      carSprite.data = {
          row: car.row,
          col: car.col,
          dir: car.dir,
          len: car.len
        }
        // assigning a random color to the car
      carSprite.tint = carColors[game.rnd.between(0, carColors.length - 1)];
      // the car has input enabled
      carSprite.inputEnabled = true;
      // the car can be dragged
      carSprite.input.enableDrag();
      // the car will snap to a tileSize * tileSize grid but only when it's released
      carSprite.input.enableSnap(tileSize, tileSize, false, true);
      // when the car starts to be dragged, call startDrag funcion
      carSprite.events.onDragStart.add(startDrag);
      // when the car stops to be dragged, call stopDrag function
      carSprite.events.onDragStop.add(stopDrag);
      // if car direction is VERTICAL then prevent the sprite to be dragged horizontally
      if (car.dir == VERTICAL) {
        carSprite.input.allowHorizontalDrag = false;
      }
      // if car direction is HORIZONTAL then prevent the sprite to be dragged vertically
      if (car.dir == HORIZONTAL) {
        carSprite.input.allowVerticalDrag = false;
      }
    }
  }
}
// function to be called when a car is dragged. "s" is the reference of the car itself
function startDrag(s) {
  // declaring some variables here because I am using them 
  var i;
  var from;
  var to;
  // if the car is horizontal...
  if (s.data.dir == HORIZONTAL) {
    // from is the leftmost column occupied by the car
    from = s.data.col;
    // to is the rightmost column occupied by the car
    to = s.data.col + s.data.len - 1;
    // now we are going from the leftmost column backward until column zero, the first column
    for (i = s.data.col - 1; i >= 0; i--) {
      // if it's an empty spot, then we update "from" position
      if (levelArray[s.data.row][i] == 0) {
        from = i;
      }
      // otherwise we exit the loop
      else {
        break;
      }
    }
    // now we are going from the rightmost column forward until column five, the last column
    for (i = s.data.col + s.data.len; i < 6; i++) {
      // if it's an empty spot, then we update "to" position
      if (levelArray[s.data.row][i] == 0) {
        to = i;
      }
      // otherwise we exit the loop
      else {
        break;
      }
    }
    // at this time, we assign the car a bounding box which will limit its movements. Think about it as a fence,
    // the car cannot cross the fence
    s.input.boundsRect = new Phaser.Rectangle(from * tileSize, s.y, (to - from + 1) * tileSize, tileSize);
  }
  // the same thing applies to verical cars, just remember this time they are rotated by 90 degrees
  if (s.data.dir == VERTICAL) {
    from = s.data.row;
    to = s.data.row + s.data.len - 1;
    for (i = s.data.row - 1; i >= 0; i--) {
      if (levelArray[i][s.data.col] == 0) {
        from = i;
      } else {
        break;
      }
    }
    for (i = s.data.row + s.data.len; i < 6; i++) {
      if (levelArray[i][s.data.col] == 0) {
        to = i;
      } else {
        break;
      }
    }
    s.input.boundsRect = new Phaser.Rectangle(s.x, from * tileSize, s.x + s.data.len * tileSize, (to - from + 2 - s.data.len) * tileSize);
  }
}
// function to be called when a car is not dragged anymore. "s" is the reference of the car itself
function stopDrag(s) {
  // here we just update levelArray items according to the car we moved.
  // first, we set to zero all items where the car was initially placed
  for (var i = 0; i < s.data.len; i++) {
    if (s.data.dir == HORIZONTAL) {
      levelArray[s.data.row][s.data.col + i] = 0;
    }
    if (s.data.dir == VERTICAL) {
      levelArray[s.data.row + i][s.data.col] = 0;
    }
  }
  // then we set to 1 all items where the car is placed now
  if (s.data.dir == HORIZONTAL) {
    s.data.col = s.x / tileSize;
    for (i = 0; i < s.data.len; i++) {
      levelArray[s.data.row][s.data.col + i] = 1;
    }
  }
  if (s.data.dir == VERTICAL) {
    s.data.row = s.y / tileSize;
    for (i = 0; i < s.data.len; i++) {
      levelArray[s.data.row + i][s.data.col] = 1;
    }
  }
}