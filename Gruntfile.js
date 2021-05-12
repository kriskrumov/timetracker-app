const sass = require('node-sass');
module.exports = function(grunt){
    // Configuration
    grunt.initConfig({
        sass : {
            options: {
                implementation: sass,
                sourceMap: false
            },
            build: {
                files: [{
                    src: 'styles/scss/main.scss',
                    dest: 'styles/css/style.css',
                }]
            }
        }
    })


    // Load Plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
}