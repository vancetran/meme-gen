module.exports = {
    options: {
        livereload: true,
    },
    /*scripts: {
        files: ['<%= appconfig.src %>/js/*.js', '<%= appconfig.src %>/less/'],
        tasks: ['concat', 'uglify', 'jshint'],
        options: {
            spawn: false
        },
    },*/

    css: {
        files: ['<%= appconfig.src %>/less/*.less'],
        tasks: ['less:dev'],
        options: {
            spawn: false,
        }
    }/*,
    handlebars: {
        files: ["<%= appconfig.src %>/templates/*.hbs"],
        tasks: ['handlebars'],
        options: {
            spawn: false,
        }
    }*/
};