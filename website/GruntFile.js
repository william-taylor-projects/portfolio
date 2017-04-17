
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
                    src : [
                        'build/*.*',
                        'index.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['uglify', 'cssmin', 'browserSync', 'watch']);
};