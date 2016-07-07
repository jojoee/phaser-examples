"use strict";
window.Digger.state.play = {
  create: function() {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.bg = mt.create("bg");
    this.blocks = mt.create("blocks");
    this.shop = mt.create("shop");
    this.character = mt.create("character");
    this.points = mt.create("points");
    //     this.wtf = mt.create("wtf");
    this.character.animations.add('stand', [0, 1, 2, 3], 10, true);
    this.character.animations.add('fly', [4, 5, 6, 7], 10, true);
    this.character.animations.add('run', [8, 9, 10], 10, true);
    this.character.animations.add('fall', [12, 13, 14, 15], 10, true);
    this.character.animations.add('dig', [16, 17, 18], 10, false);
    this.character.animations.add('dig_down', [20, 21, 22], 10, false);
    this.character.animations.play('stand');
    console.log(this.blocks.gold1);
  },
  update: function() {
    var collideDown = false;
    this.game.physics.arcade.collide(this.character, this.blocks.self,
      function(character, block) {
        if (this.dig) return;
        if (this.cursors.left.isDown) {
          if (block.body.touching.right) {
            this.dig = this.character.animations.play('dig');
            this.dig.onComplete.addOnce(function() {
              this.destroyBlock(block);
            }, this);
          } else {
            this.character.animations.play('run');
          }
        } else if (this.cursors.right.isDown) {
          if (block.body.touching.left) {
            this.dig = this.character.animations.play('dig');
            this.dig.onComplete.addOnce(function() {
              this.destroyBlock(block);
            }, this);
          } else {
            this.character.animations.play('run');
          }
        } else if (this.cursors.down.isDown) {
          if (block.body.touching.up) {
            this.dig = this.character.animations.play('dig_down');
            this.dig.onComplete.addOnce(function() {
              this.destroyBlock(block);
            }, this);
          } else {
            this.character.animations.play('stand');
          }
        }
        if (block.body.touching.up) {
          collideDown = true;
        }
      }, null, this);
    if (this.dig) {
      return;
    }
    if (this.cursors.left.isDown) {
      this.character.scale.x = -1;
      this.character.body.velocity.x = -200;
    } else if (this.cursors.right.isDown) {
      this.character.scale.x = 1;
      this.character.body.velocity.x = 200;
    } else {
      this.character.body.velocity.x = 0;
    }
    if (this.cursors.up.isDown) {
      this.character.body.velocity.y = -300;
      this.character.animations.play('fly');
    } else {
      if (!collideDown) {
        this.character.animations.play('fall');
      } else if (this.character.body.velocity.x === 0) {
        this.character.animations.play('stand');
      }
    }
    if (this.checkOverlap(this.character, this.shop)) {
      if (this.character.getData().userData.gold > 0) {
        var newPoints = parseInt(this.points._text) + this.character.getData().userData.gold;
        this.points.setText(newPoints);
        this.character.getData().userData.gold = 0;
      }
    }
  },
  destroyBlock: function(block) {
    this.dig = false;
    switch (block.key) {
      case '/rock.png':
        break;
      case '/grass.png':
      case '/ground.png':
        block.destroy();
        break;
      case '/gold.png':
        this.character.getData().userData.gold++;
        block.destroy();
        break;
    }
  },
  checkOverlap: function(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
  },
  stopDig: function() {
    this.dig = false;
  }
};