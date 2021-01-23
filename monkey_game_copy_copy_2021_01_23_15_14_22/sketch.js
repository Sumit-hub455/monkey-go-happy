var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0
var PLAY = 1
var end = 0
var gameState = PLAY
var gameOver , gameover;
var restart , gamerestart ;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  gameover = loadImage("game over.png"); 
  gamerestart = loadImage("restart.png")

}



function setup() {

  createCanvas(600, 400);

  monkey = createSprite(100, 375, 20, 20)
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.10;
  
  ground = createSprite(100, 400, 1200, 20);
  ground.x = ground.width / 2;
  ground.velocityX = -6;

  inground = createSprite(100, 375, 1200, 20);
  inground.visible=false
    monkey.setCollider("circle",0,0,30);
  
  gameOver = createSprite(300,200,20,20)
  gameOver.addImage("gameOver", gameover);
  gameOver.scale = 0.5;
  
  restart = createSprite(300,240,20,20)
  restart .addImage("restart",gamerestart);
  restart.scale = 0.5
  

  obstacleGroup = createGroup();
  foodGroup = createGroup();


}


function draw() {
  background("green");

text(score , 500,50 )

  if (gameState === PLAY) {

     gameOver.visible = false;
     restart.visible = false;
    
    console.log(monkey.y)
    
    

    if (keyDown("space")) {
      monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY +0.8
    
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    
    food();
    obstacle();
    
    if(monkey.isTouching(foodGroup)){
      score = score + 1;
      foodGroup.destroyEach(); 
      
    }
    
     if ( monkey.isTouching(obstacleGroup)){  
        gameState = end;
        
      }
    
  }
  else if(gameState===end)
    {
      gameOver.visible = true;
      restart.visible = true;
      monkey.velocityX=0;
      ground.velocityX=0;
      obstacleGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0);
      obstacleGroup.destroyEach(0);
      foodGroup.destroyEach(0);
      score = 0 ; 
     
    }



  
  
  monkey.collide(inground)
  
  
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();

}


function reset(){
  gameState= PLAY ; 
  gameOver.visible= false;
  restart.visible= false;
  score = 0 ;
    
}

function food() {
  if (frameCount % 60 === 0) {
    var food = createSprite(200, 180, 20, 20)
    food.addImage(bananaImage)
    food.scale = 0.10
    food.velocityX = -3
    food.y = Math.round(random(80, 200));
    food.lifetime = 100;
    food.depth = monkey.depth
    monkey.depth = monkey.depth + 1
    foodGroup.add(food)
  }
}


function obstacle() {
  if (frameCount % 80 === 0) {
    var obstacle = createSprite(300, 380, 10, 10)
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.15
    obstacle.velocityX = -5
    obstacle.lifetime = 300
    obstacleGroup.add(obstacle)

    obstacle.depth = monkey.depth;
    monkey.depth += 1;
  }


}