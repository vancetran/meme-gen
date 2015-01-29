module.exports = function(grunt) {

  // Paths and other variables
  var appconfig = {
    src: 'app',
    dest: 'build'
  };

  // measures the time each task takes
  require('time-grunt')(grunt);

  // load grunt config
  require('load-grunt-config')(grunt, {
    config: { appconfig: appconfig }
  });
  
};