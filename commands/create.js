const table = require('table').table;
const chalk = require('chalk').default;
const prompt = require('prompt');

const promtQuestion = {
  IS_INFORMATION_CORRECT: 'Is this information correct?'
};

const createProject = () => {
  
};

module.exports = {
  newProject: (env, options) => {
    const preview = [
      [chalk.yellowBright('Project Name'), chalk.yellowBright('ESP version'), chalk.yellowBright('Default port'), chalk.yellowBright('Default baud rate')],
      [chalk.whiteBright(options.name), chalk.whiteBright(options.esp), chalk.whiteBright(options.port), chalk.whiteBright(options.baud)]
    ];
    const previewTable = table(preview);
    console.log(previewTable);
    prompt.start();
    prompt.get([promtQuestion.IS_INFORMATION_CORRECT], (err, result) => {
      if (result[promtQuestion.IS_INFORMATION_CORRECT].toLowerCase() === 'yes') {
        createProject(options);
      } else {
        console.log(chalk.redBright('Espruino project creation terminated'));
      }
    });
  }
};
