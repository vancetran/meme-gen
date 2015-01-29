module.exports = {
  build: {
    files: [
      // Copy just the index.html
      { src: '<%= appconfig.src %>/index.html', dest: '<%= appconfig.dest %>/index.html', filter: 'isFile' },
      // Copy un-minified production JS
      { src: '.tmp/concat/js/production-min.js', dest: '<%= appconfig.dest %>/js/production.js', filter: 'isFile' }
    ]
  }
};