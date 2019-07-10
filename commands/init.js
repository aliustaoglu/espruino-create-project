const table = require('table').table;
const chalk = require('chalk').default;
const prompt = require('prompt');
const template = require('../templates/template');
const fs = require('fs');
const ncp = require('ncp').ncp;
const path = require('path');

const promtQuestion = {
  IS_INFORMATION_CORRECT: 'Is this information correct?'
};

const createProject = (projectName, options) => {
  const workingFolder = path.join(process.cwd(), projectName);
  const moduleFolder = path.dirname(path.join(fs.realpathSync(__filename), '../'));
  console.log('Working Folder:' + workingFolder);
  console.log('Library Folder' + moduleFolder);
  const allOptions = Object.assign({}, options, { name: projectName });
  const packageJson = template.getTemplate(allOptions);

  fs.mkdirSync(workingFolder);
  fs.writeFileSync(workingFolder + '/package.json', packageJson);
  ncp(moduleFolder + '/boards', workingFolder + '/boards');
  ncp(moduleFolder + '/firmware/' + options.esp, workingFolder + '/firmware');
  ncp(moduleFolder + '/templates/minimal/src', workingFolder + '/src');
  console.log(chalk.greenBright(''));
};

module.exports = {
  newProject: (projectName, options) => {
    if (projectName === undefined) {
      const helpCmd = chalk.bgWhiteBright('espruino-create-project init --help');
      console.log(chalk.redBright(`Project name cannot be empty.\r\nType ${helpCmd} for options`));
      process.exit();
    }
    const preview = [
      [
        chalk.yellowBright('Project Name'),
        chalk.yellowBright('ESP version'),
        chalk.yellowBright('Default port'),
        chalk.yellowBright('Default baud rate'),
        chalk.yellowBright('Author')
      ],
      [
        chalk.whiteBright(projectName),
        chalk.whiteBright(options.esp),
        chalk.whiteBright(options.port),
        chalk.whiteBright(options.baud),
        chalk.whiteBright(options.author)
      ]
    ];
    const previewTable = table(preview);
    console.log(previewTable);
    prompt.start();
    prompt.get([promtQuestion.IS_INFORMATION_CORRECT], (err, result) => {
      if (result[promtQuestion.IS_INFORMATION_CORRECT].toLowerCase() === 'yes') {
        createProject(projectName, options);
      } else {
        console.log(chalk.redBright('Espruino project creation terminated'));
      }
    });
  }
};
