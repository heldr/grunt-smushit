grunt-smushit
=============

NOTE: There is a bug inside node-smushit. I opened an issue https://github.com/colorhook/node-smushit/issues/1 to the author and I'm trying to fix it too. Sorry!

[Grunt][grunt] task to remove unecessary bytes of PNG and JPG, it uses [node-smushit][node-smushit] 

> Smush.it uses optimization techniques specific to image format to remove unnecessary bytes from image files. It is a "lossless" tool, which means it optimizes the images without changing their look or visual quality.

[Read more about Smush.it][smushit-site]

## Getting Started

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-smushit`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-smushit');
```

## Documentation
There are 3 ways to use grunt-smushit:

### Recursive path

```js
smushit: {
	dist: 'public/images'
}
```

### Image list

```js
smushit: {
	dist: ['public/images/img1.png','public/images/img2.png']
}
```

### With just a image

```js
smushit: {
	dist: 'public/images/img1.png'
}
```

## License

MIT License
(c) [Helder Santana](http://heldr.com)

based on: [grunt-recess][grunt-recess]

[grunt]: https://github.com/cowboy/grunt
[node-smushit]: https://github.com/colorhook/node-smushit
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
[grunt-recess]: https://github.com/sindresorhus/grunt-recess
[smushit-site]: http://www.smushit.com/ysmush.it/