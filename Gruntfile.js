/**
 * @version 0.0.1 
 * @author hongyang
 * @description config for grunt less
 * 
 */
module.exports = function(grunt){
	grunt.initConfig({
		less:{
			compileLogin: {
				option:{ },
				files: {
					'public/css/login.css' : 'public/less/login.less',
					'public/css/home.css'  : 'public/less/home.less',
					'public/css/chat.css'  : 'public/less/chat.less',
					'public/css/index.css' : 'public/less/index.less',
					'public/css/reply.css' : 'public/less/reply.less',
					'public/css/pagination.css' : 'public/less/pagination.less'
				}
			},
			compileMain: {
				options: { },
				files: {
					
				}
			},
			minify : {
                options : {
                    cleancss : true,
                    report : 'min',
                    compress : true,
                    cleancssOptions : {
                        keepSpecialComments : 0,
                        keepBreaks : false
                    }
                },
                files : {
                	'public/css/lib/bootstrap-datetimepicker.min.css':'public/css/lib/bootstrap-datetimepicker.css',
                	'public/css/lib/datepicker.min.css':'public/css/lib/datepicker.css',
                	'public/css/lib/animate.min.css':'public/css/lib/animate.css',
                	'public/css/login.min.css' : 'public/css/login.css',
                	'public/css/home.min.css'  : 'public/css/home.css',
                	'public/css/chat.min.css'  : 'public/css/chat.css',
                	'public/css/index.min.css' : 'public/css/index.css',
                	'public/css/reply.min.css' : 'public/css/reply.css',
                	'public/css/pagination.min.css' : 'public/css/pagination.css'
                }
            }
		},
		
		watch:{
			scripts: {
			   files:['public/less/*.less','public/less/lib/*.less'],
			   tasks:['less']
			} 
		
		}
	});	
	
	grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [ 'less', 'watch' ]);
    grunt.registerTask('buildAll', [ 'less', 'requirejs', 'uglify' ]);

}