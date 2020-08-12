var bananaImage;
var obstacle_img;
var obstacleGroup;
var backgr;
var player;
var foodGroup;
var score = 0;
var ground,ground_img;
var backImage;
var player_running;
var GameOver;

function preload(){
 backImage = loadImage("jungle2.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png");
}

function setup() {
  createCanvas(800, 400);
  
  backgr = createSprite(0,0,800,400);
  backgr.addImage(backImage);
   backgr.velocityX = -3;
   backgr.scale = 1.5;
   backgr.x =  backgr.width/2;
  
  player = createSprite(100,350,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  foodGroup= new Group();
  obstacleGroup= new Group(); 
  
  score = 0;
}



function draw() {
  background(220);
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
   if(backgr.x<0){
    backgr.x = backgr.width/2;
  }
  
  if(foodGroup.isTouching(player)){
     score = score+2;
    foodGroup.destroyEach();
  }
    switch(score){
      case 10:player.scale = 0.12;
        break;
       case 20:player.scale = 0.14;
        break;
        case 30:player.scale = 0.16;
        break;
        case 40:player.scale = 0.18;
        break;
        default:break;
     }
  
  if(keyDown("space")){
  player.velocityY = -15;
}
    
    if(obstacleGroup.isTouching(player)){
     player.scale = 0.12;
      score = score - 2;
    }
  
player.velocityY = player.velocityY +0.8;
    player.collide(ground);
  
  spawnfood();
  spawnobstacles();
  
  drawSprites();
    
     
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+score,100,50);
}

function spawnfood(){
  
 if(World.frameCount%80===0){
 
 var banana = createSprite(600,250,20,20);
 banana.addImage(bananaImage);
 banana.scale = 0.5;
 banana.y = random(120,200);
 banana.velocityX = -5;
 banana.lifetime = 300;
banana.scale=0.1;
   
 player.depth = banana.depth+1;
 
 foodGroup.add(banana);
 
 }
}
function spawnobstacles(){
  
  if(World.frameCount%300===0){
  var obstacle = createSprite(800,350,20,20);
  obstacle.addImage(obstacle_img);
 obstacle.scale = 0.2;

obstacle.velocityX = -5;
obstacle.lifetime = 300;
obstacleGroup.add(obstacle);
  }
}