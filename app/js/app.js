var MemeGen = MemeGen || {};

MemeGen = function() {

  function init(){
    console.log("Team boo.");

    html2canvas(document.body, {
      onrendered: function(canvas) {
        document.body.appendChild(canvas);
      },
      width: 300,
      height: 300
    });
  }

  // Public Interface
  return {
    init: init
  };

}();

MemeGen.init();
