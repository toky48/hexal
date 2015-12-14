module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "scss",
                    src: ["*.scss"],
                    dest: "css",
                    ext: ".css"
                }]
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
