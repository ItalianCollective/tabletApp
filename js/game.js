var stageHeight, stageWidth;

stageWidth = Crafty.stage.elem.offsetWidth;

stageHeight = Crafty.stage.elem.offsetHeight;

Crafty.e("2D, Canvas, Color, Mouse").attr({
  x: stageWidth * 0.5 - 20,
  y: stageHeight - 45,
  z: 9,
  w: 40,
  h: 40
}).bind("Click", function() {
  var player;

  player = Crafty("Player");
  return player.setColor("yellow");
}).color("yellow");
