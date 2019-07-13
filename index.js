#!/usr/bin/env node

const defaults = require('./defaults.json');

const chalk = require('chalk').default;
const help = require('./commands/help');
const program = require('commander');
const list = require('./commands/list');
const init = require('./commands/init');

program
  .command('list')
  .description('List supported devices')
  .action(list.listDevices);

program
  .command('init [projectName]')
  .description('Create a boilerplate for ESP8266/ESP32 project')
  .option('-c, --chip <type>', 'Which ESP to use? esp8266 or esp32?', defaults.chip)
  .option('-p, --port <type>', 'Default port name', defaults.port)
  .option('-b, --baud <type>', 'Default baud rate', defaults.baud)
  .option('-a, --author <type>', 'Author', defaults.author)
  .action(init.newProject);

program
  .command('update')
  .description('Update boilerplate')
  .option('-c, --chip <type>', 'Which ESP to use? esp8266 or esp32?', defaults.chip)
  .option('-p, --port <type>', 'Default port name', defaults.port)
  .option('-b, --baud <type>', 'Default baud rate', defaults.baud)
  .option('-a, --author <type>', 'Author', defaults.author)
  .action(init.updateProject);

if (process.argv.length < 3) {
  const helpCmd = chalk.bgWhiteBright('espruino-create-project --help');
  console.log(chalk.redBright(`Not enough parameters.\r\nType ${helpCmd} for options`));
} else {
  program.parse(process.argv);
}
