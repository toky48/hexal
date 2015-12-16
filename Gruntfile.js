module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/main.css': 'scss/main.scss'
                }
            }
        },

        watch: {
            sass: {
                files: ["scss/*.scss"],
                tasks: ["sass"],
                options: {
                    spawn: false
                }
            }
        }
    });

};
