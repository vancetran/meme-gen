var canvas;
var canvasWidth;
var ctx;
var x;
var y;
var download;
var data;
var fileInput;
var img;


window.onload = function() {
    prepareExample();
}

function prepareExample() {
    img = document.getElementById('default-image');

    var deviceWidth = window.innerWidth;
    canvasWidth = Math.min(600, deviceWidth - 20);
    canvasHeight = Math.min(480, deviceWidth - 20);
    canvas = document.getElementById('memecanvas');


    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');

    x = canvas.width / 2 - img.width / 2;
    y = canvas.height / 2 - img.height / 2;

    ctx.drawImage(img, x, y);

    ctx.textAlign = 'center';
    ctx.lineWidth = 4;
    ctx.font = '20pt impact';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    doTransform();


    fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function(e) {

        var reader = new FileReader();
        reader.onload = function(event) {

            img.onload = function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                document.getElementById('scale').value = 1;
                document.getElementById('rotate').value = 0;
                x = canvas.width / 2 - img.width / 2;
                y = canvas.height / 2 - img.height / 2;
                ctx.drawImage(img, x, y);
                //imgTransform();
            }
            img.src = reader.result;
        }
        reader.readAsDataURL(fileInput.files[0]);




    }, false);

    var controls = document.getElementById('controls');
    var save = document.getElementById('save');
    save.addEventListener('click', function(e) {
        controls.style.display = 'none';
        document.getElementById('spinner-div').style.display = 'inline';
        var data = canvas.toDataURL();

        request = $.ajax({
            url: "/meme/save",
            type: "post",
            data: data
        });

        // callback handler that will be called on success
        request.done(function(response, textStatus, jqXHR) {
            // log a message to the console
            window.location.href = '/meme/view/' + response;
        });
    }, false);

    scale = document.getElementById('scale');
    scale.addEventListener('change', doTransform, false);

    rotate = document.getElementById('rotate');
    rotate.addEventListener('change', doTransform, false);

    download = document.getElementById('img-download');
    download.addEventListener('click', prepareDownload, false);

    ctx.textAlign = 'center';
    ctx.lineWidth = 4;
    ctx.font = '20pt impact';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';

}

function doTransform() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Translate to center so transformations will apply around this point
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Perform scale
    var val = document.getElementById('scale').value;
    ctx.scale(val, val);

    // Perform rotation
    val = document.getElementById('rotate').value;
    ctx.rotate(val * Math.PI / 180);

    // Reverse the earlier translation
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    // Finally, draw the image
    ctx.drawImage(img, x, y);

    ctx.restore();

    text = document.getElementById('custom-text').value;
    text = text.toUpperCase();
    //ctx.strokeText(text, canvas.width/2 , canvas.height - canvas.height/4 );
    //ctx.fillText(text, canvas.width/2 , canvas.height - canvas.height/4 );
    wrapText(ctx, text, canvas.width / 2, canvas.height - canvas.height / 4.5, canvasWidth - canvasWidth / 3, 30);
    // var length = ctx.measureText(text);
    // x = canvas.width/2;// - length/2;
    // y = canvas.height - canvas.height/4.5;
    // ctx.strokeText(text, x, y);
    // ctx.fillText(text, x, y);
}


function prepareDownload() {
    var data = canvas.toDataURL();
    download.href = data;
}

// Modified from http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            ctx.strokeText(line, x, y);
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.strokeText(line, x, y);
    ctx.fillText(line, x, y);
}