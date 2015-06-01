# Meme Gen Todo

## Top

* Photo alignment settings
  - clear out photo
* Separate build path for branded generators
* Customize filename for image download, based on first few words of quote
* Font families and sizes
* Persistent Logo, on/off. File upload logo. Start with default logo.
* Cleanup

## Extra

* Twitter login/post
* Size templates
* Visualize how layers are arranged
* Mobile/Touch Friendly
* Try Gulp build process
* Direct entry into the preview itself

## Patch
* Blurry output fix, need to patch html2canvas.js. Need to do this on each new dev env :-/
* [Math.floor to fix half pixels](https://github.com/niklasvh/html2canvas/issues/576)

```javascript
exports.getBounds = function(node) {
    if (node.getBoundingClientRect) {
        var clientRect = node.getBoundingClientRect();
        var width = node.offsetWidth == null ? clientRect.width : node.offsetWidth;
        return {
            top: Math.floor(clientRect.top),
            bottom: Math.floor(clientRect.bottom || (clientRect.top + clientRect.height)),
            right: Math.floor(clientRect.left + width),
            left: Math.floor(clientRect.left),
            width:  width,
            height: node.offsetHeight == null ? clientRect.height : node.offsetHeight
        };
    }
    return {};
};
```

## Done

* font sizing
* Add option for curly quote marks
* Find way to render output at 2x "retina"
* Render at 2x "retina" by default. Twitter, et al will scale as needed [Handle retina screens][6]
  - Will need to redo the layout as a result
  - Note: Twitter dimensions, 1024 x 512 expanded, 506 x 253 collapsed
* Text layouts. Title, credit/source
  - Centered, left, right / top or bottom aligned
* Overlay Color onClick should set alpha to 0.5
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