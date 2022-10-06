var anchors = []
var gravity;
var candy;
var m = 0.01
var on  = false

class Candy{
    constructor(x,y){
        this.pos = createVector(x,y)
        this.vel = createVector(0,0)
        this.r = 8   
    }
    update(){
        anchors.forEach(anc => {
            let f = p5.Vector.sub(anc,this.pos)
            f.limit(10)
            f.mult(m)
            this.vel.add(f)
        });
        this.vel.add(gravity)
        this.pos.add(this.vel)
        this.vel.mult(0.99)
    }
    show(){
        fill(255)
        noStroke()
        circle(this.pos.x,this.pos.y,this.r)
        anchors.forEach(anc => {
            stroke(255)
            strokeWeight(1)
            line(anc.x,anc.y,this.pos.x,this.pos.y)
        });
    }
}

function setup(){
    createCanvas(1200,640)
    for(let i = 0; i < 5; i++){
        anchors.push(createVector(floor(random(20,width-20)),floor(random(10,height - 10))))
    }
    candy = new Candy(floor(random(20,width-20)),floor(random(10,height - 10)))
    gravity =  createVector(0,0.1)
}

function draw(){
    background(0)
    if(!on){
        candy.update()
    }
    candy.show()
    anchors.forEach(anc => {
        fill(255)
        noStroke()
        circle(anc.x,anc.y,2)
    });
    circle(mouseX,mouseY,8)
}

function mouseDragged(){
    if(key == 'c'){
        anchors.forEach((anc,i) => {
            if(collidePointLine(mouseX,mouseY,anc.x,anc.y,candy.pos.x,candy.pos.y,0.1)){
                anchors.splice(i,1)
            }
        });
    }
    else if(key == 'd'){
        candy.vel = createVector(0,0)
        candy.pos.x = mouseX
        candy.pos.y = mouseY
        on = true
    }
}

function mouseClicked(){
    if(key == ' '){
        anchors.push(createVector(mouseX,mouseY))
    }
}

function mouseReleased(){
    on = false
}