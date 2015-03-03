var MemeGen = MemeGen || {};

MemeGen = function() {

  var swatches = {
    grayscaleSimple: ["black", "#333", "#666", "#ccc", "white"],
    ucBrandColors: ["#1295D8","#FFB511","#005581","#72CDF4", "#FFD200", "#FFE552", "#FF6E1B",
      "#FF8F28", "#E44C9A", "#FEB2E0", "#00778B", "#00A3AD", "#7C7E7F", "#8F8884", "#BEB6AF", "#DBD5CD", "#B4975A"]
  };

  var swatchCombined = swatches.grayscaleSimple.concat(swatches.ucBrandColors);

  function init(){
    console.log("Team boo.");

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




    $(".generate-image").click( function() {
      renderImage();
    });

    $(".download-image").click( function() {
      downloadImage();
    });

    colorPicker($("#control-wrapper .background-color"), $('#meme-window'), "background-color");

    colorPicker($("#control-wrapper .text-color"), $('#meme-window .caption'), "color");

    // colorPicker($("#control-wrapper .text-color"), $('#meme-window .source'), "color");

  }

  function colorPicker( picker, target, cssProperty ) {
    picker.ColorPickerSliders({
      // color: '#1295D8',
      placement: 'right',
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

  // Public Interface
  return {
    init: init,
    readURL: readURL
  };

}();

MemeGen.init();
