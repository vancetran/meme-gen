var MemeGen = MemeGen || {};

MemeGen = function() {

  function init(){
    console.log("Team boo.");

    renderImage();

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

  }

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#blah')
        .attr('src', e.target.result)
        .width(150)
        .height(200);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  function renderImage() {
    html2canvas( document.getElementById("meme-window"), {
      onrendered: function(canvas) {
        // $("footer").html(canvas);

        document.body.appendChild(canvas);

        // Download PNG
        
        // canvas.toBlob(function(blob) {
        //   saveAs(blob, "pretty image.png");
        // });
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
