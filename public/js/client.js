var socket;
var _x, _y, _z;
var xpos, ypos;
var status;
var colors = [];
var selColors = [];
var particles = [];
var cnv;


function setup() {
    cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.parent('sketch-holder');
    background(0);

    xpos = ypos = _x = _y = _z = 0;

    socket = io();
    socket.on('connected', setInitialColors);
    socket.on('playerDraw', newDrawing);
    socket.on('colorUpdated', updateColor);

}

function setInitialColors(data) {
    colors = data;
    var w = [255, 255, 255];
    selColors = [w, w, w];
    drawPalette();
    window.addEventListener('devicemotion', handleMotion);

}

function newDrawing(data) {

    if (selColors.length < 1) return;
    particles.push(new particle(data.x * 4, data.y * 6, selColors[2], data.alpha));

    // stroke(0);
    // strokeWeight(1);
    // fill(selectedColor);
    // ellipse(data.x * 4, data.y * 6, data.alpha, data.alpha);
}

function updateColor(data) {

    TweenMax.to(selColors[1], 1, {0:data[0], 1:data[1],2:data[2], onComplete:onTweenComplete});
    
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
            arc(width / 2, height / 2, diameter, diameter, lastAngle, lastAngle + radians(360 / pieces));
            lastAngle += radians(360 / pieces);
        }
    }
}

function draw() {
    background(0);
    drawPalette();

    if (selColors[0] && selColors[1]) {
        var c1 = color(selColors[0][0], selColors[0][1], selColors[0][2], 255);
        var c2 = color(selColors[1][0], selColors[1][1], selColors[1][2], 255);

        selColors[2] = lerpColor(c1, c2, 0.5);

    }

    for (var particle of this.particles) {
        particle.run();
    }
    // Filter removes any elements of the array that do not pass the test
    this.particles = this.particles.filter(particle => !particle.isDead());

}

function keyPressed() {

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

function handleMotion(e) {

    _x = parseInt(e.accelerationIncludingGravity.x);
    _y = parseInt(e.accelerationIncludingGravity.y);
    _z = parseInt(e.accelerationIncludingGravity.z);

    // console.log("alpha = " + e.rotationRate.alpha);
    // console.log("beta = " + e.rotationRate.beta);
    // console.log("gamma = " + e.rotationRate.gamma);

    var alpha = parseInt(e.rotationRate.alpha * 5); //
    var beta = parseInt(e.rotationRate.beta * 5); //front to back
    var gamma = parseInt(e.rotationRate.gamma * 5); //side to side

    xpos = xpos - (_y * 0.5);
    ypos = ypos - (_x * 0.5);

    // wrap ellipse if over bounds
    if (xpos > cnv.width) { xpos = 0; }
    if (xpos < 0) { xpos = cnv.width; }
    if (ypos > cnv.height) { ypos = 0; }
    if (ypos < 0) { ypos = cnv.height; }


    var data = {
        x: xpos,
        y: ypos,
        alpha: alpha,
        beta: beta,
        gamma: gamma
    }

    socket.emit('player draw', data);
}

function showColor(data) {

    if (data != status) {
        status = data;

        switch (status) {
            case "Down1":
                drawPallette(colors[0]);
                break;
            case "Down2":
                drawPallette(colors[1]);
                break;
            case "Down3":
                drawPallette(colors[2]);
                break;
            case "Down4":
                drawPallette(colors[3]);
                break;
            case "Down5":
                drawPallette(colors[4]);
                break;
            case "Down6":
                drawPallette(colors[5]);
                break;
            case "Down7":
                drawPallette(colors[6]);
                break;
            case "Down8":
                drawPallette(colors[7]);
                break;

        }

    }

}






