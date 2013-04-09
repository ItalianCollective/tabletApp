stageWidth = Crafty.stage.elem.offsetWidth
stageHeight = Crafty.stage.elem.offsetHeight
Crafty.sprite(1, "imgs/azumanga.png",
        up: [0, 0, 68, 76]
        right: [76*5, 0, 68, 76]
        down: [76*11, 0, 68, 76]
        left: [76*17, 0, 68, 76]
)
Crafty.e("2D, Canvas, Color, Mouse")
    .attr(
        x: 40 + Math.random() * (stageWidth-80)
        y: 40 + Math.random() * (stageHeight-80)
        z: 9
        w: 40
        h: 40
    )
    .bind "Click", ->
        player = Crafty("Player")
        player.setColor "yellow"
    .color("yellow")

Crafty.e("2D, Canvas, right, Mouse")
    .attr(
        x: 68 + Math.random() * (stageWidth-68*2)
        y: 76 + Math.random() * (stageHeight-76*2)
        z: 9
        w: 68
        h: 76
        velocityX: 1
        velocityY: 1
    )
    .bind "EnterFrame", ->
        @velocityX *= -1 if @_x + @velocityX > stageWidth - @_w or @_x + @velocityX < @_w
        @velocityY *= -1 if @_y + @velocityY > stageHeight - @_h or @_y + @velocityY < @_h
        @x += @velocityX
        @y += @velocityY
    .bind "Click", ->
        player = Crafty("Player")
        player.setColor "yellow"
