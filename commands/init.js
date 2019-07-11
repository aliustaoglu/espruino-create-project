const table = require('table').table;
const chalk = require('chalk').default;
const prompt = require('prompt');
const template = require('../templates/template');
const fs = require('fs');
const ncp = require('ncp').ncp;
const path = require('path');
const childProcess = require('child_process');

const promtQuestion = {
  IS_INFORMATION_CORRECT: 'Is this information correct?'
};

const createProject = (projectName, options) => {
  const workingFolder = path.join(process.cwd(), projectName);
  const moduleFolder = path.dirname(path.join(fs.realpathSync(__filename), '../'));
  const allOptions = Object.assign({}, options, { name: projectName });
  const packageJson = template.getTemplate(allOptions);

  fs.mkdirSync(workingFolder);
  fs.writeFileSync(workingFolder + '/package.json', packageJson);
  ncp(moduleFolder + '/boards', workingFolder + '/boards');
  ncp(moduleFolder + '/firmware/' + options.chip, workingFolder + '/firmware');
  ncp(moduleFolder + '/templates/minimal/src', workingFolder + '/src');
  console.log(chalk.whiteBright('Your Espruino project is being created. Please wait....'))
  childProcess.exec(`cd ${workingFolder} && npm install`, (error, stdout, stderr) => {
    console.log(stdout);
    console.log(chalk.whiteBright(`Project ${projectName} has been created successfully.`))
  });
  
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
        chalk.whiteBright(options.chip),
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
  },
  updateProject: options => {
    const workingFolder = process.cwd();
    const packageJson = path.join(workingFolder, 'package.json');
    const packageContent = JSON.parse(fs.readFileSync(packageJson).toString());
    const scripts = JSON.parse(template.getTemplate(Object.assign({}, options, { name: '' }))).scripts;
    packageContent.scripts = scripts;
    const newPackage = JSON.stringify(packageContent, null, 2);
    fs.writeFileSync(packageJson, newPackage);
    console.log(chalk.bgGreenBright('\r\nNew package content\r\n'));
    console.log(newPackage);
    console.log(chalk.greenBright('\r\nScripts updated successfully.'));
  }
};
