
module.exports = function(grunt) {
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
                'build/styles.css': ['css/*.css']
            }
        }
      }
   });

   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-cssmin');

   grunt.registerTask('default', ['uglify', 'cssmin']);
};