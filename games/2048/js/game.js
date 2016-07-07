window.onload = function() {

// tile width, in pixels
var tileSize = 100;
var gameWidth = tileSize * 4;
var gameHeight = tileSize * 4;
var game = new Phaser.Game(
  gameWidth,
  gameHeight,
  Phaser.CANVAS,
  'game-canvas',
  {
    preload: onPreload,
    create: onCreate
  }
);

var nEle = 16;

// game array, starts with all cells to zero
var fieldArray;

// http://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array
// http://stackoverflow.com/questions/20222501/how-to-create-a-zero-filled-javascript-array-of-arbitrary-length
// fieldArray = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
fieldArray = Array.apply(null, Array(nEle)).map(Number.prototype.valueOf, 0);

// this is the group which will contain all tile sprites
var tileSprites;

// variables to handle keyboard input
var upKey;
var downKey;
var leftKey;
var rightKey;

// colors to tint tiles according to their value
var colors = {
  2     : 0xFFFFFF,
  4     : 0xFFEEEE,
  8     : 0xFFDDDD,
  16    : 0xFFCCCC,
  32    : 0xFFBBBB,
  64    : 0xFFAAAA,
  128   : 0xFF9999,
  256   : 0xFF8888,
  512   : 0xFF7777,
  1024  : 0xFF6666,
  2048  : 0xFF5555,
  4096  : 0xFF4444,
  8192  : 0xFF3333,
  16384 : 0xFF2222,
  32768 : 0xFF1111,
  65536 : 0xFF0000
}

var canMove = false;
var assetsPath = 'assets'
function onPreload() {
  game.load.image('tile', assetsPath + '/tile.png');
}

function onCreate() {
  // listeners for WASD keys
  upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
  upKey.onDown.add(moveUp,this);

  downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
  downKey.onDown.add(moveDown,this);

  leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
  leftKey.onDown.add(moveLeft,this);

  rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
  rightKey.onDown.add(moveRight,this);

  // sprite group declaration
  tileSprites = game.add.group();

  // at the beginning of the game we add two "2"
  addTwo();
  addTwo();
}

// add '2' box
function addTwo() {
  // choosing an empty tile in the field
  do{
    var randomValue = Math.floor(Math.random() * 16);

  } while (fieldArray[randomValue] != 0)
    // assign value
    fieldArray[randomValue] = 2;

    // creation of a new sprite with "tile" instance, that is "tile.png" we loaded before
    var tile = game.add.sprite(
      toCol(randomValue) * tileSize, // x
      toRow(randomValue) * tileSize, // y
      'tile'
    );

    // set position
    tile.pos = randomValue;

    // at the beginning the tile is completely transparent
    tile.alpha = 0;

    // set text
    var tileTxt = '2';
    var text = game.add.text(
      tileSize / 2,
      tileSize / 2,
      tileTxt,
      {
        font: 'bold 16px Arial',
        align: 'center'
      }
    );
    text.anchor.set(0.5);

    tile.addChild(text);

    // add into tile's group
    tileSprites.add(tile);

    // creation of a new tween for the tile sprite
    var fadeIn = game.add.tween(tile);
    fadeIn.to({
      alpha: 1
    }, 250);

    // tween callback
    fadeIn.onComplete.add(function() {
      updateNumbers();
      canMove = true;
    })

    // start animate
    fadeIn.start();
  }

  // GIVING A NUMBER IN A 1-DIMENSION ARRAY, RETURNS THE ROW
  function toRow(n) {
    return Math.floor(n / 4);
  }

  // GIVING A NUMBER IN A 1-DIMENSION ARRAY, RETURNS THE COLUMN
  function toCol(n){
    return n % 4; 
  }

  // THIS FUNCTION UPDATES THE NUMBER AND COLOR IN EACH TILE
  function updateNumbers() {
    // look how I loop through all tiles
    tileSprites.forEach(function(item) {
      // retrieving the proper value to show
      var value = fieldArray[item.pos];

      // showing the value
      item.getChildAt(0).text = value;

      // tinting the tile
      item.tint = colors[value];
    });
  }

  // MOVING TILES LEFT
  function moveLeft() {
    // Is the player allowed to move?
    if (canMove) {
      // the player can move, let's set "canMove" to false to prevent moving again until the move process is done
      canMove = false;

      // keeping track if the player moved, i.e. if it's a legal move
      var moved = false;

      // look how I can sort a group ordering it by a property
      tileSprites.sort("x", Phaser.Group.SORT_ASCENDING);

      // looping through each element in the group
      tileSprites.forEach(function(item) {
        // getting row and column starting from a one-dimensional array
        var row = toRow(item.pos);
        var col = toCol(item.pos);

        // checking if we aren't already on the leftmost column (the tile can't move)
        if (col > 0) {
          // setting a "remove" flag to false. Sometimes you have to remove tiles, when two merge into one 
          var remove = false;

          // looping from column position back to the leftmost column
          for (i = col - 1; i >= 0; i--) {
            // if we find a tile which is not empty, our search is about to end...
            if (fieldArray[row * 4 + i] != 0) {
              // ...we just have to see if the tile we are landing on has the same value of the tile we are moving
              if (fieldArray[row * 4 + i] == fieldArray[row * 4 + col]) {
                // in this case the current tile will be removed
                remove = true;
                i--;                                             
              }
              break;
            }
          }

          // if we can actually move...
          if (col != i + 1) {
            // set moved to true
            moved = true;

            // moving the tile "item" from row*4+col to row*4+i+1 and (if allowed) remove it
            moveTile(item,row*4+col,row*4+i+1,remove);
          }
        }
      });
    }
    
    // completing the move
    endMove(moved);
  }

  // FUNCTION TO COMPLETE THE MOVE AND PLACE ANOTHER "2" IF WE CAN
  function endMove(m) {
    // if we move the tile...
    if (m) {
      // add another "2"
      addTwo();

    } else {
      // otherwise just let the player be able to move again
      canMove = true;
    }
  }

  // FUNCTION TO MOVE A TILE
  function moveTile(tile,from,to,remove) {
    // first, we update the array with new values
    fieldArray[to] = fieldArray[from];
    fieldArray[from] = 0;
    tile.pos = to;

    // then we create a tween
    var movement = game.add.tween(tile);
    movement.to({
      x: tileSize * (toCol(to)),
      y: tileSize * (toRow(to))
    }, 150);

    if (remove) {
      // if the tile has to be removed, it means the destination tile must be multiplied by 2
      fieldArray[to] *= 2;

      // at the end of the tween we must destroy the tile
      movement.onComplete.add(function() {
       tile.destroy();
      });
    }

    // let the tween begin!
    movement.start();
  }
              
  // MOVING TILES UP - SAME PRINCIPLES AS BEFORE
  function moveUp() {
    if (canMove) {
      canMove = false;
      var moved = false;
      tileSprites.sort("y", Phaser.Group.SORT_ASCENDING);
      tileSprites.forEach(function(item) {
        var row = toRow(item.pos);
        var col = toCol(item.pos);
        if (row > 0) {
          var remove=false;
          for (i = row - 1; i >= 0; i--) {
            if (fieldArray[i * 4 + col] != 0) {
              if (fieldArray[i * 4 + col] == fieldArray[row * 4 + col]) {
                remove = true;
                i--;
              }
              break;
            }
          }
          
          if (row != i + 1) {
            moved = true;
            moveTile(item, row * 4 + col, (i + 1) * 4 + col, remove);
          }
        }
      });
      
      endMove(moved);
    }
  }

  // MOVING TILES RIGHT - SAME PRINCIPLES AS BEFORE
  function moveRight() {
    if (canMove) {
      canMove = false;
      var moved = false;
      tileSprites.sort("x", Phaser.Group.SORT_DESCENDING);
      tileSprites.forEach(function(item) {
        var row = toRow(item.pos);
        var col = toCol(item.pos);
        if (col < 3) {
          var remove = false;
          for (i = col + 1; i <= 3; i++) {
            if (fieldArray[row * 4 + i] != 0) {
              if (fieldArray[row * 4 + i] == fieldArray[row * 4 + col]) {
                remove = true;
                i++;
              }
              
              break;
            }
          }

          if (col != i - 1) {
            moved = true;
            moveTile(item, row * 4 + col, row * 4 + i - 1, remove);
          }
        }
      });

      endMove(moved);
    }
  }

  // MOVING TILES DOWN - SAME PRINCIPLES AS BEFORE
  function moveDown() {
    if (canMove) {
      canMove = false;
      var moved = false;
      tileSprites.sort("y", Phaser.Group.SORT_DESCENDING);
      tileSprites.forEach(function(item) {
        var row = toRow(item.pos);
        var col = toCol(item.pos);
        if (row < 3) {
          var remove = false;
          for (i = row + 1; i <= 3; i++) {
            if (fieldArray[i * 4 + col] != 0) {
              if (fieldArray[i * 4 + col] == fieldArray[row * 4 + col]) {
                remove = true;
                i++;
              }
              
              break;
            }
          }

          if (row != i - 1) {
            moved = true;
            moveTile(item, row * 4 + col, (i - 1) * 4 + col, remove);
          }
        }
      });
      
      endMove(moved);
    }
  }
}
