# Meme Gen Todo

## Top

* Customize filename for image download
* Font families and sizes
* Persistent Logo, on/off
* Text layouts. Title, credit/source
  * Centered, left, right / top or bottom aligned
* Cleanup

## Extra

* Twitter login/post
* Size templates
* [Handle retina screens][6]
* Mobile/Touch Friendly
* Try Gulp build process
* Direct entry into the preview itself

## Done

* [Fix blurry canvas/rendered image output][3]
  * position meme container absolutely by at least two positional properties
* Color input
  * Overlay, default to 50% opacity, set constraints on opacity (10-90%)
  * Background (auto changes text color for legibility)
  * Text color, to override auto-color from [Bootstrap color picker][5]
* Normalized grunt commands: grunt dev/build/watch
* [Use html2canvas](http://www.javascriptoo.com/html2canvas)
* Text overlay
* Download Image
* Live type and change text in preview
* Drop-in new image
* [Set uploaded image][1] to .meme's background-image, [used this solution][2]


[1]: http://stackoverflow.com/questions/12368910/html-display-image-after-selecting-filename
[2]: http://stackoverflow.com/questions/16312930/how-to-preview-an-uploaded-image-as-the-background-image-of-a-div
[3]: https://github.com/niklasvh/html2canvas/issues/340
[4]: http://bgrins.github.io/TinyColor/
[5]: http://www.virtuosoft.eu/code/bootstrap-colorpickersliders/
[6]: https://github.com/niklasvh/html2canvas/issues/241