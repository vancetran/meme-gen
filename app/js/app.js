var MemeGen = MemeGen || {};

MemeGen = (function() {

  var swatches = {
    grayscaleSimple: ["black", "#333", "#666", "#ccc", "white"],
    ucBrandColors: ["#1295D8","#FFB511","#005581","#72CDF4", "#FFD200", "#FFE552", "#FF6E1B",
      "#FF8F28", "#E44C9A", "#FEB2E0", "#00778B", "#00A3AD", "#7C7E7F", "#8F8884", "#BEB6AF", "#DBD5CD", "#B4975A"]
  };

  var swatchCombined = swatches.grayscaleSimple.concat(swatches.ucBrandColors);

  function init(){

    // renderImage();

    $( ".caption input" ).keyup(function() {
      var str = $( this ).val();
      $(".meme .caption").html(str);
    });

    $( ".source input" ).keyup(function() {
      var str = $( this ).val();
      $(".meme .source").html(str);
    });

    // $( ".color input#full-popover" ).css(function() {
    //   var str = $( this ).val();
    // });


    $("input.overlay-color").one("click", function() {
      $(this).trigger("colorpickersliders.updateColor", "rgba(0,0,0,0.5)");
    });

    $(".generate-image").click( function() {
      renderImage();
    });

    $(".download-image").click( function() {
      downloadImage();
    });

    // Text Alignment
    $(".ac-left").click( function(e) {
      e.preventDefault();
      $(".meme .caption, .meme .source").css("text-align","left");
    });
    $(".ac-center").click( function(e) {
      e.preventDefault();
      $(".meme .caption, .meme .source").css("text-align","center");
    });
    $(".ac-right").click( function(e) {
      e.preventDefault();
      $(".meme .caption, .meme .source").css("text-align","right");
    });
    $(".ac-top").click( function(e) {
      e.preventDefault();
      $(".meme .caption-group").css("position","absolute");
      $(".meme .caption-group").css("top","20px");
      $(".meme .caption-group").css("left","20px");
      $(".meme .caption-group").css("right","20px");
      $(".meme .caption-group").css("bottom","auto");
    });
    $(".ac-bottom").click( function(e) {
      e.preventDefault();
      $(".meme .caption-group").css("position","absolute");
      $(".meme .caption-group").css("top","auto");
      $(".meme .caption-group").css("bottom","20px");
      $(".meme .caption-group").css("left","20px");
      $(".meme .caption-group").css("right","20px");
    });

    // Color picker binding
    colorPicker($("#control-wrapper .background-color"), $('#meme-window'), "background-color");
    colorPicker($("#control-wrapper .text-color"), $('#meme-window .caption'), "color");
    colorPicker($("#control-wrapper .source-color"), $('#meme-window .source'), "color");
    colorPicker($("#control-wrapper .overlay-color"), $('#meme-window .overlay'), "background-color");

    // colorPicker($("#control-wrapper .text-color"), $('#meme-window .source'), "color");

  }

  function colorPicker( picker, target, cssProperty ) {
    picker.ColorPickerSliders({
      // color: '#1295D8',
      placement: 'auto bottom',
      hsvpanel: true,
      previewformat: 'hex',
      swatches: swatchCombined,
      customswatches: false,
      sliders: false,

      onchange: function(container, color) {

        //var targetText = $('#control-wrapper .text-color');

        target.css(cssProperty, color.tiny.toRgbString());

        //var currentColorText = target.css('color');
        //console.log(currentColorText);

        //targetText.val(currentColorText.tiny.toHexString());


        // if (color.cielch.l < 60) {
        //     target.css("color", "white");
        // }
        // else {
        //     target.css("color", "black");
        // }


      }
    });
  }

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#meme-window')
          .css('background-image', 'url('+e.target.result +')')
          .css('background-position', 'center center')
          .css('background-color', 'transparent');
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  function renderImage() {
    html2canvas( document.getElementById("meme-window"), {
      onrendered: function(canvas) {
        // $("footer").html(canvas);
        document.body.appendChild(canvas);
      }
    });
  }

  function downloadImage() {
    html2canvas( document.getElementById("meme-window"), {
      onrendered: function(canvas) {
        canvas.toBlob(function(blob) {
          saveAs(blob, "dat-image.png");
        });
          }
    });
  }

  function retinaSize() {
    $('#meme-window')
      .css('transform', 'scale(2, 2)')
      .css('width', '1280px')
      .css('height', '640px');
  }


  // Public Interface
  return {
    init: init,
    readURL: readURL
  };

}());

MemeGen.init();
