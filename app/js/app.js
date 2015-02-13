var MemeGen = MemeGen || {};

MemeGen = function() {

  function init(){
    console.log("Team boo.");

    html2canvas( $(".meme-wrapper .meme"), {
      onrendered: function(canvas) {
        document.body.appendChild(canvas);
      }
    });

    $( ".form-group input" ).keyup(function() {
      var str = $( this ).val();
      $(".meme .caption").html(str);

      console.log("keypress! contents: " + str);
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
