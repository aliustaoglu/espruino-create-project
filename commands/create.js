const table = require('table').table;
const chalk = require('chalk').default;
const prompt = require('prompt');
const template = require('../templates/template')
const fs = require('fs')
const ncp = require('ncp').ncp

const promtQuestion = {
  IS_INFORMATION_CORRECT: 'Is this information correct?'
};

const createProject = (projectName, options) => {
  const allOptions = Object.assign({}, options, { name: projectName })
  const packageJson = template.getTemplate(allOptions)
  fs.mkdirSync(projectName)
  fs.writeFileSync(projectName + "/package.json", packageJson)
  ncp('boards', projectName + "/boards")
  ncp('firmware', projectName + "/firmware")
  ncp('templates/minimal/src', projectName + "/src")
};

module.exports = {
  newProject: (projectName, options) => {
    const preview = [
      [chalk.yellowBright('Project Name'), chalk.yellowBright('ESP version'), chalk.yellowBright('Default port'), chalk.yellowBright('Default baud rate')],
      [chalk.whiteBright(projectName), chalk.whiteBright(options.esp), chalk.whiteBright(options.port), chalk.whiteBright(options.baud)]
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
