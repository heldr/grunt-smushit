'use strict';

module.exports = (function () {
	var fs = require('fs'),
      wrench = require('wrench'),
      tmp_path = 'test/tmp/',
      source_path = 'test/fixtures/',
      source_folder, target_folders;

  // clean tmp path if it exist
  if (fs.existsSync(tmp_path)) {
    wrench.rmdirSyncRecursive(tmp_path);
  }
  fs.mkdirSync(tmp_path);

  // replace file cases
  target_folders = ['replace_single_dir','replace_single_filter','replace_multiple_filters','replace_single_file','replace_multiple_files'];
  source_folder = source_path + 'single';
  target_folders.forEach(function(folder) {
    folder = tmp_path + folder;
    wrench.copyDirSyncRecursive(source_folder, folder);
  });

}());
