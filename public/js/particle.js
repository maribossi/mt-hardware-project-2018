"use strict";
class particle {
  constructor(_x, _y, _color, _size) {
    
    this.size = _size;
    this.fillcolor = _color;
    this.xpos = _x;
    this.ypos = _y;
    this.lifespan = 300.0;
    
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.lifespan -= 1;
  }

  // Method to display
  display() {
    // stroke(0, this.lifespan);
    // strokeWeight(2);
    // fill(this.color, this.lifespan);
    stroke(0);
    strokeWeight(1);
    fill(this.fillcolor);
    ellipse(this.xpos, this.ypos, this.size, this.size);
  }

  // Is the particle still useful?
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}