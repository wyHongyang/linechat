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
				files: [{
					expand:true,
					cwd:'public/less',
                    src:'*.less',
                    dest: 'public/css',
                    ext: '.css'
				}]
			},
			compileMain: {
				options: { },
				files: [{
					expand:true,
					cwd:'public/css',
                    src:'*.css',
                    dest: 'output/css',
                    ext: '.min.css'
				}]
			},
			csslib:{
				options: { },
				files: [{
					expand:true,
					cwd:'public/css/lib',
                    src:'*.css',
                    dest: 'output/css/lib',
                    ext: '.min.css'
				}]
			}
		},
		uglify : {
			options: {
                banner: '/*!<%= grunt.template.today("yyyy-mm-dd") %> */\n'//添加banner
            },
            build:{
            	files:[{
            		expand:true,
                    cwd:'public/js',
                    src:'*.js',
                    dest: 'output/js',
                    ext:'.min.js'	
            	}]
            },
            buildlib:{
            	files:[{
            		expand:true,
                    cwd:'public/js/lib',
                    src:'*.js',
                    dest: 'output/js/lib',
                    ext:'.min.js'
            	}]
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
    grunt.registerTask('buildAll', [ 'less', 'uglify' ]);
};