var MemeGen = MemeGen || {};

MemeGen = function() {

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

    $(".generate-image").click( function() {
      renderImage();
    });

    $(".download-image").click( function() {
      downloadImage();
    });

    colorPicker();

  }

  function colorPicker() {
    $("input#full-popover").ColorPickerSliders({
      placement: 'right',
      hsvpanel: true,
      previewformat: 'hex',

      onchange: function(container, color) {
        var target = $('#meme-window');

        target.css("background-color", color.tiny.toRgbString());

        if (color.cielch.l < 60) {
            target.css("color", "white");
        }
        else {
            target.css("color", "black");
        }
      }
    });
  }

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#meme-window')
          .css('background', 'transparent url('+e.target.result +') left top no-repeat');
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
