'use strict';

var grunt = require('grunt'),
    fs = require('fs');

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

function getSize(file) {
  return fs.lstatSync(file).size;
}

var PNG_FILE_NAME = 'dp.png',
    JPG_FILE_NAME = 'dp.jpg',
    EXPECTED_PNG_SIZE = getSize('test/expected/single/' + PNG_FILE_NAME),
    EXPECTED_JPG_SIZE = getSize('test/expected/single/' + JPG_FILE_NAME);

function testSingleFile(test, dir, msg) {
  test.expect(1);

  var new_size = getSize('test/tmp/' + dir + '/' + PNG_FILE_NAME);

  test.deepEqual(new_size, EXPECTED_PNG_SIZE, msg);
  test.done();
}

function testMultipleFiles(test, dir, png_msg, jpg_msg) {
  test.expect(2);

  var new_png_size = getSize('test/tmp/' + dir + '/' + PNG_FILE_NAME),
      new_jpg_size = getSize('test/tmp/' + dir + '/' + JPG_FILE_NAME);

  test.deepEqual(new_png_size, EXPECTED_PNG_SIZE, png_msg);
  test.deepEqual(new_jpg_size, EXPECTED_JPG_SIZE, jpg_msg);
  test.done();
}

exports.smushit = {
  setUp: function (done) {
    done();
  },
  replace_single_dir: function (test) {
    testMultipleFiles(test, 'replace_single_dir', 'should run with a single directory and replace a png file', 'should run with a single directory and replace a jpg file');
  },
  replace_single_file: function (test) {
    testSingleFile(test, 'replace_single_file', 'should replace a single png file');
  },
  replace_single_filter: function (test) {
    testSingleFile(test, 'replace_single_filter', 'should run with png extension filter and replace a png file');
  },
  replace_multiple_files: function (test) {
    testMultipleFiles(test, 'replace_multiple_files', 'should run with multiple files and replace png files', 'should run with a multiple files and replace jpg files');
  },
  replace_multiple_filters: function (test) {
    testMultipleFiles(test, 'replace_multiple_filters', 'should filter and replace png files', 'should filter and replace jpg files');
  },
  output_single_dir: function (test) {
    testMultipleFiles(test, 'output_single_dir', 'should run with a single directory and move the optimized png file', 'should run with a single directory and move the optimized jpg file');
  },
  output_single_dir_with_sub: function (test) {
    testMultipleFiles(test, 'output_single_dir_with_sub/single', 'should run with a single directory and move the optimized png file', 'should run with a single directory and move the optimized jpg file');
  },
  output_single_file: function (test) {
    testSingleFile(test, 'output_single_file', 'should move the optimized png file');
  },
  output_single_filter: function (test) {
    testSingleFile(test, 'output_single_filter', 'should run with png extension filter and move the optimized png file');
  },
  output_multiple_files: function (test) {
    testMultipleFiles(test, 'output_multiple_files', 'should run with multiple files and move the optimized png files', 'should run with a multiple files and move the optimized jpg files');
  },
  output_multiple_filters: function (test) {
    testMultipleFiles(test, 'output_multiple_filters', 'should filter and move the optimized png files', 'should filter and move the optimized jpg files');
  }
};
