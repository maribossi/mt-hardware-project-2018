// The `isPullup` button option enables the pullup
// resistor on the pin and automatically sets the
// `invert` option to true

// In this circuit configuration, the LED would always
// be on without the pullup resistor enabled

// For more info on pullup resistors, see:
// http://arduino.cc/en/Tutorial/InputPullupSerial
// http://arduino.cc/en/Tutorial/DigitalPins
// https://learn.sparkfun.com/tutorials/pull-up-resistors

'use strict';

const five = require('johnny-five');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let button1 = null;
let button2 = null;
let button3 = null;
let led = null;

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
    client.on('join', function (handshake) {
        console.log(handshake);
    });

    client.on('player draw', function (data) {
        client.emit('playerDraw', data);
    });

    // five.Board().on("ready", function () {

        // button1 = new five.Button({
        //     pin: 1,
        //     isPullup: true
        // });
        // button2 = new five.Button({
        //     pin: 2,
        //     isPullup: true
        // });
        // button3 = new five.Button({
        //     pin: 3,
        //     isPullup: true
        // });
        // button4 = new five.Button({
        //     pin: 4,
        //     isPullup: true
        // });
        // button5 = new five.Button({
        //     pin: 5,
        //     isPullup: true
        // });
        // button6 = new five.Button({
        //     pin: 6,
        //     isPullup: true
        // });
        // button7 = new five.Button({
        //     pin: 7,
        //     isPullup: true
        // });
        // button8 = new five.Button({
        //     pin: 8,
        //     isPullup: true
        // });


        

        // button1.on("down", function (value) {
        //     //console.log("Down2");
        //     client.emit('button', "Down1");
        // });
        
        // button2.on("down", function (value) {
        //     //console.log("Down2");
        //     client.emit('button', "Down2");
        // });

        // button3.on("down", function (value) {
        //     client.emit('button', "Down3");
            
        // });

        // button4.on("down", function (value) {
        //     //console.log("Down2");
        //     client.emit('button', "Down4");
        // });
        
        // button5.on("down", function (value) {
        //     //console.log("Down2");
        //     client.emit('button', "Down5");
        // });

        // button6.on("down", function (value) {
        //     client.emit('button', "Down6");
            
        // });

        // button7.on("down", function (value) {
        //     //console.log("Down2");
        //     client.emit('button', "Down7");
        // });

        // button8.on("down", function (value) {
        //     client.emit('button', "Down8");
            
        // });




    // });

});

server.listen(port, function () {
    console.log(`Listening on ${server.address().port}`);
});






