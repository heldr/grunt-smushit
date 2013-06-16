# grunt-smushit [![Build Status](https://secure.travis-ci.org/heldr/grunt-smushit.png)](http://travis-ci.org/heldr/grunt-smushit)

Grunt plugin to remove unnecessary bytes of PNG and JPG using Yahoo Smushit

> Smush.it uses optimization techniques specific to image format to remove unnecessary bytes from image files. It is a "lossless" tool, which means it optimizes the images without changing their look or visual quality.

[Read more about Smush.it][smushit-site]

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-smushit --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-smushit');
```

## The "smushit" task

### Overview
In your project's Gruntfile, add a section named `smushit` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  smushit: {
    mygroup: {
      src: ['tests/img/**/*.png','tests/img/**/*.jpg'],
      dest: 'tests/img/min'
    }
  }
});
```

### Options

#### options.service
Type: `String`
Default value: `null`

Call another service instead of Yahoo Smushit

### Usage Examples

#### Output Folder
Move your files to a target folder (should not be into the same).

```js
grunt.initConfig({
  smushit: {

    // catch all files from a single folder
    group1: {
      src: 'tests/img',
      dest: 'tests/opt_img'
    },

    // filter by filetype
    group2: {
      src: ['tests/img/**/*.png','tests/img/**/*.jpg'],
      dest: 'tests/img/min'
    },

    // set each file
    group3:{
        src: ['tests/img/logo.png','tests/img/whatever.png'],
        dest: 'tests/img/min'
    }

  }
});
```

#### Replace files
Be safe to replace all of your old files with this option.

```js
grunt.initConfig({
  smushit: {

    // a single directory
    group1: {
      src: 'tests/img'
    },

    // filter by filetype
    group2: {
      src: ['tests/img/**/*.png','tests/img/**/*.jpg']
    },

    //replace recursive
    group3: {
      src: ['tests/img/logo.png','tests/img/tellme.jpg']
    }

  }
});
```

#### Your own service
There is an option that you can set your own image optimizer service. Its a good alternative if you don't want to wait for smush.it web service latency.

```js
grunt.initConfig({
  smushit: {
    options: {
      service: 'http://myimgopt.com/exec'
    },
    mygroup: {
      src: ['tests/img/**/*.png','tests/img/**/*.jpg'],
      dest: 'tests/img/min'
    }
  }
});
```

## Contributing

```cli
$ git clone git://github.com/heldr/grunt-smushit.git
$ cd grunt-smushit
$ npm install
$ npm test
```
NOTE: Be sure to keep up to date the plugin tests and jshint code quality.

## Release History
  * 2013-00-00   v1.0.0   Rewrite task on top of [grunt-init-gruntplugin][grunt-init-gruntplugin]
  * 2013-05-26   v0.4.2   Add support to different service #16

## Credits
  * [node-smushit][node-smushit]
  * [wrench-js][wrench]

## License

MIT License
(c) [Helder Santana](http://heldr.com)

[node-smushit]: https://github.com/colorhook/node-smushit
[wrench]: https://github.com/ryanmcgrath/wrench-js
[smushit-site]: http://www.smushit.com/ysmush.it/
[grunt-init-gruntplugin]: https://github.com/gruntjs/grunt-init-gruntplugin
