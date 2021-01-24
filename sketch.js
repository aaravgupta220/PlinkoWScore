const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;

var PLAY = 1;
var END = 0;
var gameState = "start";

var particles = [];
var plinkos = [];
var divisions = [];
var divcalc = [];

var divisionHeight=300;
var score =0;
var particle;
var count = 0;
var turn = 0;

function setup() {

  createCanvas(800, 800);

  engine = Engine.create();

  world = engine.world;

  ground = new Ground(width/2,height,width,20);

  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 75; j <=width; j=j+50) {
    plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50){
    plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <=width; j=j+50){
    plinkos.push(new Plinko(j,275));
  }

  for (var j = 50; j <=width-10; j=j+50) {
    plinkos.push(new Plinko(j,375));
  }

}
 


function draw() {

  background("black");

  //mousePressed();

  textSize(20)
  text("Score : "+score,20,30);

  for(var z = 20; z <= 320; z = z + 80){
    text("500", z, 520);
  }

  for(var x = 340; x <= 560; x = x + 80){
    text("100", x, 520);
  }

  for(var y = 580; y <= 800; y = y + 80){
    text("200", y, 520);
  }

  Engine.update(engine);

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if(particle != null){

    particle.display();

    if(particle.body.position.y > 760){

      if(particle.body.position.x < 300){

        score = score + 500;

        particle = null;

        if(count >= 5) gameState = "end";

    }

    else if(particle.body.position.x > 301 && particle.body.position.x < 600){

      score = score + 100;

      particle = null;

      if(count >= 5) gameState = "end";

  }

  else if(particle.body.position.x < 900 && particle.body.position.x > 601){

    score = score + 500;

    particle = null;

    if(count >= 5) gameState = "end";

}

}

}

if(gameState === "end"){
  textSize(40);
  fill("red");
  text("Game Over!", 300, 400);
}

}

function mousePressed(){

  if(gameState !== "end"){
    count++
    particle = new Particle(mouseX, 10, 10, 10);
  }

}