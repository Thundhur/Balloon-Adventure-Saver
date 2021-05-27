var balloon,balloonImage1,balloonImage2;
var database,DBalloonPosition,DBGPosition;
var backgroundlol;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database = firebase.database();
  createCanvas(1360,760);
  backgroundlol = createSprite(1174,-72,2500,1667);
  balloon=createSprite(680,380,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.scale=0.5;
  DBalloonPosition = database.ref("balloon/Position1");
  DBalloonPosition.on("value",readPositionBalloon);
  DBGPosition = database.ref("background/Position");
  DBGPosition.on("value",readPositionBG);
  textSize(20); 
}

// function to display UI
function draw() {
  background(0);
  backgroundlol.addImage(bg);

  if(keyCode === 37){
    //write code to move background in left direction
    backgroundlol.x = backgroundlol.x + 2;
    changePositionBG(2,0);
  }
  else if(keyCode === 39){
    //write code to move background in right direction
    backgroundlol.x = backgroundlol.x - 2;
    changePositionBG(-2,0);
  }
  else if(keyCode === 38){
    //write code to move background in up direction
    backgroundlol.y = backgroundlol.y + 2;
    changePositionBG(0,2);
  }
  else if(keyCode === 40){
    //write code to move background in down direction
    backgroundlol.y = backgroundlol.y - 2;
    changePositionBG(0,-2);
  }



  if(keyCode === 65){
    //write code to move air balloon in left direction
    balloon.x = balloon.x - 2;
    changePositionBalloon(-2,0);
  }
  else if(keyCode === 68){
    //write code to move air balloon in right direction
    balloon.x = balloon.x + 2;
    changePositionBalloon(2,0);
  }
  else if(keyCode === 87){
    //write code to move air balloon in up direction
    balloon.y = balloon.y - 2;
    changePositionBalloon(0,-2);
  }
  else if(keyCode === 83){
    //write code to move air balloon in down direction
    balloon.y = balloon.y + 2;
    changePositionBalloon(0,2);
  }


  if(backgroundlol.x > 1250){
    backgroundlol.x = 1250;
  }
  if(backgroundlol.x < 112){
    backgroundlol.x = 112;
  }
  if(backgroundlol.y > 824){
    backgroundlol.y = 824;
  }
  if(backgroundlol.y < -72){
    backgroundlol.y = -72;
  }



  if(balloon.x > 1285){
    balloon.x = 1285;
  }
  if(balloon.x < 75){
    balloon.x = 75;
  }
  if(balloon.y > 625){
    balloon.y = 625;
  }
  if(balloon.y < 135){
    balloon.y = 135;
  }


  
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  if(frameCount<500){
  text("**Use ARROW keys and WASD keys to move the Hot Air Balloon! Works Best in Full Screen! Enjoy!",40,40);
  }
  if(frameCount%50 === 0){
  console.log(backgroundlol.x + "x");
  console.log(backgroundlol.y + "y");
  }
}

function changePositionBG(x,y){
  database.ref("background/Position").set({
      "x": Position.x + x,
      "y": Position.y + y,
  });
  }
  function readPositionBG(data){
      Position = data.val();
      backgroundlol.x = Position.x;
      backgroundlol.y = Position.y;
  }

  function changePositionBalloon(x,y){
    database.ref("balloon/Position1").set({
        "x": Position1.x + x,
        "y": Position1.y + y,
    });
    }
    function readPositionBalloon(data){
        Position1 = data.val();
        balloon.x = Position1.x;
        balloon.y = Position1.y;
    }
