Meme Gen
============

A tool for easy meme generation to share on those social things, written in JavaScript. Inspired by [Vox Media's Meme tool](https://github.com/voxmedia/meme) and [Pixelcite](https://github.com/onyxfish/pixelcite).

## Installation for Development

Make sure your system has [Node.js](http://nodejs.org/), [Git](http://git-scm.com/), and [Bower](http://bower.io/) installed.

Run these commands to install required Node modules and various libraries/frameworks like jQuery and Bootstrap.

### Node Modules

```sh
$ npm install
```

### Bower

```sh
# If you don't have bower, install it
$ npm install -g bower
# otherwise, just run:
$ bower install
```

### Grunt

```sh
$ npm install -g grunt
$ npm install -g grunt-cli
```

## Simple Dev Server

To Start:

```sh
$ node server
```

## Grunt commands

Watch files for changes and compile during Development

```sh
$ grunt watch
```
Concatenated, but un-minified
```sh
$ grunt dev
```
Concatenated, minified files, ready for production
```sh
$ grunt build
```
