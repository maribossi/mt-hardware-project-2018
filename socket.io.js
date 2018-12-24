// The `isPullup` button option enables the pullup
// resistor on the pin and automatically sets the
// `invert` option to true

// In this circuit configuration, the LED would always
// be on without the pullup resistor enabled

// For more info on pullup resistors, see:
// http://arduino.cc/en/Tutorial/InputPullupSerial
// http://arduino.cc/en/Tutorial/DigitalPins
// https://learn.sparkfun.com/tutorials/pull-up-resistors

//'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server, { wsEngine: 'ws' });
var five = require('johnny-five');

let button1 = null;
let button2 = null;
let button3 = null;
let button4 = null;
let button5 = null;
let button6 = null;
let button7 = null;
let button8 = null;

var colors = [
    [0, 0, 0],
    [22, 168, 247],
    [255, 255, 255],
    [7, 183, 121],
    [244, 238, 66],
    [229, 112, 22],
    [229, 9, 9],
    [149, 57, 186]
];

// 1 = zwart = 0,0,0
// 2 = blauw = 22, 168, 247
// 3 = wit = 255,255,255
// 4 = groen = 7, 183, 121
// 5 = geel = 244, 238, 66
// 6 = oranje = 229, 112, 22
// 7 = rood = 229, 9, 9
// 8 = paars = 149, 57, 186

let selectedColor = colors[2];

var clients = {};

var port = process.env.PORT || 8081;
app.set('port', port);

server.listen(app.get('port'), function () {
    console.log('----- SERVER STARTED -----');
});

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


// Listen to the web socket connection
io.on('connection', function (client) {
    
    clients[client.id] = {
        clientId: client.id
    };
    console.log('a client connected ' + Object.keys(clients).length);

    client.emit('connected', colors);

    client.on('player draw', function (data) {
        io.emit('playerDraw', data);
    });

    client.on('update color', function (data) {
        selectedColor = colors[data];
        io.emit('colorUpdated', selectedColor);
    });


    five.Board().on("ready", function () {
        
        button1 = new five.Button({
            pin: 3,
            isPullup: true
        });
        button2 = new five.Button({
            pin: 4,
            isPullup: true
        });
        button3 = new five.Button({
            pin: 5,
            isPullup: true
        });
        button4 = new five.Button({
            pin: 6,
            isPullup: true
        });
        button5 = new five.Button({
            pin: 7,
            isPullup: true
        });
        button6 = new five.Button({
            pin: 8,
            isPullup: true
        });
        button7 = new five.Button({
            pin: 9,
            isPullup: true
        });
        button8 = new five.Button({
            pin: 10,
            isPullup: true
        });


        button1.on("down", function (value) {
            console.log("Down1");
            io.emit('colorUpdated', colors[0]);
        });
        
        button2.on("down", function (value) {
            console.log("Down2");
            io.emit('colorUpdated', colors[1]);
        });

        button3.on("down", function (value) {
            console.log("Down3");
            io.emit('colorUpdated', colors[2]);
        });

        button4.on("down", function (value) {
            console.log("Down4");
            io.emit('colorUpdated', colors[3]);
        });
        
        button5.on("down", function (value) {
            console.log("Down5");
            io.emit('colorUpdated', colors[4]);
        });

        button6.on("down", function (value) {
            console.log("Down6");
            io.emit('colorUpdated', colors[5]);
        });

        button7.on("down", function (value) {
            console.log("Down7");
            io.emit('colorUpdated', colors[6]);
        });

        button8.on("down", function (value) {
            console.log("Down8");
            io.emit('colorUpdated', colors[7]);
        });

    });

    client.on('disconnect', function () {
        // remove player from  players object
        delete clients[client.id];
        console.log('user disconnected ' + Object.keys(clients).length);
        // emit a message to all players to remove this player
        //io.emit('disconnect', players);
    });
});


server.listen(port, function () {
    console.log(`Listening on ${server.address().port}`);
});






