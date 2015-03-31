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
		},
		wiredep:{
			task:{
				src:['app/index.html']
			}
		}
	});
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-php');
	grunt.registerTask('server',['php', 'wiredep']);
}