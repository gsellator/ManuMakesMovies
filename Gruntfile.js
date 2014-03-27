/*global module:false*/
module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',

        clean: ["pkg/"],

        env : {
            options : {
                /* Shared Options Hash */
                //globalOption : 'foo'  
            },
            dev: {
                NODE_ENV : 'DEVELOPMENT'
            },
            pre : {
                NODE_ENV : 'PREPRODUCTION'   
            },
            prod : {
                NODE_ENV : 'PRODUCTION'   
            }
        },

        bump: {
            options: {
                commit: false,
                createTag: false,
                push: false
            }
        },

        copy: {
            package: {
                src: 'package.json',
                dest: 'pkg/',
            },
            server1: {
                src: 'app.js',
                dest: 'pkg/',
            },
            server2: {
                src: 'views/**/*',
                dest: 'pkg/',
            },
            server3: {
                src: 'public/css/*',
                dest: 'pkg/',
            },
            server4: {
                src: 'public/favicon.ico',
                dest: 'pkg/',
            },
            server5: {
                src: 'public/favicon.png',
                dest: 'pkg/',
            },
            server6: {
                src: 'public/img/**/*',
                dest: 'pkg/',
            },
            server7: {
                src: 'public/js/script.js',
                dest: 'pkg/',
            },
            server8: {
                src: 'public/js/bower_components/jquery/dist/jquery.min.js',
                dest: 'pkg/',
            },
            server9: {
                src: 'public/js/bower_components/jQuery-One-Page-Nav/jquery.nav.js',
                dest: 'pkg/',
            },
            server10: {
                src: 'public/js/noty-theme.js',
                dest: 'pkg/',
            },
            server11: {
                src: 'public/js/bower_components/noty/js/noty/packaged/jquery.noty.packaged.min.js',
                dest: 'pkg/',
            },
            server12: {
                src: 'templates/**/*',
                dest: 'pkg/',
            }
        },

        'sftp-deploy': {
            prod: {
                auth: {
                    host: '91.121.177.78',
                    port: 22,
                    authKey: 'prod'
                },
                src: 'pkg',
                dest: '/home/ManuMakesMovies-prod/ManuMakesMovies',
                server_sep: '/'
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sftp-deploy');

    grunt.registerTask('prod', ['env:prod', 'clean', 'bump', 'copy', 'sftp-deploy:prod']);
};