var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,monkey_collide;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var invisibleground,invisible;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collide= loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup()
{
 createCanvas(540,520);
  //groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  
  ground  = createSprite(290,50,600,900);
  ground.shapeColor = "white";
  ground.x = ground.width /2;
  
 monkey  = createSprite(50,450,50,100);
 monkey.addAnimation("running",monkey_running);
 monkey.addAnimation("collide",monkey_collide); 
 monkey.scale = 0.15; 
  
 
  
 invisibleground = createSprite(290,500,50,100);
 invisibleground.visible = false; 
  
 invisible = createSprite(290,500,600,100);
   
  score = 0;
} 
 

function draw() {
  background("white");  
    
  //to be on land(ground)
  monkey .collide(invisible); 

  if(gameState === PLAY)//PLAY
  {
    
    score = score + Math.round(getFrameRate()/60);
    
    //destroybananas
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    }
      if (ground.x < 0)
  {
      ground.x = ground.width/2;
  }

  if (invisible.x < 0)
  {
      invisible.x = invisible.width/2;
  }
    //for jumping
  if(keyDown("space")&& monkey.y >= 100)
  {
  monkey.velocityY = -12;
  }
  
     //add gravity
  monkey.velocityY = monkey.velocityY + 0.8; 
  spawobstacle();
  spawfruit();
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
    
  }else if (gameState === END)
  {
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.destroyEach(); 
         monkey.changeAnimation("collide",monkey_collide);
    
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  
 
   
  drawSprites();
  
  
  //displaying score
  text("Score: "+ score, 50,50); 
  
  
}
function spawfruit() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -3;
    banana.lifeTime = 200;
    FoodGroup.add(banana);
}}


function spawobstacle() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,425,40,10);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -3;
    obstacle.lifeTime = 200;
    obstacleGroup.add(obstacle);
}}


