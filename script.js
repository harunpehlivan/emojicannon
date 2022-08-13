function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

const emojis = '😀,😃,😄,😁,😆,😅,😂,🥲,🤣,☺️,😊,😇,🙂,😉,😗,😘,🥰,😍,😌,😙,😚,😋,😝,🤓,🧐,🤨,😜,😎,🥸,🤩,😏,🥳,😒,😞,😔,😟,😕,😫,😖,😣,☹️,🙁,😩,🥺,😢,😤,😳,🤯,🤬,😡,😠,🥵,🥶,😱,😨,😰,🤭,🤔,🤗,😓,🤫,😥,🤥,😶,😐,😧,😦,😯,🙄,😬,😮,😲,🥱,😴,🤤,🤢,🥴,🤐,😵,😪,🤮,🤧,😷,🤒,🤕,🤑,🤠,😈,👿,👹,🤡,💩,💀,🎃,🤖,👽'.split`,`;

let blobs = [];

class Emoji {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rs = 2 + (Math.random() * 5);
    this.dead = false;
    this.em = emojis[Math.floor(Math.random() * emojis.length)];
  }
  run(){
    push();
    translate(this.x, this.y);
    rotate(this.r);
    textAlign(CENTER, CENTER);
    textSize(30);
    rotate(frameCount * (this.rs));
    text(this.em, 0, 0);
    pop();
    this.x += cos(this.r) * this.rs * 3;
    this.y += sin(this.r) * this.rs * 3;

    if(this.x < 0 || this.x > width || this.y < 0 || this.y > height){
      this.dead = true;
    }
  }
}

let gt = 0;
let c = "rgb(200,200,200)";
function draw() {
  let rot = atan2(mouseY - height/2, mouseX - width/2);
  background(255);

  blobs = blobs.filter(x => !x.dead);
  blobs.forEach(b => b.run());
  gt += -gt/10;
  
  noStroke();
  fill(c);
  push();
  translate(width/2, height/2);
  rotate(rot);
  rect(-30 - gt, -30, 120, 60, 60, 0, 0, 60);
  pop();
  if(mouseIsPressed) {
    c = color(150,150,150)
    if(frameCount % 5 === 0){
      gt = 10;
      blobs.push(new Emoji(width/2 + (cos(rot) * 90), height/2 + (sin(rot) * 90), rot));
    }
  }else{
    c = color(200,200,200)
  }
  
}