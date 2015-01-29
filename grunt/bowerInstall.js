module.exports = {
	target: {
		// Point to the files that should be updated when
		// you run `grunt bower-install`
		cwd: './',
		src: [
			'<%= appconfig.src %>/index.html'
		],
		exclude: ['modernizr','bootstrap'],
		ignorePath: '<%= appconfig.src %>/'

		// Optional:
		// ---------
/*		cwd: '',
		dependencies: Boolean (default: true),
		devDependencies: Boolean (default: false),
		exclude: [],
		fileTypes: {},
		ignorePath: ''*/
	}
};
