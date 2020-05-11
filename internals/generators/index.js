/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');
const languageGenerator = require('./language/index.js');
const serviceGenerator = require('./service/index.js');
const prettify = require('./utils/prettify');

/**
 * Every generated backup file gets this extension
 * @type {string}
 */
const BACKUPFILE_EXTENSION = 'rbgen';
const cwd = process.cwd();

module.exports = plop => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.setGenerator('service', serviceGenerator);
  plop.setGenerator('language', languageGenerator);
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
  plop.setActionType('prettify', (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      '/../../app/',
      config.path,
      plop.getHelper('properCase')(answers.name),
      '**',
      '**.js',
    )}`;

    execSync(`npm run prettify -- "${folderPath}"`);
    return folderPath;
  });
  plop.setActionType('prettifySagas', () => {
    prettify(path.resolve(cwd, 'app/serviceSagas.js'));
    prettify(path.resolve(cwd, 'app/serviceReducers.js'));
    return 'prettified files';
  });
  plop.setActionType('backup', (answers, config) => {
    fs.copyFileSync(
      path.join(__dirname, config.path, config.file),
      path.join(
        __dirname,
        config.path,
        `${config.file}.${BACKUPFILE_EXTENSION}`,
      ),
      'utf8',
    );
    return path.join(
      __dirname,
      config.path,
      `${config.file}.${BACKUPFILE_EXTENSION}`,
    );
  });
};

module.exports.BACKUPFILE_EXTENSION = BACKUPFILE_EXTENSION;
