var MemeGen = MemeGen || {};

MemeGen = function() {

  function init(){
    console.log("Team boo.");

    html2canvas( $(".meme-wrapper .meme"), {
      onrendered: function(canvas) {
        document.body.appendChild(canvas);
      }
    });
  }

  // Public Interface
  return {
    init: init
  };

}();

MemeGen.init();
