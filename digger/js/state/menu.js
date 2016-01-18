"use strict";
window.Digger.state.menu = {
  create: function() {
    // you can create menu group in map editor and load it like this:
    // mt.createGroup("menu");
    this.game.state.start("play");
  },
  update: function() {
  }
};