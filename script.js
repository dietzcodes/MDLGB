//variable defining
let ball;
let paddle;
let brick;
let newBrick;
let brickInfo;
let scoreText;
let score = 0;
let bricksAlive = 21;

//creates the game window
let game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
    preload,
    create,
    update,

});

//loading
function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = "#ffe300";
    game.load.image("ball", "img/monkeball.jpg");
    game.load.image("paddle", "img/bana.jpg");
    game.load.image("brick", "img/badbana_15.jpg");
}

//creating objects on screen and setting their properties
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    ball = game.add.sprite(game.stage.width * 0.5, game.stage.height - 25, "ball");
    ball.anchor.set(0.5);
    paddle = game.add.sprite(game.stage.width * 0.5, game.stage.height - 5, "paddle");
    paddle.anchor.set(0.5, 1);
    game.physics.enable(paddle, Phaser.Physics.ARCADE);
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    ball.body.velocity.set(150, -150);
    paddle.body.immovable = true;
    game.physics.arcade.checkCollision.down = false;
    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(() => {
        alert("Game Over");
        location.reload();
    }, this);
    function initBricks() {
        brickInfo = {
            width: 50,
            height: 20,
            count: {
                row: 3,
                col: 7,},
            offset: {
                top: 50,
                left: 60,},
            padding: 10,};
        brick = game.add.group();
        for (let c = 0; c < brickInfo.count.col; c++) {
            for (let r = 0; r < brickInfo.count.row; r++) {
                //x value definition for the brick
                const brickX = c * (brickInfo.width + brickInfo.padding) + brickInfo.offset.left;
                //y value definition for the brick
                const brickY = r * (brickInfo.height + brickInfo.padding) + brickInfo.offset.top;
                newBrick = game.add.sprite(brickX, brickY, "brick");
                game.physics.enable(newBrick, Phaser.Physics.ARCADE);
                newBrick.body.immovable = true;
                newBrick.anchor.set(0.5);
                brick.add(newBrick);
            }
        }
    }
    initBricks();
    scoreText = game.add.text(5, 5, "Points: 0", {
        font: "18px Arial",
        fill: "#0095DD",
    });
}

//game loop
function update() {
    game.physics.arcade.collide(ball, paddle);
    game.physics.arcade.collide(ball, brick, ballHitBrick);
    paddle.x = game.input.x || game.stage.width * 0.5;
}

//brick collision
function ballHitBrick(ball, brick) {
    brick.kill();
    score += 10;
    scoreText.setText(`Points: ${score}`);
    bricksAlive --;
    if (bricksAlive == 0) {
        alert("You win!")
    }
}

function endGame() {
    score += 10;
}


