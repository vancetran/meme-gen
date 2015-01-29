module.exports = {
	options: {
        dirs: ['<%= appconfig.dest %>']
		//assetsDirs: ['<%= appconfig.dest %>']
	},
	html: ['<%= appconfig.dest %>/{,*/}*.html'],
	css: ['<%= appconfig.dest %>/css/{,*/}*.css']
};