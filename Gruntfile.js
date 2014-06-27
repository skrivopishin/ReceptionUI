/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; */\r\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        copy: {
            main: {
                src: ['partials/**', 'index.html'],
                dest: 'dist/'
            },
            scripts: {
                src: [
                    'bower_components/angular/angular.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                    'bower_components/angular-busy/dist/angular-busy.js',
                    'bower_components/lodash/dist/lodash.js'
                ],
                dest: 'dist/'
            },
            styles: {
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.css',
                    'bower_components/angular-busy/dist/angular-busy.css'
                ],
                dest: 'dist/'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['src/**/*.js', 'test/**/*.js']
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'qunit']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task.
    grunt.registerTask('default', ['concat', 'qunit', 'uglify', 'copy']);

    grunt.registerTask('all', ['default', 'jshint']);

};
