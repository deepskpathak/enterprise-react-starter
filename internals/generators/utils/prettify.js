const shell = require('shelljs'); // eslint-disable-line import/no-unresolved

/**
 * runs the prettier command on a file which is used for
 * handlebars since blanks lines are added to EOF
 *
 * @param filePath path of file to be prettified
 */
module.exports = (filePath) => {
  shell.exec(`prettier --write ${filePath}`);
};
