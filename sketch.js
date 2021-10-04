var scaryBg
var player
var wolfChase
var gameState = "play"
var birdsFlying
var obstacle
var wood
var gameState = "end"
var resetThing
var score = 0;

function preload() {
    scaryBg = loadImage("ScaryBg.png");
    birdsFlying = loadAnimation("birds.png", "birds2.png");
    wolfChase = loadAnimation("wolf1.png", "wolf2.png", "wolf3.png", "wolf4.png", "wolf5.png", "wolf6.png", "wolf7.png", "wolf8.png", "wolf9.png", "wolf10.png", "wolf11.png",);
    obstacle = loadImage("Log.png");
    runnerperson = loadAnimation("running1.png", "running2.png", "running3.png", "running4.png", "running5.png", "running6.png", "running7.png", "running8.png");
    resetThing = loadImage("resetThing.png");
    GAMEOVEr = loadImage("GAMEOVER.png");
}

function setup() {
    createCanvas(600, 600);
    gameState = "play"
    bg = createSprite(300, 300);
    bg.addImage("ScaryBg.png", scaryBg)

    gameOverReset = createSprite(300, 300);
    gameOverReset.addImage("resetThing.png", resetThing);
    gameOverReset.scale = 0.2


    ground = createSprite(300, 600, 600, 80)

    wolf = createSprite(90, 510);
    wolf.addAnimation("wolf1.png", "wolf2.png", "wolf3.png", "wolf4.png", "wolf5.png", "wolf6.png", "wolf7.png", "wolf8.png", "wolf9.png", "wolf10.png", "wolf11.png", wolfChase);
    wolf.scale = 0.1;

    player = createSprite(210, 500);
    player.addAnimation("running1.png", "running2.png", "running3.png", "running4.png", "running5.png", "running6.png", "running7.png", "running8.png", runnerperson)
    player.scale = 0.1
    player.debug = true;
    player.setCollider("circle", 0, 0, 400)

    birdsFly = createSprite(300, 300);
    birdsFly.addAnimation("birds", birdsFlying);
    //birdsFly.debug = true;
    birdsFly.depth = bg.depth + 4
    birdsFly.scale = 5

    gameEnd = createSprite(300, 300);
    gameEnd.addImage("GAMEOVER.png", GAMEOVEr);
    gameEnd.scale = 0.5;
    gameEnd.visible = false;

    obstacleGroup = createGroup();

}

function draw() {
    textSize(20);
    fill("black");
    text("Score:" + score, 500, 580)

    birdsFly.depth = bg.depth - 2

    bg.velocityX = -6;

    //gameOverReset.debug = true;
    //gameOverReset.depth = bg.depth+3

    if (bg.x < 0) {
        bg.x = bg.width / 2;
    }


    if (gameState === "play") {
        if (keyDown("space")) {
            player.velocityY = -8;
        }
        score = score + Math.round(getFrameRate() / 60);
        player.velocityY = player.velocityY + 1

        if (obstacleGroup.isTouching(player)) {
            gameState = "end";
        }
        gameOverReset.visible = false;
        gameEnd.visible = false;
    }

    if (gameState === "end") {
        player.velocityY = 0;
        bg.velocityX = 0;
        obstacleGroup.setVelocityEach(0);
       // gameOverReset.visible = true;
        gameEnd.visible = true;
        player.visible = false;
        wolf.visible = false;
        score.visible = true;
       // obstacleGroup.destroyEach();
       // obstacleGroup.visible = false;

        //if(){
        //     reset();
        //  }
    }

    player.collide(ground);


    spawnObstacles();
    drawSprites();
}

function spawnObstacles() {
    if (frameCount % 70 === 0) {
        var wood = createSprite(600, 530)
        wood.velocityX = -(7 + 3 * score / 100);
        wood.addImage("Log.png", obstacle)
        wood.depth = bg.depth + 2
        wood.scale = 0.04
        //wood.debug = true;
        wood.lifetime = 500;
        wood.setCollider("circle", 0, 5, 400)
        obstacleGroup.add(wood)
    }
}

//function reset(){
 //   gameState = play;
  //  gameOverReset.visible = false;
   // score = 0;
//
   // obstacleGroup.destroyEach();
//}