var PLAY = 1;
var END = 0;
var gamestate = PLAY;

var bike;
var road;
var rock;
var sky;
var gameOver;

score = []
gameState= []

function preload(){
    backgroundImg = loadImage("sky.jpg")
    bike = loadImage("bike.jpg")
    roadImage = loadImage("road.jpg")
    rock = loadImage("rock.png")
    gameOverImg = loadImage("Game Over.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    bike = createSprite(50,height-70,20,50);
    bike.setCollider("circle",0,0,350)
    bike.scale = 0.8;

    road = createSprite(width/2,height,width,2);
    road.addImage("road",roadImage)
    road.x = width/2
    road.velocityX = -(6 + 3*score/100);

    gameOver = createSprite(width/2,height/2- 50);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5
    gameOver.visable = false;

    score = 0;
}

function draw() {
    background = (sky);
    textSize(20);
    fill("black");
    text("Score: " + score,30,50);
    
    if (gameState===PLAY){ 
        score = score + Math.round(getFrameRate()/60); 
        road.velocityX = -(6 + 3*score/100); 
    }
    if((touches.length > 0 || keyDown("SPACE")) && bike.y  >= height-120) { 
        bike.velocityY = -10; 
        touches = []; 
 
}

bike.velocityY = bike.velocityY + 0.8 

if (road.x < 0){ 
    road.x = road.width/2; 

  }

  if(rock.isTouching(bike)){
      gameState = END
  }

else if (gameState === END) { 
    gameOver.visible = true; 
    road.velocityX = 0; 
    bike.velocityY = 0; 
    rock.setVelocityXEach(0); 
    rock.setLifetimeEach(-1);

    if(touches.length>0 || keyDown("SPACE") || mousePressedOver(restart)) {       

        reset(); 
  
        touches = [] 
    }
}

drawSprites();
}

  
  function spawnObstacles() { 
  
    if(frameCount % 60 === 0) { 
      var rock = createSprite(600,height-95,20,30); 
      rock.setCollider('circle',0,0,45) 
      rock.velocityX = -(6 + 3*score/100); 
      var rand = Math.round(random(1,2)); 
  
      switch(rand) { 
        case 1: rock.addImage(rock); 
                break; 
        case 2: rock.addImage(rock); 
                break; 
        default: break; 
  
      }        
  
      rock.scale = 0.3; 
      rock.lifetime = 300; 
      rock.depth = bike.depth; 
      bike.depth +=1; 
  
      rock.add(rock); 
  
    }
  
  }
   
  function reset(){ 
    gameState = PLAY; 
    gameOver.visible = false; 

    rock.destroyEach();

    score = 0; 
  } 
  
   
   
  
   