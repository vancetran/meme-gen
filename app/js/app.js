var MemeGen = MemeGen || {};

MemeGen = (function() {

  var config = {
  };

  var $meme = null;
  var $download = null;

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
      source: "Beyonce",
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
    },
    {
      source: "Dr. Ian Malcom, Jurassic Park",
      quote: "Life, uh... finds a way."
    },
    {
      source: "Hodor",
      quote: "Hodor"
    }
  ];

  var colorSwatches = {
    grayscaleSimple: ["black", "#333", "#666", "#ccc", "white"],
    ucBrandColors: ["#1295D8","#FFB511","#005581","#72CDF4", "#FFD200", "#FFE552", "#FF6E1B",
      "#FF8F28", "#E44C9A", "#FEB2E0", "#00778B", "#00A3AD", "#7C7E7F", "#8F8884", "#BEB6AF", "#DBD5CD", "#B4975A"]
  };

  var colorSwatchesCombined = colorSwatches.grayscaleSimple.concat(colorSwatches.ucBrandColors);

  var init = function(){

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
    $("#quotemarks-toggle").on( "click", function(event) {
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


    // Logo Alignment
    $("#logo-alignment").on( "click", "button", function(event) {
      logoAlignment( event );
    });

    // Logo Size
    $("#logo-size").on( "click", "button", function(event) {
      logoSize( event );
    });

    // Logo Toggle
    $("#logo-toggle").on( "click", function(event) {
      $("#logo-overlay").toggle();
    });

  };

  var randomQuote = function(){
    var randomQ = exampleQuotes[Math.floor(Math.random()*exampleQuotes.length)];
    $(".meme .caption").text(randomQ.quote);
    $(".caption textarea").val(randomQ.quote);
    $(".meme .source").text(randomQ.source);
    $(".source input").val(randomQ.source);
  };

  var textAlignment = function( event ){
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

  var logoAlignment = function( event ){
    var classList = event.currentTarget.classList;
    var alignment;

    for( var i = 0; i < classList.length; i++ ){
      if( classList[i].indexOf("lalign-") >= 0 ){
        alignment = classList[i].replace("lalign-","");
      }
    }

    $("#logo-overlay").removeClass();
    $("#logo-overlay").addClass("align-" + alignment);
  };

  var logoSize = function( event ){
    var classList = event.currentTarget.classList;
    var size;

    for( var i = 0; i < classList.length; i++ ){
      if( classList[i].indexOf("lsize-") >= 0 ){
        size = classList[i].replace("lsize-","");
      }
    }

    $("#logo-overlay").removeClass("logo-sm");
    $("#logo-overlay").removeClass("logo-md");
    $("#logo-overlay").removeClass("logo-lg");

    $("#logo-overlay").addClass("logo-" + size);
  };

  var colorPicker = function( picker, target, cssProperty ) {
    picker.ColorPickerSliders({
      // color: '#1295D8',
      placement: 'auto bottom',
      hsvpanel: true,
      previewformat: 'hex',
      swatches: colorSwatchesCombined,
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

  var readURL = function(input) {
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

  var slugify = function(text){
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
  };

  var downloadImage = function(dataUrl) {

    var quote = $('#meme-window .caption').text().split(' ', 5);
    var filename = slugify(quote.join(' '));

    var a = $('<a>').attr('href', dataUrl).attr('download', 'meme-' + filename + '.png').appendTo('body');

    a[0].click();

    a.remove();

    $('#download').attr('href', dataUrl).attr('target', '_blank');
    $('#download').trigger('click');
  };


  var onDownloadClick =  function() {
    getImage(downloadImage);
  };

  var getImage = function( callback ) {
    html2canvas( $meme, {
      onrendered: function(canvas) {
        var dataUrl = canvas.toDataURL();
        callback(dataUrl);
      }
    });
  };

  var spinnerInit = function(){
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