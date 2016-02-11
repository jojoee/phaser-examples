var game;
var speedMult = 0.7;
// this is the friction which will slow down the map. Must be less than 1
var friction = 0.99;
window.onload = function() {
  game = new Phaser.Game(480, 480, Phaser.AUTO, "");
  game.state.add("PlayGame", playGame);
  game.state.start("PlayGame");
}
var playGame = function(game) {};
playGame.prototype = {
  preload: function() {
    game.load.image("map", "assets/map.png");
  },
  create: function() {
    // the big map to scroll
    this.scrollingMap = game.add.image(0, 0, "map");
    // map will accept inputs
    this.scrollingMap.inputEnabled = true;
    // map can be dragged
    this.scrollingMap.input.enableDrag(false);
    // custom property: we save map position
    this.scrollingMap.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
    // custom property: the map is not being dragged at the moment
    this.scrollingMap.isBeingDragged = false;
    // custom property: map is not moving (or is moving at no speed)
    this.scrollingMap.movingSpeed = 0;
    // map can be dragged only if it entirely remains into this rectangle
    this.scrollingMap.input.boundsRect = new Phaser.Rectangle(game.width - this.scrollingMap.width, game.height - this.scrollingMap.height, this.scrollingMap.width * 2 - game.width, this.scrollingMap.height * 2 - game.height);
    // when the player starts dragging...
    this.scrollingMap.events.onDragStart.add(function() {
      // set isBeingDragged property to true
      this.scrollingMap.isBeingDragged = true;
      // set movingSpeed property to zero. This will stop moving the map
      // if the player wants to drag when it's already moving
      this.scrollingMap.movingSpeed = 0;
    }, this);
    // when the player stops dragging...
    this.scrollingMap.events.onDragStop.add(function() {
      // set isBeingDragged property to false
      this.scrollingMap.isBeingDragged = false;
    }, this);
  },
  update: function() {
    // if the map is being dragged...
    if (this.scrollingMap.isBeingDragged) {
      // save current map position
      this.scrollingMap.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
    }
    // if the map is NOT being dragged...
    else {
      // if the moving speed is greater than 1...
      if (this.scrollingMap.movingSpeed > 1) {
        // adjusting map x position according to moving speed and angle using trigonometry
        this.scrollingMap.x += this.scrollingMap.movingSpeed * Math.cos(this.scrollingMap.movingangle);
        // adjusting map y position according to moving speed and angle using trigonometry
        this.scrollingMap.y += this.scrollingMap.movingSpeed * Math.sin(this.scrollingMap.movingangle);
        // keep map within boundaries
        if (this.scrollingMap.x < game.width - this.scrollingMap.width) {
          this.scrollingMap.x = game.width - this.scrollingMap.width;
        }
        // keep map within boundaries
        if (this.scrollingMap.x > 0) {
          this.scrollingMap.x = 0;
        }
        // keep map within boundaries
        if (this.scrollingMap.y < game.height - this.scrollingMap.height) {
          this.scrollingMap.y = game.height - this.scrollingMap.height;
        }
        // keep map within boundaries
        if (this.scrollingMap.y > 0) {
          this.scrollingMap.y = 0;
        }
        // applying friction to moving speed
        this.scrollingMap.movingSpeed *= friction;
        // save current map position
        this.scrollingMap.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
      }
      // if the moving speed is less than 1...
      else {
        // checking distance between current map position and last saved position
        // which is the position in the previous frame
        var distance = this.scrollingMap.savedPosition.distance(this.scrollingMap.position);
        // same thing with the angle
        var angle = this.scrollingMap.savedPosition.angle(this.scrollingMap.position);
        // if the distance is at least 4 pixels (an arbitrary value to see I am swiping)
        if (distance > 4) {
          // set moving speed value
          this.scrollingMap.movingSpeed = distance * speedMult;
          // set moving angle value
          this.scrollingMap.movingangle = angle;
        }
      }
    }
  }
}