var MemeGen = MemeGen || {};

MemeGen = (function() {

  var config = {
  };

  var $meme = null;

  var exampleQuotes = [
    {
      source: "Temple Grandin",
      quote: "I cannot emphasize enough the importance of a good teacher."
    },
    {
      source: "Sally Ride",
      quote: "You cannot be what you can't see."
    },
    {
      source: "Taylor Swift",
      quote: "Just shake it off."
    },
    {
      source: "Beyoncé",
      quote: "I woke up like this."
    },
    {
      source: "Drake",
      quote: "Started from the bottom, now we're here."
    },
    {
      source: "Martin Luther King, Jr.",
      quote: "If you can't fly then run, if you can't run then walk, if you can't walk then crawl, but whatever you do you have to keep moving forward."
    },
    {
      source: "Neil deGrasse Tyson",
      quote: "The good thing about science is that it's true whether or not you believe in it."
    }
  ];

  var swatches = {
    grayscaleSimple: ["black", "#333", "#666", "#ccc", "white"],
    ucBrandColors: ["#1295D8","#FFB511","#005581","#72CDF4", "#FFD200", "#FFE552", "#FF6E1B",
      "#FF8F28", "#E44C9A", "#FEB2E0", "#00778B", "#00A3AD", "#7C7E7F", "#8F8884", "#BEB6AF", "#DBD5CD", "#B4975A"]
  };

  var swatchCombined = swatches.grayscaleSimple.concat(swatches.ucBrandColors);

  function init(){

    $meme = $("#meme-window");
    $download = $(".download-image");

    $download.on('click', onDownloadClick);

    randomQuote();
    spinnerInit();


    $( ".caption textarea" ).keyup(function() {
      var str = $( this ).val();
      $(".meme .caption").text(str);
    });

    $( ".source input" ).keyup(function() {
      var str = $( this ).val();
      $(".meme .source").text(str);
    });

    $("input.overlay-color").one("click", function() {
      $(this).trigger("colorpickersliders.updateColor", "rgba(0,0,0,0.5)");
    });

    // Text Alignment
    $(".text-alignment").on( "click", "button", function(event) {
      textAlignment( event );
    });

    // Quote Marks
    $(".quote-control").on( "click", function(event) {
      $(".meme .caption").toggleClass("quotemarks");
    });


    // Font Size Control
    $( ".font-sizer" ).change(function(event) {
      var fontSize = event.currentTarget.value;
      $(".meme .caption").css("font-size", parseInt(fontSize, 10) + "px" );
    });

    // Color picker binding
    colorPicker($("#control-wrapper .background-color"), $('#meme-window'), "background-color");
    colorPicker($("#control-wrapper .text-color"), $('#meme-window .caption'), "color");
    colorPicker($("#control-wrapper .source-color"), $('#meme-window .source'), "color");
    colorPicker($("#control-wrapper .overlay-color"), $('#meme-window .overlay'), "background-color");

  }

  function randomQuote(){
    var randomQ = exampleQuotes[Math.floor(Math.random()*exampleQuotes.length)];
    $(".meme .caption").text(randomQ.quote);
    $(".caption textarea").val(randomQ.quote);
    $(".meme .source").text(randomQ.source);
    $(".source input").val(randomQ.source);
  }

  function textAlignment( event ){
    var classList = event.currentTarget.classList;
    var alignment;
    var type = "";

    for( var i = 0; i < classList.length; i++ ){
      if( classList[i].indexOf("halign-") >= 0 ){
        alignment = classList[i].replace("halign-","");
        type = "halign";
      }else if ( classList[i].indexOf("valign-") >= 0 ){
        alignment = classList[i].replace("valign-","");
        type = "valign";
      }
    }

    if( type === "halign"){
      $(".meme .caption, .meme .source").css("text-align", alignment);
    }else {
      $(".meme .caption-group").removeClass("alignment top");
      $(".meme .caption-group").removeClass("alignment bottom");
      $(".meme .caption-group").addClass("alignment "+alignment);
    }
  };

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
  };

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
  };

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
        var dataUrl = canvas.toDataURL();
        callback(dataUrl);
      }
    });
  };

  function retinaSize() {
    $('#meme-window')
      .css('transform', 'scale(2, 2)')
      .css('width', '1280px')
      .css('height', '640px');
  }


  function spinnerInit(){
    $('.spinner .btn:first-of-type').on('click', function() {
      $('.spinner input').val( parseInt($('.spinner input').val(), 10) + 1);
      $(".spinner input").change();
    });
    $('.spinner .btn:last-of-type').on('click', function() {
      $('.spinner input').val( parseInt($('.spinner input').val(), 10) - 1);
      $(".spinner input").change();
    });
  };


  // Public Interface
  return {
    init: init,
    readURL: readURL
  };

}());

MemeGen.init();
