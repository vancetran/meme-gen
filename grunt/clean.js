module.exports = {
	build: {
		files: [{
			dot: true,
			src: [
				'.tmp',
				'<%= appconfig.dest %>/*',
				'!<%= appconfig.dest %>/.git*'
			]
		}]
	}
};