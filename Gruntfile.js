module.exports = function(grunt){
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		php:{
			dist:{
				options:{
					port: 5080,
					base: 'app',
					keepalive: true,
					hostname: 'localhost'
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-php');
	grunt.registerTask('server',['php']);
}