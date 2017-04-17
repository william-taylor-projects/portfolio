
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            my_target: {
                files: {
                    'build/script.min.js': ['scripts/script.js']
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
                    'build/styles.min.css': ['css/*.css']
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