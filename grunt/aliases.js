module.exports = {
	default: [
		'clean:build',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'imagemin',
		//'less:build',
		'copy',
		'usemin'
	],
/*	default: [
		'newer:useminPrepare',
		'newer:concat',
		'newer:uglify',
		'newer:imagemin',
		'newer:less',
		'newer:copy',
		'newer:usemin'
	],*/
	concurrent: [
		'concurrent:first',
		'concurrent:second'
	],
	dev: [
		'watch'
	]
};
