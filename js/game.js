var characterToFind, characters, key, sprites, stageHeight, stageWidth, value, y,
  __hasProp = {}.hasOwnProperty,
  _this = this;

Crafty.background("#2b8aad");

stageWidth = Crafty.stage.elem.offsetWidth;

stageHeight = Crafty.stage.elem.offsetHeight;

characters = {
  osaka: 0,
  chiyochan: 1,
  sakaki: 2,
  tomo: 3,
  yomi: 4,
  kagura: 5
};

sprites = {};

for (key in characters) {
  if (!__hasProp.call(characters, key)) continue;
  value = characters[key];
  y = value * (76 + 64);
  sprites["" + key + "Up"] = [0, y, 64, 76];
  sprites["" + key + "UpRight"] = [64 * 2, y, 64, 76];
  sprites["" + key + "Right"] = [64 * 5, y, 64, 76];
  sprites["" + key + "DownRight"] = [64 * 7, y, 64, 76];
  sprites["" + key + "Down"] = [64 * 10, y, 64, 76];
  sprites["" + key + "DownLeft"] = [64 * 12, y, 64, 76];
  sprites["" + key + "Left"] = [64 * 15, y, 64, 76];
  sprites["" + key + "UpLeft"] = [64 * 18, y, 64, 76];
}

Crafty.sprite(1, "imgs/azumanga_alpha.png", sprites);

characterToFind = "";

Crafty.scene("instructions", function() {
  var r;

  r = Math.random() * 6 >> 0;
  for (key in characters) {
    if (!__hasProp.call(characters, key)) continue;
    value = characters[key];
    if (value === r) {
      characterToFind = key;
    }
  }
  Crafty.e("2D, DOM, Text").attr({
    x: 0,
    y: stageHeight * 0.5 - 120,
    w: stageWidth - 50
  }).textFont({
    family: 'Verdana',
    size: "40px"
  }).css({
    "text-align": "center"
  }).text("Find " + characterToFind + "!");
  return Crafty.e("2D, Canvas, " + characterToFind + "Down, Mouse").attr({
    x: stageWidth * .5 - 64 * 1.3,
    y: stageHeight * .5 - 100,
    w: 64 * 2,
    h: 76 * 2
  }).bind("Click", function() {
    return Crafty.scene("game");
  });
});

Crafty.scene("game", function() {
  var _results;

  _results = [];
  for (key in characters) {
    if (!__hasProp.call(characters, key)) continue;
    value = characters[key];
    _results.push(Crafty.e("2D, Canvas, " + key + ", Mouse").attr({
      x: Math.random() * (stageWidth - 64),
      y: Math.random() * (stageHeight - 76),
      z: 9,
      w: 64,
      h: 76,
      velocityX: (Math.random() * 2 - 1) < 0 ? -1 : 1,
      velocityY: (Math.random() * 2 - 1) < 0 ? -1 : 1,
      ref: new Crafty.math.Vector2D(0, 1),
      direction: "" + key + "Right",
      character: key
    }).bind("EnterFrame", function() {
      var angle;

      if (this._x + this.velocityX > stageWidth - this._w || this._x + this.velocityX < 0) {
        this.velocityX *= -1;
      }
      if (this._y + this.velocityY > stageHeight - this._h || this._y + this.velocityY < 0) {
        this.velocityY *= -1;
      }
      this.x += this.velocityX;
      this.y += this.velocityY;
      angle = this.ref.angleBetween(new Crafty.math.Vector2D(this.velocityX, this.velocityY));
      angle *= 180 / Math.PI;
      this.removeComponent(this.direction);
      this.direction = (function() {
        switch (false) {
          case angle !== 0:
            return "" + this.character + "Up";
          case !((-90 < angle && angle < 0)):
            return "" + this.character + "DownRight";
          case angle !== -90:
            return "" + this.character + "Right";
          case !((-180 < angle && angle < -90)):
            return "" + this.character + "UpRight";
          case Math.abs(angle) !== 180:
            return "" + this.character + "Down";
          case !((0 < angle && angle < 90)):
            return "" + this.character + "DownLeft";
          case angle !== 90:
            return "" + this.character + "Left";
          case !((90 < angle && angle < 180)):
            return "" + this.character + "UpLeft";
        }
      }).call(this);
      return this.addComponent(this.direction);
    }).bind("Click", function() {
      if (this.has(characterToFind)) {
        return Crafty.scene("congrats");
      }
    }));
  }
  return _results;
});

Crafty.scene("congrats", function() {
  Crafty.e("2D, DOM, Text").attr({
    x: 0,
    y: stageHeight * 0.5 - 120,
    w: stageWidth - 50
  }).textFont({
    family: 'Verdana',
    size: "40px"
  }).css({
    "text-align": "center"
  }).text("Yeah! You've found " + characterToFind + "!");
  return Crafty.e("2D, Canvas, " + characterToFind + "Down, Mouse").attr({
    x: stageWidth * .5 - 64 * 1.3,
    y: stageHeight * .5 - 100,
    w: 64 * 2,
    h: 76 * 2
  }).bind("Click", function() {
    return Crafty.scene("instructions");
  });
});

Crafty.scene("instructions");
