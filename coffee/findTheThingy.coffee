Crafty.background "#2b8aad"
stageWidth = Crafty.stage.elem.offsetWidth
stageHeight = Crafty.stage.elem.offsetHeight

characters =
    osaka: 0
    chiyochan: 1
    sakaki: 2
    tomo: 3
    yomi: 4
    kagura: 5
sprites = {}
for own key, value of characters
    y = value * (76 + 64)
    sprites["#{key}Up"]= [0, y, 64, 76]
    sprites["#{key}UpRight"]= [64*2, y, 64, 76]
    sprites["#{key}Right"]= [64*5, y, 64, 76]
    sprites["#{key}DownRight"]= [64*7, y, 64, 76]
    sprites["#{key}Down"]= [64*10, y, 64, 76]
    sprites["#{key}DownLeft"]= [64*12, y, 64, 76]
    sprites["#{key}Left"]= [64*15, y, 64, 76]
    sprites["#{key}UpLeft"]= [64*18, y, 64, 76]

Crafty.sprite(1, "imgs/azumanga_alpha.png", sprites)

characterToFind = ""
Crafty.scene "instructions", =>
    r = Math.random() * 6 >> 0
    characterToFind = key for own key, value of characters when value is r

    Crafty.e("2D, DOM, Text")
        .attr(
            x: 0
            y: stageHeight*0.5 - 120
            w: stageWidth - 50
        )
        .textFont
            family: 'Verdana'
            size: "40px"
        .css
            "text-align": "center"
        .text("Find #{characterToFind}!")

    Crafty.e("2D, Canvas, #{characterToFind}Down, Mouse")
        .attr(
            x: stageWidth * .5 - 64 * 1.3
            y: stageHeight * .5 - 100
            w: 64 * 2
            h: 76 * 2
        )
        .bind "Click", ->
            Crafty.scene "game"
        
Crafty.scene "game", =>
    for own key, value of characters
        Crafty.e("2D, Canvas, #{key}, Mouse")
            .attr(
                x: Math.random() * (stageWidth-64)
                y: Math.random() * (stageHeight-76)
                z: 9
                w: 64
                h: 76
                velocityX: if(Math.random() * 2 -1) < 0 then -1 else 1
                velocityY: if(Math.random() * 2 -1) < 0 then -1 else 1
                ref: new Crafty.math.Vector2D 0, 1
                direction: "#{key}Right"
                character: key
            )
            .bind "EnterFrame", ->
                @velocityX *= -1 if @_x + @velocityX > stageWidth - @_w or @_x + @velocityX < 0
                @velocityY *= -1 if @_y + @velocityY > stageHeight - @_h or @_y + @velocityY < 0
                @x += @velocityX
                @y += @velocityY
                angle = @ref.angleBetween new Crafty.math.Vector2D @velocityX, @velocityY
                angle *= 180/Math.PI
                @removeComponent @direction
                @direction = switch
                    when angle is 0 then "#{@character}Up"
                    when -90 < angle < 0 then "#{@character}DownRight"
                    when angle is -90 then "#{@character}Right"
                    when -180 < angle < -90 then "#{@character}UpRight"
                    when Math.abs(angle) is 180 then "#{@character}Down"
                    when 0 < angle < 90 then "#{@character}DownLeft"
                    when angle is 90 then "#{@character}Left"
                    when 90 < angle < 180 then "#{@character}UpLeft"
                @addComponent @direction
            .bind "Click", ->
                Crafty.scene "congrats" if @has characterToFind
            
Crafty.scene "congrats", =>
    Crafty.e("2D, DOM, Text")
        .attr(
            x: 0
            y: stageHeight*0.5 - 120
            w: stageWidth - 50
        )
        .textFont
            family: 'Verdana'
            size: "40px"
        .css
            "text-align": "center"
        .text("Yeah! You've found #{characterToFind}!")

    Crafty.e("2D, Canvas, #{characterToFind}Down, Mouse")
        .attr(
            x: stageWidth * .5 - 64 * 1.3
            y: stageHeight * .5 - 100
            w: 64 * 2
            h: 76 * 2
        )
        .bind "Click", ->
            Crafty.scene "instructions"

Crafty.scene "instructions"
