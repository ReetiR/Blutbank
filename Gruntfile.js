module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: true
          }
        },
        files: {
          "build/index.html": ["src/login.jade"],
          "build/login.html": ["src/login.jade"],
          "build/home.html": ["src/home.jade"],
          "build/users.html": ["src/users.jade"],
          "build/donors.html": ["src/donors.jade"],
          "build/add-user.html": ["src/add-user.jade"],
          "build/add-donor.html": ["src/add-donor.jade"],
          "build/edit-donor.html": ["src/edit-donor.jade"],
          "build/reset-password.html": ["src/reset-password.jade"],
          "build/change-password.html": ["src/change-password.jade"]
        }
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'src/public',
        src: '**/*',
        dest: 'build/',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');


// Default task(s).
grunt.registerTask('default', ['jade', 'copy']);

};