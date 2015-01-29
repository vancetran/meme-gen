module.exports = {
	build: {
		files: [{
			expand: true,
			progressive: true,
			cwd: '<%= appconfig.src %>/images/',
			src: ['**/*.{png,jpg,gif}'],
			dest: '<%= appconfig.dest %>/images/'
		}]
	}
};