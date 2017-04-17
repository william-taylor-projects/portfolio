
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
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
                keepSpecialComments: 0,
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'build/styles.min.css': [
                        'node_modules/normalize.css/normalize.css',
                        'css/circle.css',
                        'css/font-awesome.css',
                        'css/skeleton.css',
                        'css/gallery.css',
                        'css/raleway.css',
                        'css/styles.css'
                    ]
                }
            }
        },

        watch: {
            scripts: {
                files: ['scripts/*.js', 'css/*.css'],
                tasks: ['uglify', 'cssmin'],
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
                ignore: ['#added_at_runtime', /test\-[0-9]+/, /moveIn/]
            },
            dist: {
                files: {
                'build/styles.min.css': ['index.html']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-uncss');

    grunt.registerTask('dev', ['uglify', 'cssmin', 'uncss', 'browserSync', 'watch'])
    grunt.registerTask('build', ['uglify', 'cssmin', 'uncss']);
};