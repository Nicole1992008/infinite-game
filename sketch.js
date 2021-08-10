var gameState = "play";

var bird , birdImg;
var bg , bgImg;
var poles , polesImg;
var gameOver, gameOverImg


function preload(){

    birdImg= loadImage("bird.png");
    bgImg=loadImage("background.jpg");
    polesImg=loadImage("poles.png");
    gameOverImg= loadImage("gameOver.png");


}

function setup() {

    createCanvas(600,600);

    bird = createSprite(200,200,50,50);
    bird.addImage(birdImg);
    bird.scale = 0.5;

    //bg = createSprite(600,600);
    //bg.addImage(bgImg);

    polesGroup = new Group();

    bird.setCollider("circle",0,0,40);
    bird.debug = true

    gameOver = createSprite(300,100);  
    
    gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;


}

function draw() {

    background(bg);



  if(gameState === "play"){

        bg.velocityX = -5;

        gameOver.visible = false;

        if (bg.x < 0){
            bg.x = bg.width/2;
    }

    if(keyDown("space")&& bird.y >=100){
        bird.velocityY = -13;

    }

    if(keyDown("right")){
        bird.x = bird.x + 4;
    }

    


    bird.velocityY = bird.velocityY + 0.8

    spawnPoles();

    if(polesGroup.isTouching(bird)){
        bird.destroy();
        gameState = "end";
    }
}

else if(gameState === "end"){

    bg.velocityX =  0;

    gameOver.visible = true;

    polesGroup.setVelocityXEach(0);
polesGroup.setLifeTimeEach(-1);

}

drawSprites();
}

function spawnPoles(){

    if (frameCount % 75 === 0){
        var poles = createSprite(400,165,10,40);
        poles.velocityX = -6;

        var rand = Math.round(random(150,300));

       poles.addImage(polesImg);

       poles.scale = 0.5;
       poles.lifetime = 300;

    polesGroup.add(poles);
   }
}