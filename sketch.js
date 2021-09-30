const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var ball;
var ground;
var lWall , rWall;
var obs , obsImg ;
var ballSprite,ballImage;


var myEngine , myWorld;

function preload()
{
	obsImg = loadImage("obstacle.png");
	ballImage = loadImage("ball.png");
}

function setup() {
	createCanvas(1000, 700);
	angleMode(DEGREES);
	
	myEngine = Engine.create();
	myWorld = myEngine.world;

	obs = createSprite(500,350);
	obs.addImage(obsImg);
	obs.scale = 0.3;

	ballSprite=createSprite(100,200,10,10);
	ballSprite.addImage(ballImage);
	ballSprite.scale= 0.08
	
	

	var options = {
		isStatic : false,
		restitution:0.3
	};
	
	var gOption = {
		isStatic : true,
		restitution : 1.2,
		friction : 0,
		density : 1.2
	};

	var ist_Option = {
		isStatic : true
	};
	
	

      ball = Bodies.circle(100,200,15,options);  
	  World.add(myWorld , ball);


	  ground = Bodies.rectangle(400,700,2000,33,gOption);
	  World.add(myWorld , ground);

	  lWall = Bodies.rectangle(600,657,17,53,ist_Option);
	  World.add(myWorld , lWall);

	  rWall = Bodies.rectangle(800,657,17,53,ist_Option);
	  World.add(myWorld , rWall);


	  ellipseMode(CENTER);

  
}


function draw() {
  rectMode(CENTER);
  background("lightblue");

  Engine.update(myEngine);

  obs.rotation = obs.rotation+2;

  ballSprite.x= ball.position.x;
  ballSprite.y= ball.position.y; 

   ballSprite.bounceOff(obs);
  
  
 var bpx = ball.position;
 ellipse(bpx.x , bpx.y,35);

 var gp = ground.position;
 rect(gp.x , gp.y,2000,25);

 var lwp = lWall.position;
 rect(lwp.x , lwp.y , 10 , 60);

 var rwp = rWall.position;
 rect(rwp.x , rwp.y , 10 , 60);
  
  drawSprites();
  textSize(20);
  fill("red");
  text("right arrow for moving forward",10,20);
  text("left arrow for moving backward",10,45);
  text("down for moving downwards",10,70);
 
}

function keyPressed(){

if(keyCode === RIGHT_ARROW){

 Body.applyForce( ball,ball.position,{x:85,y:-85} );
}

if(keyCode === LEFT_ARROW){

	Body.applyForce(ball,ball.position,{x:-85,y:-85});
}

if(keyCode === DOWN_ARROW){

	Body.applyForce( ball , { x:0 , y:0 } , { x:0 , y:0.01 });
}
}

