var MemeGen = MemeGen || {};

MemeGen = function() {

  function init(){
    console.log("Team boo.");

    html2canvas( $(".meme-wrapper .meme"), {
      onrendered: function(canvas) {
        document.body.appendChild(canvas);
      }
    });

    $( ".form-group input" ).keypress(function() {
      console.log( "Handler for .keypress() called." );
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

  // Public Interface
  return {
    init: init,
    readURL: readURL
  };

}();

MemeGen.init();
