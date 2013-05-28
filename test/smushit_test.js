'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.smushit = {
  setUp: function(done) {
    require('./build_cases');
    done();
  },
  replace_single_dir: function(test) {
    test.expect(1);

    var actual_png = grunt.file.read('test/tmp/replace_single_dir/dp.png');
    var actual_jpg = grunt.file.read('test/tmp/replace_single_dir/dp.jpg');

    var expected_png = grunt.file.read('test/expected/single/dp.png');
    var expected_jpg = grunt.file.read('test/expected/single/dp.jpg');

    test.equal(actual_png, expected_png, 'should run with a single directory and replace a png file');
    test.equal(actual_jpg, expected_jpg, 'should run with a single directory and replace a png file');

    test.done();
  }
};
