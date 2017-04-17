
module.exports = function(grunt) {
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      uglify: {
         my_target: {
            files: {
                'build/script.min.js': ['scripts/script.js']
            }
        }
      }
   });

   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.registerTask('default', ['uglify']);
};