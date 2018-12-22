var socket;
var r, g, b;
var x, y, z;
var xpos, ypos;
var status;


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    noStroke();

    var size = window.innerHeight;

    ellipse(window.innerWidth/2, window.innerHeight/2, size, size);
    fill(90);
    ellipse(window.innerWidth/2, window.innerHeight/2, size*0.7, size*0.7);
    pieChart(size*0.7, 8);

    socket = io();
    socket.on('button', showColor);
    socket.on('playerDraw', newDrawing);

}




function pieChart(diameter, pieces) {
    var lastAngle = 0;
    for (var i = 0; i < pieces; i++) {
      var hueValue = random(255);
      fill(hueValue);
      arc(width/2, height/2, diameter, diameter, lastAngle, lastAngle += radians(360/pieces));
      lastAngle += radians(360/pieces);

    }
  }

  function draw() {
    
    //add/subract xpos and ypos
    xpos = xpos + x;
    ypos = ypos - y;

    // wrap ellipse if over bounds
    if(xpos > 800) { xpos = 0; }
    if(xpos < 0) { xpos = 800; }
    if(ypos > 600) { ypos = 0; }
    if(ypos < 0) { ypos = 600; }

    // draw ellipse
    fill(0);
    ellipse(xpos, ypos, 25, 25);

    var data = {
        x: xpos,
        y: ypos,
        r: r,
        g: g,
        b: b
    }

    socket.emit('player draw', data);
}

// function draw() {

    //background(random(255));

    
    // //
    //var d = new Date();
    

    // if (d.getSeconds() != this.secs) {
    //     this.secs = d.getSeconds();

    //     this.duration -= 1;
    //     if (this.duration >= 0) {
            
    //         push();
    //         translate(200, 540);
    //         fill(0, 35, 90);
    //         noStroke();
    //         rectMode(CENTER);
    //         ellipse(0, 0, 145);
        
    //         fill(255);
    //         noStroke();
    //         textSize(35);
    //         textAlign(CENTER);
    //         text(this.duration, 0, 10);

    //         var p_s = this.duration/this.totaltime + .001;
    //         noFill();
    //         stroke(255);
    //         strokeCap(SQUARE);
    //         strokeWeight(4);
    //         arc(0, 0, 140, 140, 0, p_s * 2 * PI);
    //         pop();
    //     }

    // }

// }

function showColor(data) {
    

    if(data != status){
        status = data;
        console.log("showColor " + status);

        switch(status){
            case "Down1":
            background(255,0,0);
            break;
            case "Down2":
            background(0,255,0);
            break;
            case "Down3":
            background(0,0,255);
            break;
    
        }


    }

    
}

function newDrawing(data) {
    noStroke();
    fill(data.r, data.g, data.b);
    ellipse(data.x, data.y, 36, 36);
}

window.addEventListener('devicemotion', function(e) 
{
    console.log(" ///// devicemotion /////// " );
  // get accelerometer values
  x = parseInt(e.accelerationIncludingGravity.x);
  y = parseInt(e.accelerationIncludingGravity.y);
  z = parseInt(e.accelerationIncludingGravity.z); 

  console.log(" ///// devicemotion /////// " + x );
  console.log(" ///// devicemotion /////// " + y);
  console.log(" ///// devicemotion /////// " + x);

});

