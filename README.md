# register-grunt-tasks

> Register custom Grunt tasks with ease

This plugin permit to load grunt tasks from speparate files in separate folder,
using a priority inclusion to permit customized configuration and overriding.

**Extremely powerful when used with [load-grunt-config][1]** :)

## Installation

`$ npm install --save-dev register-grunt-tasks`

## How to use it

```js
var registerGruntTasks = require('register_grunt_tasks');
registerGruntTasks(grunt, {
  path: 'path/to/tasks/folder'
});
```

Inside `path/to/tasks/folder` you can add one file for task. The file name will
be the name of the registered task. For example `folder/build.js` will result in
a `build` task to be registered.

The task file should export a single function with signature `function (grunt) {}`.
Returned value will be discarded.

The exported function will be registered with `grunt.registerTask()`, and will be
binded using `.bind(grunt, grunt)`.

**NB: there is no support for multitask right now.** I didn't have a use case
for declaring multitask this way, please feel free to open an issue if you need
this funcitonality.

## Options

### options.path
Type: `string` or `Array`

Folder path to search for tasks files. Can be a string or an array of folders.

```js
registerGruntTasks(grunt, {
  path: 'path/to/tasks/folder'
});
```
```js
registerGruntTasks(grunt, {
  path: [
    'path/to/tasks/folder/one',
    'path/to/tasks/folder/two',
    'path/to/tasks/folder/three',
  ],
});
```

Subsequent folders will have precendence, so for example if you define a task
`build` in folder `three`, will override a task `build` in folder `two`.

[1]: https://github.com/firstandthird/load-grunt-config
