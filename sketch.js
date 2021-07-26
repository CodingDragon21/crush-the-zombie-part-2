const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground;
var base1;
var base2;
var bridge;
var link;
var stone;
var bg,bgImg
var zombie,zombieImg
var Stones = []
var chop

function preload(){
bgImg = loadImage("background.png")
zombieImg = loadImage("zombie.png")

}
function setup() {
  createCanvas(1000, 580);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  
  ground = new Base(500,600,1000,20)
 // base1 = new Base(100,320,200,90)
  base2 = new Base(1000,250,90,700)
  bridge = new Bridge(20,{x:0,y:250})
  Composite.add(bridge.body,base2.body)
  link = new Link(bridge,base2.body)

  bg = createSprite(500,290,20,20)
  bg.addImage("background",bgImg)
  bg.scale = 0.054

  zombie = createSprite(0,500,20,20)
  zombie.addImage("scary", zombieImg)
  zombie.scale = 0.15
  zombie.setVelocity(3,0)

  chop = createImg("axe.png")
  chop.position(900,200)
  chop.size(75,75)
  chop.mouseClicked(drop)

  for(var i = 0; i<10;i++){
    var x = random(width/2-200,width/2+300)
    var y = random(-10,100);
    var stone = new Stone(x,y,30);
    Stones.push(stone)
  }


}

function draw() {
  background("skyblue");
  drawSprites()
  
  Engine.update(engine);


 //ground.show()
  //base1.show()
  //base2.show()
  bridge.show()
  for(var j = 0; j<Stones.length ; j++){
    Stones[j].show()
  }

 


}
function drop(){
  link.detatch()
  setTimeout(() => {
  bridge.break()
  link = null
  },500)
}
