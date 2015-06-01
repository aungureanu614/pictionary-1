/**
 * Created by tstuart on 5/31/15.
 */


var pictionary = function() {
    var canvas, context;
    var drawing = false;

    var draw = function(position) {
        context.beginPath();
        context.arc(position.x, position.y, 6, 0, 2 * Math.PI);
        context.fill();
    };

    var clearCanvas = function() {
        // Is this best way to clear canvas?
        canvas[0].width = canvas[0].offsetWidth;
    };

    // set up socket.io
    var socket = io();
    socket.on('connected', function(drawList) {
        drawList.forEach(function(position) {
            draw(position);
        });
    });

    socket.on('draw', draw);
    socket.on('guess', function(guess) {
        $('#guesses').text(guess);
    });
    socket.on('clear', clearCanvas);

    // setup canvas and context
    canvas = $('canvas');
    context = canvas[0].getContext('2d');
    canvas[0].width = canvas[0].offsetWidth;
    canvas[0].height = canvas[0].offsetHeight;
    canvas.on('mousemove', function(event) {
        if (!drawing) {return;}
        var offset = canvas.offset();
        var position = {x: event.pageX - offset.left, y: event.pageY - offset.top};
        draw(position);
        socket.emit('draw', position);
    });

    canvas.on('mousedown', function() {
        drawing = true;
    });

    canvas.on('mouseup', function(){
        drawing = false;
    });

    // this if for the guessing box
    var guessBox = $('#guess input');
    guessBox.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }
        socket.emit('guess', guessBox.val());
        guessBox.val('');
    });


    // handle clear canvas button
    $('#clearButton').on('click', function(){
        clearCanvas();
        socket.emit('clear');
    });
};

$(document).ready(function() {
    pictionary();
});