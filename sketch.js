//variable declarations
var bg,bgImg;
var player, shooterImage, shooter_shooting;
var zombie, zombieImage;
var zombieGroup;
var heart1,heart2,heart3;
var heart1Img,heart2Img,heart3Img;
var bullets=70;
var score = 0;
var life = 3;
var lose, winning, explosionSound;
var gamestate="fight";

//loading the images
function preload(){
shooterImage = loadImage("assets/shooter_2.png");
shooter_shooting = loadImage("assets/shooter_3.png");
bgImg = loadImage("assets/bg.jpeg");
zombieImage = loadImage("assets/zombie.png");
heart1Img = loadImage("assets/heart_1.png");
heart2Img = loadImage("assets/heart_2.png");
heart3Img = loadImage("assets/heart_3.png");
//loading the sounds
lose = loadSound("assets/lose.mp3");
winning - loadSound("assets/win.mp3");
explosionSound = loadSound("assets/explosion.mp3");
}

function setup(){
//creating canvas, whilst adujusting windowWidth and windowHeight
createCanvas(windowWidth,windowHeight);

//npc(non player character), background, loading the background image
bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
bg.addImage(bgImg);
bg.scale = 1.1;

//pc(playing character), setting the hitbox, size,image and setting debug as true
player = createSprite(displayWidth-1150,displayHeight-300,50,50);
player.addImage(shooterImage);
player.scale = 0.3;
player.debug = true;
player.setCollider("rectangle", 0,0,300,300);

//represents 1st heart
heart1 = createSprite(displayWidth-150,40,20,20);
heart1.visible = false;
heart1.addImage("heart1", heart1Img);
heart1.scale = 0.4;

//represents 2nd heart
heart2 = createSprite(displayWidth-100,40,20,20);
heart2.visible = false;
heart2.addImage("heart2", heart2Img);
heart2.scale = 0.4;

//represents 3rd heart;
heart3 = createSprite(displayWidth-150,40,20,20);
heart3.addImage("heart3", heart3Img);
heart3.scale = 0.4;

//created new Zombie group;
zombieGroup = new Group();
bulletGroup = new Group();
}

function draw(){
//setting background as 0
background(0);

//stating the gamestate
if(gamestate==="fight"){

  //displaying the appropriate image based on the lives left 
  if(life===3){
    heart3.visible =true;
    heart1.visible = false;
    heart2.visible = false;
  }

  if(life===2){
    heart3.visible = false;
    heart2.visible = true;
    heart1.visible = false;
  }
  if(life===1){
    heart3.visible = false;
    heart2.visible = false;
    heart1.visible = true;
  }
  //stating that when all 3 lives are lost, the player loses
  if(life===0){
    gamestate = "lost";
  }

  //game will finish when the score reaches 100
  if(score===500){
    gametstate = "won";
    winning.play();
  }

//setting the key functions to move the player (up and down arrow)
if(keyDown("UP_ARROW") || touches.lenght>0){
  player.y = player.y-30;
}

if(keyDown("DOWN_ARROW") || touches.lenght>0){
  player.y = player.y+30;
}

//setting it so that when "space" is held down, the gun will aim. Also add image of gun being aimed
if(keyWentDown("space")){ 
  bullet = createSprite(displayWidth-1150,player.y-30,20,10);
  bullet.velocityX = 20;
  bulletGroup.add(bullet);
  player.depth = bullet.depth;
  player.depth = player.depth+2;
  player.addImage(shooter_shooting);
  bullets = bullets-1;
  explosionSound.play();
}
//when the player presses space, the animation comes of the player aiming the gun
else if(keyWentUp("space")){
  player.addImage(shooterImage);
}
//makes it so that when the player reaches 0 bullets then they lose with the losing sound.
if(bullets==0){
  gamestate="bullet";
  lose.play();
}
//makes it so that when the bullet touches the zombie, 
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy();
      bulletGroup.destroyEach();
  //the zombie destroys and explosion sound plays, also the score increases by 20 each time.
      explosionSound.play();
      score = score+20;
    }
  }

}

//when the zombies touch the player, 1 life gets lost and the losing sound plays
if(zombieGroup.isTouching(player)){
  lose.play();
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
      life = life-1;
    }
  }

}
//calling the enemy function
enemy();
}
//letting the images be shown
drawSprites(); 

//when all 3 lives are lost, the text You Lost, shows up and the zombie and player gets destroyed
if(gamestate=="lost"){
  textSize(100);
  fill("red");
  text("YOU LOST",400,400);
  zombieGroup.destroyEach();
  player.destroy();
}

//when the player wins and reaches a score of 500, You Won shows up and the zombie and player gets destroyed
if(gamestate=="won"){
  textSize(100);
  fill("yellow");
  text("YOU WON!",400,400);
  zombieGroup.destroyEach();
  player.destroy();
}

//if the player runs out of bullets, the text You ran out of bullets shows up and you lose
if(gamestate=="bullet"){
  textSize(50);
  fill("yellow");
  text("YOU RAN OUT OF BULLETS :(",400,400);
  zombieGroup.destroyEach();
  player.destroy();
}
}

//creating and placing zombies in random postions, also set the speed, size and lifetime of zombie
function enemy(){
  //putting zombies in random positions and added framecount
  if(frameCount%50===0){
    zombie = createSprite(random(500,1100),random(100,500),40,40);
    zombie.addImage(zombieImage);

    //size of zombie 
    zombie.scale = 0.15;

    //speed of zombie
    zombie.velocityX = -3;

    //creating hitbox around the zombies
    zombie.debug = false;
    zombie.setCollider("rectangle",0,0,400,650);

    //lifetime defines the scope of the variable(zombies)
    zombie.lifetime = 400;
    zombieGroup.add(zombie);
  }
}



