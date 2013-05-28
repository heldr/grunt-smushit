'use strict';

module.exports = (function () {
	var fs = require('fs'),
      wrench = require('wrench'),
      tmp_path = 'tmp/',
      source_path = 'fixtures/',
      source_folder, target_folders;

  // clean tmp path if it exist
  if (fs.existsSync(tmp_path)) {
    fs.rmdirSync(tmp_path);
  }
  fs.mkdirSync(tmp_path);

  // single file cases
  target_folders = ['replace_single_dir'];
  source_folder = source_path + 'single';
  target_folders.forEach(function(folder) {
    folder = tmp_path + folder;
    console.log(source_folder);
    console.log(folder);
    wrench.copyDirSyncRecursive(source_folder, folder);
  });

}());
