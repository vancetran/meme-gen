var UCMeme = UCMeme || {};

UCMeme = function() {
  var canvas;
  var ctx;
  var deviceWidth;
  var deviceHeight;
  var canvasWidth;
  var canvasHeight;
  var fileInput;
  var img;
  var centerX;
  var centerY;
  var scale;
  var rotate;
  var download;
  var text;
  var overlayColor;
  var overlayOpacity;

  function init(){

    canvas = document.getElementById("memecanvas");
    ctx = canvas.getContext("2d");
    deviceWidth = window.innerWidth;
    deviceHeight = window.innerHeight;
    canvasWidth = Math.min(750, deviceWidth-20);
    canvasHeight = Math.min(420, deviceWidth-20);
    fileInput = document.getElementById('fileInput');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    img = document.getElementById('start-image');
    scale = document.getElementById('scale');
    rotate = document.getElementById('rotate');
    download = document.getElementById("img-download");
    text = document.getElementById('custom-text');

    overlayColor = "0,0,0";
    overlayOpacity = 0;

    // When the image has loaded...
    img.onload = function() {
      // Draw it
      doTransform();
    };

    canvasCenter();
    bindUIActions();
    doTransform();
    drawText();
  }

  function bindUIActions(){
    scale.addEventListener('input', doTransform, false);
    scale.addEventListener('change', doTransform, false); // IE can't handle onInput    
    rotate.addEventListener('input', doTransform, false);
    rotate.addEventListener('change', doTransform, false); // IE can't handle onInput
    fileInput.addEventListener('change', imageLoader);
    download.addEventListener("mousedown", prepareDownload, false);
    text.addEventListener("keyup", function(){
      width = this.value;
      doTransform();
    }, false);

    $( ".color-picker.blue" ).on( "click", function() {
      overlayColor = "18,149,216";
      overlayOpacity = 0.5;
      doTransform();
    });
    $( ".color-picker.none" ).on( "click", function() {
      overlayOpacity = 0;
      doTransform();
    });
  }

  function canvasCenter(){
    centerX = canvas.width/2 - img.width/2;
    centerY = canvas.height/2 - img.height/2;
  }

  function imageLoader() {
    var reader = new FileReader();
    reader.onload = function(event) {
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById('scale').value = 1;
            document.getElementById('rotate').value = 0;
            
            canvasCenter();

            ctx.drawImage(img, centerX, centerY);
            doTransform();
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(fileInput.files[0]);
  }

  function doTransform(){
    ctx.save();
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    // Translate to center so transformations will apply around this point
    ctx.translate(canvas.width/2, canvas.height/2);
 
    // Perform scale
    var val = document.getElementById('scale').value;
    ctx.scale(val, val);
 
    // Perform rotation
    val = document.getElementById('rotate').value;
    ctx.rotate(val*Math.PI/180);
 
    // Reverse the earlier translation
    ctx.translate(-canvas.width/2, -canvas.height/2);
 
    // Finally, draw the image
    ctx.drawImage(img, centerX, centerY);
    
    ctx.restore();

    drawOverlay(overlayColor,overlayOpacity);
    drawText();
  }

  function drawOverlay(color, opacity){
    ctx.fillStyle = "rgba("+ color +", "+ opacity +")";
    ctx.fillRect (0, 0, canvasWidth, canvasHeight);
  }

  function drawText(){
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set the text style to that to which we are accustomed
    ctx.lineWidth  = 5;
    ctx.font = '20pt sans-serif';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';

    ctx.textAlign = 'center';
    ctx.lineJoin = 'round'; // prevent spikey canvas text
    // ctx.miterLimit = 2; // other possible way to prevent spikey canvas text

    // Draw the text
    var text = document.getElementById('custom-text').value;
    // text = text.toUpperCase();
    var x = canvas.width/2;
    var y = canvas.height - canvas.height/10;
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
  }

  function prepareDownload() {
    var data = canvas.toDataURL();
    download.href = data;
  }

  // Public Interface
  return {
    init: init
  };

}();

UCMeme.init();