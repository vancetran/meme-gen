module.exports = {
	dev: {
		options: {
			paths: ["<%= appconfig.src %>/less/"],
			cleancss: false,
			ieCompat: true
		},
		files: {
			"<%= appconfig.src %>/css/main.css": "<%= appconfig.src %>/less/bootstrap.less"
		}
	},
	build: {
		options: {
			paths: ["<%= appconfig.src %>/less/"],
			cleancss: true,
			ieCompat: true
		},
		files: {
			"<%= appconfig.dest %>/css/main.css": "<%= appconfig.src %>/less/bootstrap.less"
		}
	}
};