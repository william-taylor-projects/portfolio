
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                mangle: {
                    properties: true
                },
                compress: {
                    drop_console: true
                }
            },
            my_target: {
                files: {
                    'build/app.min.js': [
                        'node_modules/zenscroll/zenscroll.js',
                        'scripts/app.js'
                    ]
                }
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: '*',
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'build/styles.min.css': [
                        'node_modules/normalize.css/normalize.css',
                        'css/circle.css',
                        'css/normalize.css',
                        'css/skeleton.css',
                        'css/gallery.css',
                        'css/styles.css'
                    ]
                }
            }
        },

        watch: {
            scripts: {
                files: ['scripts/*.js', 'css/*.css', 'app.html'],
                tasks: ['uglify', 'cssmin', 'htmlmin'],
                options: {
                    spawn: false,
                },
            },
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'build/*.*',
                        'index.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: '.'
                }
            }
        },

        uncss: {
            options: {
                ignore: [/test\-[0-9]+/]
            },
            dist: {
                files: {
                    'build/styles.min.css': ['app.html']
                }
            }
        },

        htmlmin: {                                     
            dist: {                                     
                options: {                                
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                  
                    'index.html': 'app.html'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-uncss');

    grunt.registerTask('dev', ['uglify', 'cssmin', 'htmlmin', 'browserSync', 'watch'])
    grunt.registerTask('build', ['uglify', 'cssmin', 'uncss', 'htmlmin']);
};