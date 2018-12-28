var socket;
var _x, _y, _z;
var xpos, ypos, prev_xpos, prev_ypos;
var status;
var colors = [];
var selColors = [];
var particles = [];
var center = [];
var cnv;

var cp;


function setup() {
    cnv = createCanvas(window.innerWidth, window.innerHeight);
    //parent sketch-holder is used to scale up the sketch (in css) for beamer projection
    cnv.parent('sketch-holder');
    background(0);
    center = [width/2, height/2];

    xpos = ypos = prev_xpos = prev_ypos = 100;
    _x = _y = _z = 0;

    socket = io();
    socket.on('connected', initialize);
    socket.on('playerDraw', drawMotionData);
    socket.on('colorUpdated', updateColorWithTween);
}

function initialize(data) {
    colors = data;
    var w = [255, 255, 255];
    selColors = [w, w, w];

    drawPalette();

    window.addEventListener('devicemotion', collectAndEmitMotionData);

}

function drawMotionData(data) {

    background(0);
    drawPalette();

    //interpolate color values
    if (selColors[0] && selColors[1]) {
        var c1 = color(selColors[0][0], selColors[0][1], selColors[0][2], 255);
        var c2 = color(selColors[1][0], selColors[1][1], selColors[1][2], 255);

        selColors[2] = lerpColor(c1, c2, 0.5);
    }

    if (selColors.length < 1) return;
    particles.push(new particle(data.x*4, data.y*6, selColors[2], data.alpha));

    for (var i = 0; i <  particles.length; i++) {
        particles[i].run();
    }

    // removes particle from the array when it died
    particles = particles.filter(particle => !particle.isDead());
    
    // stroke(0);
    // strokeWeight(1);
    // fill(selColors[2]);
    // ellipse(data.x * 4, data.y * 6, data.alpha, data.alpha);
}

function updateColorWithTween(data) {

    TweenMax.to(selColors[1], 1, {0:data[0], 1:data[1],2:data[2], onComplete:onTweenComplete});
    selColors[1] = data;
}

function onTweenComplete() {
    selColors[0] = selColors[1];
}


function drawPalette() {
    noStroke();
    if (colors.length == 8) {
        var pieces = 8;
        var diameter = height;

        var lastAngle = 0;
        for (var i = 0; i < pieces; i++) {
            var hueValue = colors[i];
            fill(hueValue);
            arc(center[0], center[1], diameter, diameter, lastAngle, lastAngle + radians(45));
            lastAngle += radians(45);
        }
    }
}

function draw() {
    // needed to listen to key press events (used for debugging without hardware)
}

function keyPressed() {
     // used for debugging without hardware, to select colors

    var index;
    switch (keyCode) {
        case 49: index = 0; break;
        case 50: index = 1; break;
        case 51: index = 2; break;
        case 52: index = 3; break;

        case 53: index = 4; break;
        case 54: index = 5; break;
        case 55: index = 6; break;
        case 56: index = 7; break;
    }

    socket.emit('update color', index);

}

function collectAndEmitMotionData(e) {

    _x = parseInt(e.accelerationIncludingGravity.x);
    _y = parseInt(e.accelerationIncludingGravity.y);
    //_z = parseInt(e.accelerationIncludingGravity.z);

    var alpha = parseInt(8 + e.rotationRate.alpha * 1.5); //
    // var beta = parseInt(e.rotationRate.beta * 5); //front to back
    // var gamma = parseInt(e.rotationRate.gamma * 5); //side to side

   
    xpos = xpos - (_y * 0.5);
    ypos = ypos - (_x * 0.5);

    

    if (xpos > window.innerWidth/2) { xpos -= window.innerWidth/2; }
    if (xpos < 0) { xpos = window.innerWidth/2; }
    if (ypos > window.innerHeight/2) { ypos -= window.innerHeight/2; }
    if (ypos < 0) { ypos = window.innerHeight/2; }

    if( xpos != prev_xpos || ypos != prev_ypos) 
    {

        prev_xpos = xpos;
        prev_ypos = ypos;

        var data = {
            x: xpos,
            y: ypos,
            alpha: alpha
        }
    
        socket.emit('player draw', data);

    }

   
}









