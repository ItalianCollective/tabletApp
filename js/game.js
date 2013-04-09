var stageHeight, stageWidth;

stageWidth = Crafty.stage.elem.offsetWidth;

stageHeight = Crafty.stage.elem.offsetHeight;

Crafty.sprite(1, "imgs/azumanga.png", {
  up: [0, 0, 68, 76],
  right: [76 * 5, 0, 68, 76],
  down: [76 * 11, 0, 68, 76],
  left: [76 * 17, 0, 68, 76]
});

Crafty.e("2D, Canvas, Color, Mouse").attr({
  x: 40 + Math.random() * (stageWidth - 80),
  y: 40 + Math.random() * (stageHeight - 80),
  z: 9,
  w: 40,
  h: 40
}).bind("Click", function() {
  var player;

  player = Crafty("Player");
  return player.setColor("yellow");
}).color("yellow");

Crafty.e("2D, Canvas, right, Mouse").attr({
  x: 68 + Math.random() * (stageWidth - 68 * 2),
  y: 76 + Math.random() * (stageHeight - 76 * 2),
  z: 9,
  w: 68,
  h: 76,
  velocityX: 1,
  velocityY: 1
}).bind("EnterFrame", function() {
  if (this._x + this.velocityX > stageWidth - this._w || this._x + this.velocityX < this._w) {
    this.velocityX *= -1;
  }
  if (this._y + this.velocityY > stageHeight - this._h || this._y + this.velocityY < this._h) {
    this.velocityY *= -1;
  }
  this.x += this.velocityX;
  return this.y += this.velocityY;
}).bind("Click", function() {
  var player;

  player = Crafty("Player");
  return player.setColor("yellow");
});
