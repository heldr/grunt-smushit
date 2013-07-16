'use strict';

module.exports = (function () {
  var fs = require('fs'),
      wrench = require('wrench'),
      tmp_path = 'test/tmp/',
      source_path = 'test/fixtures/',
      source_folder, target_folders,
      nested_folders;

  // clean tmp path if it exist
  if (fs.existsSync(tmp_path)) {
    wrench.rmdirSyncRecursive(tmp_path);
  }
  fs.mkdirSync(tmp_path);

  source_folder = source_path + 'single';

  // set up src files for nested folders
  nested_folders = ['nested1', 'nested1/a', 'nested1/a/b', 'nested2', 'nested2/a1', 'nested2/a1/b2'];
  nested_folders.forEach(function(folder) {
    folder = source_path + folder;

    if (fs.existsSync(folder)) {        // remove the folder if it exists previously
      wrench.rmdirSyncRecursive(folder);
    }
    wrench.copyDirSyncRecursive(source_folder, folder);
  });

  // replace file cases
  target_folders = ['replace_single_dir', 'replace_single_filter', 'replace_multiple_filters', 'replace_single_file', 'replace_multiple_files'];
  target_folders.forEach(function(folder) {
    folder = tmp_path + folder;
    wrench.copyDirSyncRecursive(source_folder, folder);
  });

}());
