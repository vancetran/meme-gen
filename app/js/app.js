var MemeGen = MemeGen || {};

MemeGen = function() {

  function init(){
    console.log("Team boo.");

    generateCanvas();

    $( ".caption input" ).keyup(function() {
      var str = $( this ).val();
      $(".meme .caption").html(str);
    });

    $( ".source input" ).keyup(function() {
      var str = $( this ).val();
      $(".meme .source").html(str);
    });

    $(".generate-image").click( function() {
      generateCanvas();
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

  function generateCanvas() {
    html2canvas( $(".meme-wrapper .meme"), {
      onrendered: function(canvas) {
        $("footer").html(canvas);
        //document.body.appendChild(canvas);
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
