/*
 * register-grunt-tasks
 * https://github.com/endorama/register-grunt-tasks
 *
 * Copyright (c) 2015 Edoardo Tenani
 * Licensed under the MIT license.
 */

'use strict';

var _    = require('lodash');
var glob = require('glob');
var path = require('path');

module.exports = function (grunt, options) {

  // get cwd from process
  var cwd = process.cwd();

  if (options.path && !_.isArray(options.path)) {
    options.path = [ options.path ];
  }

  // set default options
  options = _.defaultsDeep({}, options, {
    path: [
      path.join(cwd, 'grunt-tasks'),
    ]
  });

  grunt.verbose.subhead('Registering custom tasks');

  // for each path
  _.each(options.path, function (p) {

    p = path.join(p, '*.js');

    grunt.verbose.write('Searching ' + path.relative(cwd, p) + '...');

    var files = glob.sync(p);

    var tasks = [];

    // foreach file
    _.each(files, function (file) {
      // compute taskname
      var taskName = path.basename(file, '.js');
      // compute full task file path
      var filePath = path.resolve(file);
      // grunt.verbose.debug('Loading ' + path.basename(file) + ' task...');
      // require task funciton
      var fn = require(filePath);
      // verify is a funciton
      if (_.isFunction(fn)) {
        // register the task with the correct filename
        grunt.registerTask(taskName, fn);
        // grunt.verbose.debug('OK'.green);
        // save if for return
        tasks.push(taskName);
      }
      // else {
      //   // tell user if no task is found, yellow color no warning
      //   grunt.verbose.writeln(' No task found'.yellow);
      // }
    });

    grunt.verbose.ok();

    if (files.length > 0) {
      grunt.verbose.debug(_.map(files, function (f) { return path.relative(cwd, f); }));
    }

    if (tasks.length > 0) {
      grunt.verbose.writeln('+ ' + grunt.log.wordlist(tasks));
    }
    else {
      grunt.verbose.writeln('No tasks found'.yellow);
    }

  });

};
